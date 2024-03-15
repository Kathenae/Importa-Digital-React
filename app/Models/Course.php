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
        'plans',
        'lessons',
    ];
    
    public function lessons(){
        return $this->belongsToMany(Lesson::class);
    }
    
    public function plans(){
        return $this->belongsToMany(Plan::class);
    }
}
