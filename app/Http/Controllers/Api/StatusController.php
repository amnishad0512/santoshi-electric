<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatusController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $data = [
                'brandStatus' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'comingSoon', 'label' => 'Coming Soon'],
                ],
                'categoryStatus' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'deleted', 'label' => 'Deleted'],
                ],
                'userStatus' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'pending', 'label' => 'Pending'],
                    ['value' => 'banned', 'label' => 'Banned'],
                ],
                'orderStatus' => [
                    ['value' => 'pending', 'label' => 'Pending'],
                    ['value' => 'confirmed', 'label' => 'Confirmed'],
                    ['value' => 'processing', 'label' => 'Processing'],
                    ['value' => 'shipped', 'label' => 'Shipped'],
                    ['value' => 'outForDelivery', 'label' => 'Out for Delivery'],
                    ['value' => 'delivered', 'label' => 'Delivered'],
                    ['value' => 'cancelled', 'label' => 'Cancelled'],
                    ['value' => 'returned', 'label' => 'Returned'],
                    ['value' => 'refunded', 'label' => 'Refunded'],
                ],
                'couponStatus' => [
                    ['value' => 'active', 'label' => 'Active'],
                    ['value' => 'inactive', 'label' => 'Inactive'],
                    ['value' => 'scheduled', 'label' => 'Scheduled'],
                ]
            ];

            return ResponseBuilder::success($data);

        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch status data.', 500, $e->getMessage());
        }
    }
}
