<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class LessonFile extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'lesson_id',
        'filename',
        'path'
    ];
    
    protected $appends = ['full_url'];
    
    public function getFullUrlAttribute(){
        return Storage::url($this->path);
    }
    
    public function delete(){
        Storage::disk()->delete($this->path);
        return parent::delete();
    }
}
