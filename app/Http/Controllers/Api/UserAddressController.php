<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class UserAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $userAddresses = UserAddress::select('id', 'user_id', 'full_name', 'phone_number', 'street_address', 'city', 'state', 'pincode', 'created_at', 'updated_at')
                ->get();

            return ResponseBuilder::success($userAddresses);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch user addresses.', 500, $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
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

            return ResponseBuilder::success('User address created successfully', 201);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to create user address.', 500, $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $userAddress = UserAddress::select('id', 'user_id', 'full_name', 'phone_number', 'street_address', 'city', 'state', 'pincode', 'created_at', 'updated_at')
                ->find($id);

            if (!$userAddress) {
                return ResponseBuilder::error('User address not found', 404);
            }

            return ResponseBuilder::success($userAddress);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch user address.', 500, $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
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
                return ResponseBuilder::error('User address not found', 404);
            }

            $userAddress->update($request->all());

            return ResponseBuilder::success('User address updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to update user address.', 500, $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $userAddress = UserAddress::find($id);

            if (!$userAddress) {
                return ResponseBuilder::error('User address not found', 404);
            }

            $userAddress->delete();

            return ResponseBuilder::success('User address deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to delete user address.', 500, $e->getMessage());
        }
    }
}
