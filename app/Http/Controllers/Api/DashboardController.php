<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseBuilder;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Models\User;

class DashboardController extends Controller
{
    // all tables counts api - craeted by Yogi (date: 08jun25)
    public function adminDashboardStats()
    {
        try {
            $data['totalUsers'] = User::count();
            $data['totalOrders'] = Order::count();
            $data['totalProducts'] = Product::count();
            $data['totalCategories'] = Category::count();
            $data['totalSubCategories'] = SubCategory::count();
            $data['totalSubSubCategories'] = SubSubCategory::count();
            $data['totalBrands'] = Brand::count();
            $data['totalReviews'] = Review::count();
            $data['totalActiveCoupons'] = Coupon::where('coupon_status', '1')->count();

            return ResponseBuilder::success($data);
            
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch dashboard stats.', 500, $e->getMessage());
        }

    }
    
}
