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

    protected $fillable = [
        'brand_id',
        'category_id',
        'sub_category_id',
        'sub_sub_category_id',
        'product_name',
        'product_slug',
        'product_code',
        'product_quantity',
        'product_tags',
        'product_size',
        'product_colour',
        'product_selling_price',
        'product_discount_price',
        'product_short_desc',
        'product_long_desc',
        'product_thumbnail',
        'hot_deal',
        'featured',
        'special_offer',
        'special_deals',
        'status',
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
}
