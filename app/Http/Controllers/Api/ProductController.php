<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['brand', 'category', 'subCategory', 'subSubCategory', 'productImages', 'reviews.user'])
            ->select('id', 'brand_id', 'category_id', 'sub_category_id', 'sub_sub_category_id', 'product_name', 'product_slug', 'product_code', 'product_quantity', 'product_tags', 'product_size', 'product_colour', 'product_selling_price', 'product_discount_price', 'product_short_desc', 'product_long_desc', 'product_thumbnail', 'hot_deal', 'featured', 'special_offer', 'special_deals', 'status')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $products
        ], 200);
        // return response()->json(Product::with(['brand', 'category', 'subCategory', 'subSubCategory', 'productImages', 'reviews'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'sub_sub_category_id' => 'required|exists:sub_sub_categories,id',
            'product_name' => 'required|string|max:255',
            'product_code' => 'required|string|max:255',
            'product_quantity' => 'required|integer|min:0',
            'product_tags' => 'required|string|max:255',
            'product_size' => 'required|string|max:255',
            'product_colour' => 'required|string|max:255',
            'product_selling_price' => 'required|numeric|min:0',
            'product_discount_price' => 'required|numeric|min:0',
            'product_short_desc' => 'required|string',
            'product_long_desc' => 'required|string',
            'product_thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'hot_deal' => 'required|boolean',
            'featured' => 'required|boolean',
            'special_offer' => 'required|boolean',
            'special_deals' => 'required|boolean',
            'status' => 'required|boolean',
        ]);

        $save_url = null;
        if ($request->hasFile('product_thumbnail')) {
            $imagePath = $request->file('product_thumbnail')->store('products', 'public');
            $save_url = 'storage/' . $imagePath;
        }

        $product = Product::create([
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'sub_sub_category_id' => $request->sub_sub_category_id,
            'product_name' => $request->product_name,
            'product_slug' => Str::slug($request->product_name),
            'product_code' => $request->product_code,
            'product_quantity' => $request->product_quantity,
            'product_tags' => $request->product_tags,
            'product_size' => $request->product_size,
            'product_colour' => $request->product_colour,
            'product_selling_price' => $request->product_selling_price,
            'product_discount_price' => $request->product_discount_price,
            'product_short_desc' => $request->product_short_desc,
            'product_long_desc' => $request->product_long_desc,
            'product_thumbnail' => $save_url,
            'hot_deal' => $request->hot_deal,
            'featured' => $request->featured,
            'special_offer' => $request->special_offer,
            'special_deals' => $request->special_deals,
            'status' => $request->status,
        ]);

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
            'product_code' => 'required|string|max:255',
            'product_quantity' => 'required|integer|min:0',
            'product_tags' => 'required|string|max:255',
            'product_size' => 'required|string|max:255',
            'product_colour' => 'required|string|max:255',
            'product_selling_price' => 'required|numeric|min:0',
            'product_discount_price' => 'required|numeric|min:0',
            'product_short_desc' => 'required|string',
            'product_long_desc' => 'required|string',
            'product_thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'hot_deal' => 'required|boolean',
            'featured' => 'required|boolean',
            'special_offer' => 'required|boolean',
            'special_deals' => 'required|boolean',
            'status' => 'required|boolean',
        ]);

        $save_url = $product->product_thumbnail;
        if ($request->hasFile('product_thumbnail')) {
            if ($product->product_thumbnail) {
                $oldImagePath = str_replace('storage/', '', $product->product_thumbnail);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            $imagePath = $request->file('product_thumbnail')->store('products', 'public');
            $save_url = 'storage/' . $imagePath;
        }

        $product->update([
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'sub_sub_category_id' => $request->sub_sub_category_id,
            'product_name' => $request->product_name,
            'product_slug' => Str::slug($request->product_name),
            'product_code' => $request->product_code,
            'product_quantity' => $request->product_quantity,
            'product_tags' => $request->product_tags,
            'product_size' => $request->product_size,
            'product_colour' => $request->product_colour,
            'product_selling_price' => $request->product_selling_price,
            'product_discount_price' => $request->product_discount_price,
            'product_short_desc' => $request->product_short_desc,
            'product_long_desc' => $request->product_long_desc,
            'product_thumbnail' => $save_url,
            'hot_deal' => $request->hot_deal,
            'featured' => $request->featured,
            'special_offer' => $request->special_offer,
            'special_deals' => $request->special_deals,
            'status' => $request->status,
        ]);

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

        if ($product->product_thumbnail) {
            $oldImagePath = str_replace('storage/', '', $product->product_thumbnail);
            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
    // Get featured products with limit created by Yogi (date: 08jun25)
    // limit is request parameter, default is 10
    public function FeaturedProducts(Request $request)
    {
        $limit = $request->input('limit', 10); // Default limit is 10 if not provided  
        $products = Product::with(['brand', 'category', 'subCategory', 'subSubCategory', 'productImages',])
            ->where('featured', 1)
            ->limit($limit)
            ->get();
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }
}
