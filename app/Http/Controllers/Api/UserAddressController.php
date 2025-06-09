<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class UserAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userAddresses = UserAddress::select('id', 'user_id', 'full_name', 'phone_number', 'street_address', 'city', 'state', 'pincode', 'created_at', 'updated_at')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $userAddresses
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
        ]);

        $userAddress = UserAddress::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'User address created successfully',
            'data' => $userAddress
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userAddress = UserAddress::select('id', 'user_id', 'full_name', 'phone_number', 'street_address', 'city', 'state', 'pincode', 'created_at', 'updated_at')
            ->find($id);

        if (!$userAddress) {
            return response()->json([
                'status' => 'error',
                'message' => 'User address not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $userAddress
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'street_address' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:10',
        ]);

        $userAddress = UserAddress::find($id);

        if (!$userAddress) {
            return response()->json([
                'status' => 'error',
                'message' => 'User address not found'
            ], 404);
        }

        $userAddress->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'User address updated successfully',
            'data' => $userAddress
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userAddress = UserAddress::find($id);

        if (!$userAddress) {
            return response()->json([
                'status' => 'error',
                'message' => 'User address not found'
            ], 404);
        }

        $userAddress->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User address deleted successfully'
        ], 200);
    }
}
