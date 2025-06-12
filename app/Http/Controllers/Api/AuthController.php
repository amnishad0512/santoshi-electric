<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ResponseBuilder;

class AuthController extends Controller
{
    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|digits:10|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|integer',
            'status' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::error($validator->errors()->first(), 422);
        }

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'password_salt' => $request->password,
                'role' => $request->role,
                'status' => $request->status,
            ]);
            $user->created_by = $user->id;
            $user->updated_by = $user->id;
            $user->save();

            DB::commit();
            return ResponseBuilder::success('User registered successfully', 201);
        } catch (\Exception  $e) {
            DB::rollBack();
            return ResponseBuilder::error($e->getMessage(), 401);
        }
    }

    public function Login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::error($validator->errors()->first(), 422);
        }

        try {
            $user = User::where('phone_number', $request->phone_number)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return ResponseBuilder::error('Invalid phone number or password', 401);
            }

            $token = $user->createToken('LaravelAuthApp')->accessToken;
            $user->last_login = date('Y-m-d H:i:s');
            $user->save();
            $data = ['token' => $token];
            return ResponseBuilder::success($data);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 401);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'nullable|digits:10',
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::error($validator->errors()->first(), 422);
        }

        try {
            $user = null;
            if ($request->phone_number) {
                $user = User::where('phone_number', $request->phone_number)->first();
            }

            if (!$user) {
                return ResponseBuilder::error('No user found with the provided details', 404);
            }

            $otp = rand(100000, 999999);
            $otpExpiry = now()->addMinutes(10);

            $user->otp = $otp;
            $user->otp_expires_at = $otpExpiry;
            $user->save();

            if ($request->phone_number) {
                \Log::info("OTP for {$request->phone_number} is {$otp}");
            }

            if ($user->email) {
                Mail::to($user->email)->send(new SendOtpMail($otp));
            }

            return ResponseBuilder::success('OTP sent successfully', 200);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function verifyOtpAndResetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|digits:6',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return ResponseBuilder::error($validator->errors()->first(), 422);
        }

        try {
            $user = User::where('otp', $request->otp)
                ->where('otp_expires_at', '>', now())
                ->first();

            if (!$user) {
                return ResponseBuilder::error('Invalid or expired OTP', 400);
            }

            $user->password = Hash::make($request->password);
            $user->password_salt = $request->password;
            $user->otp = null;
            $user->otp_expires_at = null;
            $user->save();

            return ResponseBuilder::success('Password has been reset successfully', 200);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseBuilder::error('User not authenticated', 401);
            }

            $user->token()->revoke();

            return ResponseBuilder::success('Logged out successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
