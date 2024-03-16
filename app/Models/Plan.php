<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'subscribers'];
    
    public function syncSubscribers(array $ids)
    {
        $this->subscribers()->update(['plan_id' => null]);
        User::whereIn('id', $ids)->update(['plan_id' => $this->id]);
    }
    
    public function subscribers()
    {
        return $this->hasMany(User::class);
    }
}
