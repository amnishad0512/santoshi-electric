<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function adminDashboardStats()
    {
        $totalUsers = \App\Models\User::count();
        $totalOrders = \App\Models\Order::count();
        $totalProducts = \App\Models\Product::count();
        $totalCategories = \App\Models\Category::count();
        $totalSubCategories = \App\Models\SubCategory::count();
        $totalSubSubCategories = \App\Models\SubSubCategory::count();
        $totalBrands = \App\Models\Brand::count();
        $totalReviews = \App\Models\Review::count();
        $totalActiveCoupons = \App\Models\Coupon::where('status', '1')->count();

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
