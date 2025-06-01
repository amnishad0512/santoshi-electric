<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Brand extends Model
{
    use HasFactory;

     protected $fillable = [
        'brand_name',
        'brand_slug',
        'brand_image',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
