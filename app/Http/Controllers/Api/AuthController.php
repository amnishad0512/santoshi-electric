<?php



namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;

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

            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 422);
        }

        try {

            $user = User::create([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'status' => $request->status,
            ]);
            $user->created_by = $user->id; // or any other user ID
            $user->updated_by = $user->id; // or any other user ID
            $user->save();

            DB::commit();
            return response()->json([
                'status' => 'success',
                'user' => $user
            ], 201);
        } catch (\Exception  $e) {
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 401);
        }
    }


    public function Login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 422);
        }

        try {

            $user = User::where('phone_number', $request->phone_number)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid phone number or password',
                    'data' => [],
                ], 401);
            }

            // Create Passport token
            $token = $user->createToken('LaravelAuthApp')->accessToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'token' => $token,
                    'user' => $user,
                ]
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 401);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone_number' => 'nullable|digits:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
                'data' => [],
            ], 422);
        }

        try {
            if ($request->phone_number) {
                $user = User::where('phone_number', $request->phone_number)->first();
            }

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No user found with the provided details',
                    'data' => [],
                ], 404);
            }

            $otp = rand(100000, 999999);
            $otpExpiry = now()->addMinutes(10);

            // Save OTP and expiry in user table
            $user->otp = $otp;
            $user->otp_expires_at = $otpExpiry;
            $user->save();

            // Send SMS (if phone exists and you have SMS service)
            if ($request->phone_number) {
                // $this->sendSmsOtp($request->phone_number, $otp);
                \Log::info("OTP for {$request->phone_number} is {$otp}");
            }

            // Send email if email provided
            if ($user->email) {
                Mail::to($user->email)->send(new SendOtpMail($otp));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'OTP sent successfully',
                'data' => [],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function verifyOtpAndResetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|digits:6',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
                'data' => [],
            ], 422);
        }

        // Find user by OTP and check expiry
        $user = User::where('otp', $request->otp)
            ->where('otp_expires_at', '>', now())
            ->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired OTP',
                'data' => [],
            ], 400);
        }

        // Update password
        $user->password = Hash::make($request->password);

        // Clear OTP after use
        $user->otp = null;
        $user->otp_expires_at = null;

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password has been reset successfully',
            'data' => [],
        ], 200);
    }

}
