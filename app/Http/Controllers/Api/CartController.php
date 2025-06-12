<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ResponseBuilder;

class CartController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

            return ResponseBuilder::success($cartItems);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            $product = Product::findOrFail($request->product_id);

            $cartItem = Cart::updateOrCreate(
                ['user_id' => $user->id, 'product_id' => $product->id],
                ['quantity' => \DB::raw('quantity + ' . $request->quantity), 'price' => $product->price]
            );

            return ResponseBuilder::success('Product added to cart successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate(['quantity' => 'required|integer|min:1']);

            $cartItem = Cart::findOrFail($id);

            if ($cartItem->user_id !== Auth::id()) {
                return ResponseBuilder::error('Unauthorized', 403);
            }

            $cartItem->update(['quantity' => $request->quantity]);

            return ResponseBuilder::success('Cart item updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $cartItem = Cart::findOrFail($id);

            if ($cartItem->user_id !== Auth::id()) {
                return ResponseBuilder::error('Unauthorized', 403);
            }

            $cartItem->delete();

            return ResponseBuilder::success('Cart item removed successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
