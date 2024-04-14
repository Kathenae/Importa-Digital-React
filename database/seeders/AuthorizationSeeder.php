<?php

namespace Database\Seeders;

use App\Enums\Permit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthorizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User CRUD Permission
        $UserManagementPermissions[] = Permission::create(['name' => Permit::VIEW_USER]);
        $UserManagementPermissions[] = Permission::create(['name' => Permit::CREATE_USER]);
        $UserManagementPermissions[] = Permission::create(['name' => Permit::EDIT_USER]);
        $UserManagementPermissions[] = Permission::create(['name' => Permit::DESTROY_USER]);
        $UserManagementPermissions[] = Permission::create(['name' => Permit::DESTROY_MANY_USER]);

        // Lesson CRUD Permissions
        $LessonManagementPermissions[] = Permission::create(['name'=> Permit::VIEW_LESSON]);
        $LessonManagementPermissions[] = Permission::create(['name'=> Permit::CREATE_LESSON]);
        $LessonManagementPermissions[] = Permission::create(['name'=> Permit::EDIT_LESSON]);
        $LessonManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_LESSON]);
        $LessonManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_MANY_LESSON]);

        // Course CRUD Permissions
        $CourseManagementPermissions[] = Permission::create(['name'=> Permit::VIEW_COURSE]);
        $CourseManagementPermissions[] = Permission::create(['name'=> Permit::CREATE_COURSE]);
        $CourseManagementPermissions[] = Permission::create(['name'=> Permit::EDIT_COURSE]);
        $CourseManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_COURSE]);
        $CourseManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_MANY_COURSE]);

        // Plan CRUD Permissions
        $PlanManagementPermissions[] = Permission::create(['name'=> Permit::VIEW_PLAN]);
        $PlanManagementPermissions[] = Permission::create(['name'=> Permit::CREATE_PLAN]);
        $PlanManagementPermissions[] = Permission::create(['name'=> Permit::EDIT_PLAN]);
        $PlanManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_PLAN]);
        $PlanManagementPermissions[] = Permission::create(['name'=> Permit::DESTROY_MANY_PLAN]);

        $viewAdminDashboard = Permission::create(['name' => Permit::VIEW_ADMIN_DASHBOARD]);

        $superAdminRole = Role::create(['name' => User::SUPER_ADMIN])
            ->givePermissionTo(Permission::all());

        $teacherRole = Role::create(['name' => User::TEACHER])
            ->givePermissionTo(
                $CourseManagementPermissions,
                $LessonManagementPermissions,
                $viewAdminDashboard
            );

        $studentRole = Role::create(['name' => User::STUDENT])
            ->givePermissionTo(
                Permit::VIEW_LESSON,
            );
    }
}
