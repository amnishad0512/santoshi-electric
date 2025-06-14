<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;
use Validator;

class CouponController extends Controller
{
    public function index()
    {   
        try {
            $coupons = Coupon::select('id', 'coupon_name', 'discount_type', 'coupon_discount', 'minimum_purchase', 'maximum_discount', 'usage_limit', 'coupon_start_date', 'coupon_validity', 'coupon_status', 'created_at', 'updated_at')->get();
            return ResponseBuilder::success($coupons);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'coupon_name' => 'required|string|max:255',
                'discount_type' => 'required',
                'coupon_discount' => 'required',
                'minimum_purchase' => 'required',
                'maximum_discount' => 'required',
                'usage_limit' => 'required',
                'coupon_start_date' => 'required|date',
                'coupon_validity' => 'required|date',
                'coupon_status' => 'required|in:0,1,2',      

            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

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

            return ResponseBuilder::success('Coupon created successfully', 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $coupon = Coupon::find($id);

            if (!$coupon) {
                return ResponseBuilder::error('Coupon not found', 404);
            }

            return ResponseBuilder::success($coupon);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $coupon = Coupon::find($id);

            if (!$coupon) {
                return ResponseBuilder::error('Coupon not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'coupon_name' => 'required|string|max:255',
                'discount_type' => 'required',
                'coupon_discount' => 'required',
                'minimum_purchase' => 'required',
                'maximum_discount' => 'required',
                'usage_limit' => 'required',
                'coupon_start_date' => 'required|date',
                'coupon_validity' => 'required|date',
                'coupon_status' => 'nullable|in:0,1,2',      
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

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

            return ResponseBuilder::success('Coupon updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $coupon = Coupon::find($id);

            if (!$coupon) {
                return ResponseBuilder::error('Coupon not found', 404);
            }

            $coupon->delete();

            return ResponseBuilder::success('Coupon deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
