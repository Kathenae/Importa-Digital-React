<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\User;
use App\Models\UserPermission;
use Exception;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all()->load('permissions')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UserCreate', [
            'plans' => Plan::all()
        ]);
    }

    public function store()
    {
        $validatedData = request()->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
            'role' => 'required|in:admin,student',
            'plan_id' => 'required|exists:plans,id',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        try {
            \DB::transaction(function () use ($validatedData) {
                $user = User::create($validatedData);

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
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return back()->with(['flash.error' => 'Ocurrió un error al crear el usuario.']);
        }

        return redirect()->route('admin.users')->with('flash.success', 'Utilizador creado exitosamente');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/UserEdit', [
            'user' => $user->load('plan'),
            'plans' => Plan::all(),
        ]);
    }

    public function update(User $user)
    {
        $validatedData = request()->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'nullable|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
            'plan_id' => 'required|exists:plans,id',
        ]);

        if ($validatedData['password'] !== null) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $user->update($validatedData);

        return redirect()->route('admin.users')->with('flash.success', 'Utilizador atualizado exitosamente');
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
            return back()->with(['flash.error' => 'Ocurrió un error.']);
        }

        return redirect()->back()->with('flash.sucess', 'Permiciones alteradas exitosamente.');
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
            return back()->with(['flash.error' => 'Ocurrió un error.']);
        }

        return redirect()->back()->with('flash.sucess', 'Permiciones alteradas exitosamente.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('flash.success', 'Utilizador eliminado exitosamente.');
    }

    public function destroyMany()
    {
        request()->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);

        $ids = request('ids');
        User::whereIn('id', $ids)->delete();

        return redirect()->back()->with('flash.success', 'Todos los utilizadores selecionados han sido eliminados.');
    }
}
