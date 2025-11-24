<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'anycomponent_id',
        'user_id',
        'rating',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function anycomponent()
    {
        return $this->belongsTo(AnyComponent::class, 'anycomponent_id', 'anycomponent_id');
    }
}
