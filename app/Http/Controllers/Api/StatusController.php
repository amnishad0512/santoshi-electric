<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatusController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'brand_status' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'coming_soon', 'label' => 'Coming Soon'],
                ],
                'category_status' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'deleted', 'label' => 'Deleted'],
                ],
                'user_status' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'pending', 'label' => 'Pending'],
                    ['value' => 'banned', 'label' => 'Banned'],
                ],
                'order_status' => [
                    ['value' => 'pending', 'label' => 'Pending'],
                    ['value' => 'confirmed', 'label' => 'Confirmed'],
                    ['value' => 'processing', 'label' => 'Processing'],
                    ['value' => 'shipped', 'label' => 'Shipped'],
                    ['value' => 'out_for_delivery', 'label' => 'Out for Delivery'],
                    ['value' => 'delivered', 'label' => 'Delivered'],
                    ['value' => 'cancelled', 'label' => 'Cancelled'],
                    ['value' => 'returned', 'label' => 'Returned'],
                    ['value' => 'refunded', 'label' => 'Refunded'],
                ],
                'coupon_status' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'scheduled', 'label' => 'Scheduled'],
                ]
            ]
        ], 200);
    }
}
