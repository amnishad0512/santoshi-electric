<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string',
            'slug'              => 'required|string|unique:products',
            'description'       => 'required|string',
            'short_description' => 'required|string',
            'image'             => 'required|string',
            'price'             => 'required|numeric',
            'discount'          => 'required|numeric',
            'seller_id'         => 'required|exists:users,id',
            'is_available'      => 'boolean',
            'rating'            => 'required|numeric|min:0|max:5',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validated = $request->validate([
            'title'             => 'sometimes|string',
            'slug'              => "sometimes|string|unique:products,slug,$id",
            'description'       => 'sometimes|string',
            'short_description' => 'nullable|string',
            'image'             => 'nullable|string',
            'price'             => 'sometimes|numeric',
            'discount'          => 'nullable|numeric',
            'seller_id'         => 'sometimes|exists:users,id',
            'is_available'      => 'boolean',
            'rating'            => 'nullable|numeric|min:0|max:5',
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
