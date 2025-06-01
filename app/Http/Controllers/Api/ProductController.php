<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with(['brand', 'category', 'subCategory', 'subSubCategory', 'productImages', 'reviews'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'sub_sub_category_id' => 'required|exists:sub_sub_categories,id',
            'product_name' => 'required|string|max:255',
            'product_slug' => 'required|string|max:255|unique:products,product_slug,' . ($productId ?? 'NULL') . ',id',
            'product_code' => 'required|string|max:255',
            'product_quantity' => 'required|integer|min:0',
            'product_tags' => 'required|string|max:255',
            'product_size' => 'required|string|max:255',
            'product_colour' => 'required|string|max:255',
            'product_selling_price' => 'required|numeric|min:0',
            'product_discount_price' => 'required|numeric|min:0',
            'product_short_desc' => 'required|string',
            'product_long_desc' => 'required|string',
            'product_thumbnail' => 'required|string|max:255',
            'hot_deal' => 'required|boolean',
            'featured' => 'required|boolean',
            'special_offer' => 'required|boolean',
            'special_deals' => 'required|boolean',
            'status' => 'required|boolean',
        ]);

        $product = Product::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function show($id)
    {
        $product = Product::with(['brand', 'category', 'subCategory', 'subSubCategory', 'productImages', 'reviews.user'])->findOrFail($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'sub_sub_category_id' => 'required|exists:sub_sub_categories,id',
            'product_name' => 'required|string|max:255',
            'product_slug' => 'required|string|max:255|unique:products,product_slug,' . ($productId ?? 'NULL') . ',id',
            'product_code' => 'required|string|max:255',
            'product_quantity' => 'required|integer|min:0',
            'product_tags' => 'required|string|max:255',
            'product_size' => 'required|string|max:255',
            'product_colour' => 'required|string|max:255',
            'product_selling_price' => 'required|numeric|min:0',
            'product_discount_price' => 'required|numeric|min:0',
            'product_short_desc' => 'required|string',
            'product_long_desc' => 'required|string',
            'product_thumbnail' => 'required|string|max:255',
            'hot_deal' => 'required|boolean',
            'featured' => 'required|boolean',
            'special_offer' => 'required|boolean',
            'special_deals' => 'required|boolean',
            'status' => 'required|boolean',
        ]);

        $product->update($request->all());

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
