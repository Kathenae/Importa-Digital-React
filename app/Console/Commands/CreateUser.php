<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new user with some permission';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // ask for name, email, password, role
        $name = $this->ask('Name');
        $email = $this->ask('Email');
        $password = $this->secret('Password');
        $role = $this->choice('Role', ['admin', 'student']);

        // create the user
        $user = \App\Models\User::create([
            'name' => $name,
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make($password),
            'is_approved' => true,
        ]);

        // create the permissions
        if ($role === 'admin') {
            \App\Models\UserPermission::insert([
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

                ['user_id' => $user->id, 'action' => 'create@Course'],
                ['user_id' => $user->id, 'action' => 'edit@Course'],
                ['user_id' => $user->id, 'action' => 'view@Course'],
                ['user_id' => $user->id, 'action' => 'destroy@Course'],
                ['user_id' => $user->id, 'action' => 'destroyMany@Course'],
            ]);
        } elseif ($role === 'student') {
            \App\Models\UserPermission::insert([
                ['user_id' => $user->id, 'action' => 'view@Lesson'],
                ['user_id' => $user->id, 'action' => 'watch@Lesson'],
            ]);
        }

        $this->info('User Created successfully!');
    }
}
