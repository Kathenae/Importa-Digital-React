<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Console\Command;

class Permission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:permission {method} {action} {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Allows granting or revoking a specific permission for a specific user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $method = $this->argument('method');
        $action = $this->argument('action');
        $email = $this->argument('user');
        
        $user = User::query()->where('email', $email)->first();
        if($user == null)
        {
            $this->error("User with email '$email' Does not exist");
            return;
        }
        
        $permission = UserPermission::query()
            ->where('user_id', $user->id)
            ->where('action', $action)
            ->first();
            
        if($method == 'grant'){
            
            if($permission != null)
            {
                $this->info('User already has this permission');
                return;
            }
            
            UserPermission::query()->insert([
                ['user_id' => $user->id, 'action' => $action]
            ]);
            $this->info("Permission granted successfully!");
        }
        else if($method == 'revoke')
        {
            if($permission == null){
                $this->info('User does not have that permission already');
                return;
            }
            $permission->delete();
            $this->info("Permission revoked successfully!");
        }
        else{
            $this->error("Unknow method `$method`");
        }
    }
}
