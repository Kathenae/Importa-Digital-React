<?php

namespace App\Http\Controllers\Admin;

use DB;
use Exception;
use Log;
use Mail;
use App\Helpers\Popup;
use App\Helpers\Toast;
use App\Http\Controllers\Controller;
use App\Mail\UserCreated;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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
        $validatedData = $this->validateRequest();
        $validatedData['password'] = Hash::make($validatedData['password']);
        $email_result = self::RESULT_OK;
        try {
            DB::transaction(function () use ($validatedData) {
                $user = User::create($validatedData);
                $user->courses()->sync([request('course')]);
                $user->assignRole($validatedData['role']);
            });
            $email_result = $this->notifyUserCreated(request('email'), request('password'), route('courses'));
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with(Toast::error('Ocurrió un error al crear el usuario.'));
        }

        if ($email_result == self::RESULT_OK) {
            $msg = "Utilizador creado exitosamente.";
            return redirect()->route('admin.users')->with(Toast::success($msg));
        } else {
            $msg = "La cuenta de usuario ha sido creada, pero hubo un problema al enviar el correo electrónico al usuario. Por favor, asegúrese de enviarles un correo electrónico informándoles sus credenciales de inicio de sesión.";
            return redirect()->route('admin.users')->with(Popup::info($msg));
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
        $validatedData = $this->validateRequest($user);

        // Check if password is not null and make a hash
        if ($validatedData['password'] !== null) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            // Else remove password so it doens't get updated
            unset($validatedData['password']);
        }

        try {
            DB::transaction(function () use ($user, $validatedData) {
                $user->update($validatedData);
                $user->syncRoles($validatedData['role']);
                $user->courses()->sync([request('course')]);
            });
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with(Toast::error('Ocurrió un error al actualizar los dados del usuario.'));
        }

        return redirect()->route('admin.users')->with(Toast::success('Utilizador atualizado exitosamente'));
    }

    public function approve()
    {
        $ids = $this->validateIds();
        try {
            DB::transaction(function () use ($ids) {
                foreach ($ids as $id) {
                    User::where('id', $id)->update(['is_approved' => true]);
                }
            });
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->with(Toast::error('Ocurrió un error.'));
        }
        return redirect()->back()->with(Toast::success('Permiciones alteradas exitosamente.'));
    }

    public function unapprove()
    {
        $ids = $this->validateIds();
        try {
            DB::transaction(function () use ($ids) {
                foreach ($ids as $id) {
                    User::where('id', $id)->update(['is_approved' => false]);
                }
            });
        } catch (Exception $e) {
            Log::error($e->getMessage());
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
        $ids = $this->validateIds();
        User::whereIn('id', $ids)->delete();
        return redirect()->back()->with(Toast::success('Todos los utilizadores selecionados han sido eliminados.'));
    }

    /**
     * Called after creating the user, notifies the owner of the user account
     * about their login credentials
     */
    private function notifyUserCreated($email, $password, $link)
    {
        try {
            Mail::to($email)->send(new UserCreated([
                'email' => $email,
                'password' => $password,
                'link' => $link
            ]));
            return self::RESULT_OK;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return self::RESULT_ERROR;
        }
    }

    /**
     * Validates request data for creating or updating a user
     *
     * @param User $userUpdating Optional instance of the user for which we need to validate the request for
     */
    private function validateRequest(User $userUpdating = null)
    {
        $roles = implode(",", [User::SUPER_ADMIN, User::TEACHER, User::STUDENT]);
        $validatedData = request()->validate([
            'name' => 'required|string',
            'email' => 'required|unique:users,email' . ($userUpdating != null ? ',' . $userUpdating->id : ''),
            'password' => ($userUpdating != null ? 'nullable' : 'required') . '|min:6|max:255|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
            'role' => "required|in:$roles",
            'course' => 'required|exists:courses,id'
        ]);

        return $validatedData;
    }

    /**
     * Validates the ids for bulk user action
     */
    private function validateIds()
    {
        $data = request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        return $data['ids'];
    }
}
