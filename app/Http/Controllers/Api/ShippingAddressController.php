<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;

class ShippingAddressController extends Controller
{
    public function index()
    {
        return response()->json(ShippingAddress::with(['user', 'order'])->get());
    }

    public function store(Request $request)
    {
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

        $shippingAddress = ShippingAddress::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Shipping Address created successfully',
            'data' => $shippingAddress
        ], 201);
    }

    public function show($id)
    {
        $shippingAddress = ShippingAddress::with(['user', 'order'])->findOrFail($id);

        if (!$shippingAddress) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping Address not found'
            ], 404);
        }

        return response()->json($shippingAddress);
    }

    public function update(Request $request, $id)
    {
        $shippingAddress = ShippingAddress::findOrFail($id);

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

        return response()->json([
            'success' => true,
            'message' => 'Shipping Address updated successfully',
            'data' => $shippingAddress
        ]);
    }

    public function destroy($id)
    {
        $shippingAddress = ShippingAddress::find($id);

        if (!$shippingAddress) {
            return response()->json([
                'success' => false,
                'message' => 'Shipping Address not found'
            ], 404);
        }

        $shippingAddress->delete();

        return response()->json([
            'success' => true,
            'message' => 'Shipping Address deleted successfully'
        ]);
    }
}
