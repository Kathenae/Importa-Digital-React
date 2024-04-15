<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    const SUPER_ADMIN = 'super-admin';
    const MODERATOR = 'moderator';
    const TEACHER = 'teacher';
    const STUDENT = 'student';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_approved',
        'plan_id',
    ];
    
    protected $appends = [
        'role',
        'permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'roles',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_approved' => 'boolean',
    ];

    public function getRoleAttribute() {
        $roles = $this->getRoleNames();
        if(count($roles) == 0){
            return '';
        }
        return $roles[0];
    }

    public function getPermissionsAttribute(){
        $role = $this->roles()->where('name', $this->role)->first();
        if($role == null){
            return [];
        }

        return $role->getPermissionNames();
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function assignedCourses() {
        return $this->belongsToMany(Course::class, 'teacher_course', 'user_id', 'course_id');
    }

    public function isTeacher(){
        $this->hasRole(User::TEACHER);
    }

    public function isStudent(){
        $this->hasRole(User::STUDENT);
    }
}
