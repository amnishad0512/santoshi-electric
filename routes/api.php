<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\UserAddressController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\FooterController;
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
    Route::middleware(['auth:api'])->group(function () {
        Route::match(['get', 'post'], '/profile', [UserController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/change-password', [UserController::class, 'changePassword']);

        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    });
    Route::get('admin/dashboard', [DashboardController::class, 'adminDashboardStats']);

    Route::apiResource('brands', BrandController::class);
    Route::get('brands/{id}/products', [BrandController::class, 'BrandProducts']);
    Route::get('brand-dropdown', [BrandController::class, 'brandDropdown']);

    Route::apiResource('categories', CategoryController::class);
    Route::get('category-dropdown/{id?}', [CategoryController::class, 'CategoryDropdown']); // id= brand id

    Route::apiResource('sub-categories', SubCategoryController::class);
    Route::get('sub-category-dropdown/{id?}', [SubCategoryController::class, 'SubCategoryDropdown']); // id= category id

    Route::apiResource('sub-sub-categories', SubSubCategoryController::class);
    Route::get('sub-sub-category-dropdown/{id?}', [SubSubCategoryController::class, 'SubSubCategoryDropdown']); // id= sub category id

    Route::apiResource('coupons', CouponController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('order-items', OrderItemController::class);
    Route::apiResource('payments', PaymentController::class);

    Route::apiResource('products', ProductController::class);
    Route::apiResource('product-images', ProductImageController::class);
    Route::get('featured-products', [ProductController::class, 'FeaturedProducts']);

    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('shipping-addresses', ShippingAddressController::class);
    Route::apiResource('stocks', StockController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('user-addresses', UserAddressController::class);

    Route::get('footer-details', [FooterController::class, 'index']);
    Route::get('footer/{id}', [FooterController::class, 'show']);
    Route::post('footer/', [FooterController::class, 'store']);
    Route::put('footer/{id}', [FooterController::class, 'update']);
    Route::delete('footer/{id}', [FooterController::class, 'destroy']);
    Route::get('/status', [StatusController::class, 'index']);
