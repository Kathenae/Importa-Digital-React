<?php

namespace App\Console\Commands;

use App\Models\User;
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
        $role = $this->choice('Role', [
            User::SUPER_ADMIN,
            User::MODERATOR,
            User::TEACHER,
            User::STUDENT
        ]);

        // create the user
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make($password),
            'is_approved' => true,
        ]);
        $user->assignRole($role);
        $this->info('User Created successfully!');
    }
}
