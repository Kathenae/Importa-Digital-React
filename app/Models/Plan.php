<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'lessons'];
    
    public function lessons()
    {
        return $this->belongsToMany(Lesson::class);
    }
    
    public function subscribers()
    {
        return $this->belongsToMany(User::class);
    }
}
