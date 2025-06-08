<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::select('id', 'name', 'phone_number', 'email', 'role', 'status', 'created_at')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15|unique:users,phone_number',
            'email' => 'required|email',
            'role' => 'required',
        ]);

        $pass = rand(100000, 999999);

        $user = User::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'role' => $request->role,
            'email' => $request->email,
            'email_verified_at' => now(),
            'password' => bcrypt($pass), // Random password
            'password_salt' => $pass,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::select('id', 'name', 'phone_number', 'email', 'role', 'status', 'created_at', 'updated_at')
            ->find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required',
            'phone_number' => 'required|string|max:15|unique:users,phone_number,' . $id,
            'email' => 'required|email',
            'role' => 'required',
        ]);

        $user->update([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ], 200);
    }

    // public function userProfile()
    // {
    //     $user = Auth::user();
    //     if (!$user) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'User not authenticated'
    //         ], 401);
    //     }
    //     $userInfo = User::where('id', $user->id)
    //         ->select('id', 'name', 'phone_number', 'email', 'profile_photo_path', 'role', 'status', 'last_login', 'created_at', 'updated_at')
    //         ->first();
    //     return response()->json([
    //         'status' => 'success',
    //         'data' => $userInfo
    //     ]);
    // }


    // public function updateProfile(Request $request)
    // {
    //     $user = Auth::user();

    //     if (!$user) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'User not authenticated'
    //         ], 401);
    //     }

    //     // Validate the request data
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'nullable|string|max:255',
    //         'phone_number' => 'nullable|digits:10|unique:users,phone_number,' . $user->id,
    //         'email' => 'nullable|email|unique:users,email,' . $user->id,
    //         'role' => 'nullable|in:1,2',
    //         'status' => 'nullable|in:0,1',
    //         'profile_photo_path' => 'nullable|image',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 'error',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     // Update the fields if provided
    //     if ($request->filled('name')) $user->name = $request->name;
    //     if ($request->filled('phone_number')) $user->phone_number = $request->phone_number;
    //     if ($request->filled('email')) $user->email = $request->email;
    //     if (Auth::user()->role == 1 && $request->filled('role')) {
    //             $user->role = $request->role;
    //         }
    //         if ($request->filled('role') && Auth::user()->role != 1) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Only admins can update the role.'
    //             ], 403);
    //         }
        
    //     if ($request->filled('status')) $user->status = $request->status;

    //     // Handle profile photo update
    //     if ($request->hasFile('profile_photo_path')) {
    //         // Delete old image if it exists
    //         if ($user->profile_photo_path) {
    //             $oldImagePath = str_replace('storage/', '', $user->profile_photo_path);
    //             if (Storage::disk('public')->exists($oldImagePath)) {
    //                 Storage::disk('public')->delete($oldImagePath);
    //             }
    //         }

    //         // Store new image
    //         $imagePath = $request->file('profile_photo_path')->store('profile_photos', 'public');
    //         $user->profile_photo_path =  $imagePath;
    //     }

    //     $user->updated_by = $user->id; 
    //     $user->save();

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Profile updated successfully',
    //     ]);
    // }

    public function profile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated'
            ], 401);
        }

        // If GET, return user profile
        if ($request->isMethod('get')) {
            $userInfo = User::where('id', $user->id)
                ->select('id', 'name', 'phone_number', 'email', 'profile_photo_path', 'role', 'status', 'last_login', 'created_at', 'updated_at')
                ->first();

            return response()->json([
                'status' => 'success',
                'data' => $userInfo
            ]);
        }

        // If POST, update user profile
        if ($request->isMethod('post')) {
            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'phone_number' => 'nullable|digits:10|unique:users,phone_number,' . $user->id,
                'email' => 'nullable|email|unique:users,email,' . $user->id,
                'role' => 'nullable|in:1,2',
                'status' => 'nullable|in:0,1',
                'profile_photo_path' => 'nullable|image',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update fields if provided
            if ($request->filled('name')) $user->name = $request->name;
            if ($request->filled('phone_number')) $user->phone_number = $request->phone_number;
            if ($request->filled('email')) $user->email = $request->email;

            // Role update only by admin
            if ($request->filled('role')) {
                if ($user->role == 1) {
                    $user->role = $request->role;
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Only admins can update the role.'
                    ], 403);
                }
            }

            if ($request->filled('status')) $user->status = $request->status;

            // Handle profile photo update
            if ($request->hasFile('profile_photo_path')) {
                if ($user->profile_photo_path) {
                    $oldImagePath = str_replace('storage/', '', $user->profile_photo_path);
                    if (Storage::disk('public')->exists($oldImagePath)) {
                        Storage::disk('public')->delete($oldImagePath);
                    }
                }

                $imagePath = $request->file('profile_photo_path')->store('profile_photos', 'public');
                $user->profile_photo_path = $imagePath;
            }

            $user->updated_by = $user->id;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully',
            ]);
        }

        // Invalid Method
        return response()->json([
            'status' => 'error',
            'message' => 'Method not allowed.'
        ], 405);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated',
            ], 401);
        }

        // Validate input
       $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => [ 'required','string','min:8',
            'regex:/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=\S+$).+$/'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if current password matches
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect',
            ], 400);
        }

        // Check if new password is the same as current password
        if (Hash::check($request->new_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'New password cannot be the same as the current password',
            ], 400);
        }

        // Update to new password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully',
        ]);
    }



}
