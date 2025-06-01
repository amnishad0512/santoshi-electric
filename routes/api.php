<?php
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductImageController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ShippingAddressController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\SubSubCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return "Hello Dev i am live !";
});

Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtpAndResetPassword']);

// RESTful API routes
Route::apiResource('brands', BrandController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('coupons', CouponController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('order-items', OrderItemController::class);
Route::apiResource('payments', PaymentController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('product-images', ProductImageController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('shipping-addresses', ShippingAddressController::class);
Route::apiResource('stocks', StockController::class);
Route::apiResource('sub-categories', SubCategoryController::class);
Route::apiResource('sub-sub-categories', SubSubCategoryController::class);