<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Models\ProductImage;
use App\Models\Review;
class Product extends Model
{
    use HasFactory;

    protected $guarded = [
        
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function subSubCategory()
    {
        return $this->belongsTo(SubSubCategory::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // public function getProductThumbnailAttribute($value)
    // {
    //     return url('public/storage/' . $value);
    // }

    public function getProductThumbnailAttribute($value)
    {
        if ($value) {
            return url('public/storage/' . $value); 
        }

        return asset('public/images/default_product.jpg'); 
    }
}
