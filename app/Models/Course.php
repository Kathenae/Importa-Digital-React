<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'duration_years',
        'candidate_profile',
        'headquarters',
        'schedule',
        'cover_url',
        'banner_url',
        'video_url',
        'plans',
        'lessons',
        'subjects',
    ];

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class);
    }

    public function plans()
    {
        return $this->belongsToMany(Plan::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function students(){
        return $this->belongsToMany(User::class);
    }

    public function teachers(){
        return $this->belongsToMany(User::class, 'teacher_course', 'course_id', 'user_id');
    }
}
