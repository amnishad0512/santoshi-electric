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
                    ['value' => 0, 'label' => 'Inactive'],
                    ['value' => 1, 'label' => 'Active'],
                    ['value' => 2, 'label' => 'Coming Soon'],
                ],
                'categoryStatus' => [
                    ['value' => 0, 'label' => 'Inactive'],
                    ['value' => 1, 'label' => 'Active'],
                    ['value' => 2, 'label' => 'Deleted'],
                ],
                'userStatus' => [
                    ['value' => 0, 'label' => 'Inactive'],
                    ['value' => 1, 'label' => 'Active'],
                    ['value' => 2, 'label' => 'Pending'],
                    ['value' => 3, 'label' => 'Banned'],
                ],
                'orderStatus' => [
                    ['value' => 0, 'label' => 'Pending'],
                    ['value' => 1, 'label' => 'Confirmed'],
                    ['value' => 2, 'label' => 'Processing'],
                    ['value' => 3, 'label' => 'Shipped'],
                    ['value' => 4, 'label' => 'Out for Delivery'],
                    ['value' => 5, 'label' => 'Delivered'],
                    ['value' => 6, 'label' => 'Cancelled'],
                    ['value' => 7, 'label' => 'Returned'],
                    ['value' => 8, 'label' => 'Refunded'],
                ],
                'couponStatus' => [
                    ['value' => 0, 'label' => 'Inactive'],
                    ['value' => 1, 'label' => 'Active'],
                    ['value' => 2, 'label' => 'Scheduled'],
                ]
            ];

            return ResponseBuilder::success($data);

        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch status data.', 500, $e->getMessage());
        }
    }
}
