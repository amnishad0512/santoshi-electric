<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class ShippingAddressController extends Controller
{
    public function index()
    {
        try {
            $shippingAddresses = ShippingAddress::select('id', 'user_id', 'order_id', 'address_line_1', 'address_line_2', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at')
                ->with(['user:id,name,email', 'order:id,order_status,order_total'])
                ->get();

            return ResponseBuilder::success($shippingAddresses);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'order_id' => 'required|exists:orders,id',
                'address_line_1' => 'required|string|max:255',
                'address_line_2' => 'nullable|string|max:255',
                'city' => 'required|string|max:100',
                'state' => 'required|string|max:100',
                'postal_code' => 'required|string|max:20',
                'country' => 'required|string|max:100',
            ]);

            ShippingAddress::create($request->all());

            return ResponseBuilder::success('Shipping Address created successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $shippingAddress = ShippingAddress::select('id', 'user_id', 'order_id', 'address_line_1', 'address_line_2', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at')
                ->with(['user:id,name,email', 'order:id,order_status,order_total'])
                ->find($id);

            if (!$shippingAddress) {
                return ResponseBuilder::error('Shipping Address not found', 404);
            }

            return ResponseBuilder::success($shippingAddress);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $shippingAddress = ShippingAddress::find($id);

            if (!$shippingAddress) {
                return ResponseBuilder::error('Shipping Address not found', 404);
            }

            $request->validate([
                'user_id'        => 'required|exists:users,id',
                'order_id'       => 'required|exists:orders,id',
                'address_line_1' => 'sometimes|required|string|max:255',
                'address_line_2' => 'nullable|string|max:255',
                'city' => 'sometimes|required|string|max:100',
                'state' => 'sometimes|required|string|max:100',
                'postal_code' => 'sometimes|required|string|max:20',
                'country' => 'sometimes|required|string|max:100',
            ]);

            $shippingAddress->update($request->all());

            return ResponseBuilder::success('Shipping Address updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $shippingAddress = ShippingAddress::find($id);

            if (!$shippingAddress) {
                return ResponseBuilder::error('Shipping Address not found', 404);
            }

            $shippingAddress->delete();

            return ResponseBuilder::success('Shipping Address deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
