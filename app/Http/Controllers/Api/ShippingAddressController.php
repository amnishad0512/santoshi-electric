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
        $shippingAddresses = ShippingAddress::with(['user', 'order'])
            ->select('id', 'user_id', 'order_id', 'address_line_1', 'address_line_2', 'city', 'state', 'postal_code', 'country')
            ->get();

        return ResponseBuilder::success('Shipping Addresses fetched successfully', $shippingAddresses);
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

        return ResponseBuilder::success('Shipping Address created successfully', $shippingAddress, 201);
    }

    public function show($id)
    {
        $shippingAddress = ShippingAddress::with(['user', 'order'])->find($id);

        if (!$shippingAddress) {
            return ResponseBuilder::error('Shipping Address not found', null, 404);
        }

        return ResponseBuilder::success('Shipping Address fetched successfully', $shippingAddress);
    }

    public function update(Request $request, $id)
    {
        $shippingAddress = ShippingAddress::find($id);

        if (!$shippingAddress) {
            return ResponseBuilder::error('Shipping Address not found', null, 404);
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

        return ResponseBuilder::success('Shipping Address updated successfully', $shippingAddress);
    }

    public function destroy($id)
    {
        $shippingAddress = ShippingAddress::find($id);

        if (!$shippingAddress) {
            return ResponseBuilder::error('Shipping Address not found', null, 404);
        }

        $shippingAddress->delete();

        return ResponseBuilder::success('Shipping Address deleted successfully');
    }
}
