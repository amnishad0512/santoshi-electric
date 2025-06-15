<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
class Brand extends Model
{
    use HasFactory;

    protected $guarded = [
    ];

    public function brands()
    {
        return $this->hasMany(Category::class);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function productCount()
    {
        return $this->hasMany(Product::class)->count('id');
    }

    // public function productDetails()
    // {
    //     return $this->hasMany(Product::class)->select([
    //     'id',
    //     'brand_id',
    //     'category_id',
    //     'product_name',
    //     'product_short_desc',
    //     'product_selling_price',
    //     'product_quantity',
    //     'status',
    // ]);
    // }

    public function getBrandImageAttribute($value)
    {
        if ($value) {
            return url('storage/' . $value); 
        }

        return asset('images/default_product.jpg'); 
        // return url('public/storage/' . $value);
        
    }
}
