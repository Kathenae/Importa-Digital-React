<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Popup;
use App\Helpers\Toast;
use App\Http\Controllers\Controller;
use App\Mail\UserCreated;
use App\Models\Course;
use App\Models\User;
use App\Models\UserPermission;
use Exception;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Log;
use Mail;

class UserManageController extends Controller
{
    const RESULT_OK = 0;
    const RESULT_ERROR = 1;
    
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all()->load('permissions')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UserCreate', [
            'courses' => Course::all()
        ]);
    }

    public function store()
    {
        $validatedData = request()->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6|max:255|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
            'role' => 'required|in:admin,student',
            'course' => 'required|exists:courses,id'
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        $email_result = self::RESULT_OK;
        try {
            \DB::transaction(function () use ($validatedData) {
                $user = User::create($validatedData);
                $user->courses()->sync([request('course')]);

                if ($validatedData['role'] === 'admin') {
                    UserPermission::insert([
                        ['user_id' => $user->id, 'action' => 'view-admin-dashboard'],
                        ['user_id' => $user->id, 'action' => 'view@User'],
                        ['user_id' => $user->id, 'action' => 'view@User'],
                        ['user_id' => $user->id, 'action' => 'create@User'],
                        ['user_id' => $user->id, 'action' => 'edit@User'],
                        ['user_id' => $user->id, 'action' => 'destroy@User'],
                        ['user_id' => $user->id, 'action' => 'destroyMany@User'],
                        ['user_id' => $user->id, 'action' => 'view@Lesson'],
                        ['user_id' => $user->id, 'action' => 'watch@Lesson'],
                        ['user_id' => $user->id, 'action' => 'create@Lesson'],
                        ['user_id' => $user->id, 'action' => 'edit@Lesson'],
                        ['user_id' => $user->id, 'action' => 'destroy@Lesson'],
                        ['user_id' => $user->id, 'action' => 'destroyMany@Lesson'],
                    ]);
                } elseif ($validatedData['role'] === 'student') {
                    UserPermission::insert([
                        ['user_id' => $user->id, 'action' => 'view@Lesson'],
                        ['user_id' => $user->id, 'action' => 'watch@Lesson'],
                    ]);
                }
            });
            $email_result = $this->notifyUserCreated(request('email'), request('password'), route('courses'));
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with(['flash.error' => 'Ocurrió un error al crear el usuario.']);
        }

        if($email_result == self::RESULT_OK){
            $msg = "Utilizador creado exitosamente.";
            return redirect()->route('admin.users')->with(Toast::success($msg));
        }
        else
        {
            $msg = "La cuenta de usuario ha sido creada, pero hubo un problema al enviar el correo electrónico al usuario. Por favor, asegúrese de enviarles un correo electrónico informándoles sus credenciales de inicio de sesión.";
            return redirect()->route('admin.users')->with(Popup::info($msg));
        }
    }

    private function notifyUserCreated($email, $password, $link){
        try {
            Mail::to($email)->send(new UserCreated([
                'email' => $email,
                'password' => $password,
                'link' => $link
            ]));
            return self::RESULT_OK;
        }
        catch(Exception $e) {
            Log::error($e->getMessage());
            return self::RESULT_ERROR;
        }
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/UserEdit', [
            'user' => $user->load('courses'),
            'courses' => Course::all(),
        ]);
    }

    public function update(User $user)
    {
        $validatedData = request()->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'nullable|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
            'course' => 'required|exists:courses,id'
        ]);

        if ($validatedData['password'] !== null) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $user->update($validatedData);
        $user->courses()->sync([request('course')]);
        return redirect()->route('admin.users')->with(Toast::success('Utilizador atualizado exitosamente'));
    }

    public function approve()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');

        try {
            \DB::transaction(function () use ($ids) {
                foreach ($ids as $id) {
                    User::where('id', $id)->update(['is_approved' => true]);
                    UserPermission::firstOrCreate(['user_id' => $id, 'action' => 'view@Lesson']);
                    UserPermission::firstOrCreate(['user_id' => $id, 'action' => 'watch@Lesson']);
                }
            });
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return back()->with(Toast::error('Ocurrió un error.'));
        }

        return redirect()->back()->with(Toast::success('Permiciones alteradas exitosamente.'));
    }

    public function unapprove()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');

        try {
            \DB::transaction(function () use ($ids) {
                foreach ($ids as $id) {
                    User::where('id', $id)->update(['is_approved' => false]);
                    UserPermission::query()->where('user_id', $id)->delete();
                }
            });
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return back()->with(Toast::error('Ocurrió un error.'));
        }

        return redirect()->back()->with(Toast::success("Permiciones alteradas exitosamente."));
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with(Toast::success('Utilizador eliminado exitosamente.'));
    }

    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        User::whereIn('id', $ids)->delete();

        return redirect()->back()->with(Toast::success('Todos los utilizadores selecionados han sido eliminados.'));
    }
}
