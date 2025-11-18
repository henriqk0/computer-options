<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\CategoryLevelEnum;

class AnyComponent extends Model
{
    protected $table = "tbl_anycomponent";
    protected $primaryKey = "anycomponent_id";
    protected $fillable = ["nameComponent", "categoryLevel", "bestPrice", "datePrice", "urlPrice"];

    protected $casts = [
        'categoryLevel' => CategoryLevelEnum::class,
    ];

    protected $hidden = ["created_at", "updated_at"];

    public function relatedReviews()
    {
        return $this->hasMany(Review::class, 'anycomponent_id');
    }

}
