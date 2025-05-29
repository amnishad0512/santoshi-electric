<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
     protected $fillable = [
        'title',
        'slug',
        'description',
        'short_description',
        'image',
        'price',
        'discount',
        'seller_id',
        'is_available',
        'rating',
    ];
}
