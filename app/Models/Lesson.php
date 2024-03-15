<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'videoUrl',
    ];
    
    public function files()
    {
        return $this->hasMany(LessonFile::class);
    }
    
    public function courses(){
        return $this->belongsToMany(Course::class);
    }
}
