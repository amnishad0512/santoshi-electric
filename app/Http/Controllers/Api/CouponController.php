<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index()
    {
        return response()->json(Coupon::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'coupon_name' => 'required|string|max:255',
            'discount_type' => 'required',
            'coupon_discount' => 'required',
            'coupon_validity' => 'required|date',
            'coupon_status' => 'boolean',
        ]);

        $coupon = Coupon::create([
            'coupon_name' => $request->coupon_name,
            'discount_type' => $request->discount_type,
            'coupon_discount' => $request->coupon_discount,
            'minimum_purchase' => $request->minimum_purchase,
            'maximum_discount' => $request->maximum_discount,
            'usage_limit' => $request->usage_limit,
            'coupon_start_date' => $request->coupon_start_date,
            'coupon_validity' => $request->coupon_validity,
            'coupon_status' => $request->coupon_status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Coupon created successfully',
            'data' => $coupon
        ], 201);
    }

    public function show($id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        return response()->json(Coupon::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        $request->validate([
            'coupon_name' => 'required|string|max:255',
            'discount_type' => 'required',
            'coupon_discount' => 'required',
            'coupon_validity' => 'required|date',
            'coupon_status' => 'boolean',
        ]);

        $coupon->update([
            'coupon_name' => $request->coupon_name,
            'discount_type' => $request->discount_type,
            'coupon_discount' => $request->coupon_discount,
            'minimum_purchase' => $request->minimum_purchase,
            'maximum_discount' => $request->maximum_discount,
            'usage_limit' => $request->usage_limit,
            'coupon_start_date' => $request->coupon_start_date,
            'coupon_validity' => $request->coupon_validity,
            'coupon_status' => $request->coupon_status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Coupon updated successfully',
            'data' => $coupon
        ]);
    }

    public function destroy($id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        $coupon->delete();

        return response()->json([
            'success' => true,
            'message' => 'Coupon deleted successfully'
        ]);
    }
}
