<?php

namespace App\Http\Controllers\Api;

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
        $totalUsers = User::count();
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalSubCategories = SubCategory::count();
        $totalSubSubCategories = SubSubCategory::count();
        $totalBrands = Brand::count();
        $totalReviews = Review::count();
        $totalActiveCoupons = Coupon::where('coupon_status', '1')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_orders' => $totalOrders,
            'total_products' => $totalProducts,
            'total_categories' => $totalCategories,
            'total_sub_categories' => $totalSubCategories,
            'total_sub_sub_categories' => $totalSubSubCategories,
            'total_brands' => $totalBrands,
            'total_reviews' => $totalReviews,
            'total_active_coupons' => $totalActiveCoupons,
        ]);
    }
    
}
