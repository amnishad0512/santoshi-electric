<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Helpers\ResponseBuilder;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::select('id', 'name', 'phone_number', 'email', 'role', 'status', 'profile_photo_path', 'created_at', 'updated_at')
                ->get();

            if ($users->isEmpty()) {
                return ResponseBuilder::success([
                    'message' => 'No users found',
                ]);
            }

            return ResponseBuilder::success($users);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch users', 500, $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:15|unique:users,phone_number',
                'email' => 'required|email|unique:users,email',
                'role' => 'required',
                'status' => 'required|in:0,1,2,3',
                'profile_photo_path' => 'required',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $pass = rand(100000, 999999);

            $user = new User();
            $user->name = $request->name;
            $user->phone_number = $request->phone_number;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->email_verified_at = now();
            $user->password = bcrypt($pass);
            $user->password_salt = $pass;
            $user->status = $request->status ?? 1;

            // Handle image upload
            if ($request->hasFile('profile_photo_path')) {
                $imagePath = $request->file('profile_photo_path')->store('profile_photos', 'public');
                $user->profile_photo_path = $imagePath;
            }

            $user->save();

            return ResponseBuilder::success('User created successfully');

        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to create user', 500, $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::select('id', 'name', 'phone_number', 'email', 'role', 'status', 'profile_photo_path', 'created_at', 'updated_at')
                ->find($id);

            if (!$user) {
                return ResponseBuilder::error('User not found', 404);
            }

            return ResponseBuilder::success($user);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch user', 500, $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return ResponseBuilder::error('User not found', 404);
            }
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:15|unique:users,phone_number,' . $id,
                'email' => 'required|email|unique:users,email,' . $id,
                'role' => 'required',
                'status' => 'nullable|in:0,1,2,3',
                'profile_photo_path' => 'nullable',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $user->name = $request->name;
            $user->phone_number = $request->phone_number;
            $user->email = $request->email;
            $user->role = $request->role;
            if ($request->has('status')) {
                $user->status = $request->status;
            }
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
            $user->save();

            return ResponseBuilder::success('User updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to update user', 500, $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return ResponseBuilder::error('User not found', 404);
            }

            $user->delete();

            return ResponseBuilder::success('User deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to delete user', 500, $e->getMessage());
        }
    }

    public function profile(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseBuilder::error('User not authenticated', 401);
            }

            // If GET, return user profile
            if ($request->isMethod('get')) {
                $userInfo = User::where('id', $user->id)
                    ->select('id', 'name', 'phone_number', 'email', 'profile_photo_path', 'role', 'status', 'last_login', 'created_at', 'updated_at')
                    ->first();

                return ResponseBuilder::success($userInfo);
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
                    return ResponseBuilder::error($validator->errors(), 422);
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
                        return ResponseBuilder::error('Only admins can update the role.', 403);
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

                return ResponseBuilder::success('Profile updated successfully');
            }

            // Invalid Method
            return ResponseBuilder::error('Method not allowed.', 405);
        } catch (\Exception $e) {
            return ResponseBuilder::error('An error occurred while processing the request.', 500, $e->getMessage());
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseBuilder::error('User not authenticated', 401);
            }

            // Validate input
            $validator = Validator::make($request->all(), [
                'current_password' => 'required|string',
                'new_password' => [
                    'required',
                    'string',
                    'min:8',
                    'regex:/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=\S+$).+$/'
                ],
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors(), 422);
            }

            // Check if current password matches
            if (!Hash::check($request->current_password, $user->password)) {
                return ResponseBuilder::error('Current password is incorrect', 400);
            }

            // Check if new password is the same as current password
            if (Hash::check($request->new_password, $user->password)) {
                return ResponseBuilder::error('New password cannot be the same as the current password', 400);
            }

            // Update to new password
            $user->password = Hash::make($request->new_password);
            $user->save();

            return ResponseBuilder::success('Password changed successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to change password', 500, $e->getMessage());
        }
    }
}
