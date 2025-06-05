<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index()
    {
        $brand = Brand::select('id', 'brand_name', 'brand_image','status', 'created_at')
            ->withCount('products')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $brand
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $save_url = null;
        if ($request->hasFile('brand_image')) {
            $imagePath = $request->file('brand_image')->store('brands', 'public');
            $save_url = 'storage/' . $imagePath;
        }

        $brand = Brand::create([
            'brand_name' => $request->brand_name,
            'brand_slug' => Str::slug($request->brand_name),
            'brand_image' => $save_url,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Brand created successfully',
            'data' => $brand
        ], 201);
    }

    public function show($id)
    {
        $brand = Brand::withCount('products')->findOrFail($id);
        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $brand
        ], 200);
    }


    public function BrandProducts(Request $request, $id)
    {
        // Get skip and limit from query params, set defaults
        $skip = $request->query('skip', 0);
        $limit = $request->query('limit', 5);

        // Fetch products for brand_id with pagination (offset + limit)
        $products = Product::with(['category' => function ($query) {
            $query->select('id', 'category_name');
        }])
        ->select([
            'id',
            'category_id',
            'product_thumbnail',
            'product_name',
            'product_short_desc',
            'product_selling_price',
            'product_quantity',
            'status',
            'brand_id'
        ])
        ->where('brand_id', $id)
        ->skip($skip)
        ->take($limit)
        ->get();

        // Map to include category name
        $data = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'category_name' => $product->category->category_name ?? null,
                'product_thumbnail' => $product->product_thumbnail,
                'product_name' => $product->product_name,
                'product_short_desc' => $product->product_short_desc,
                'product_selling_price' => $product->product_selling_price,
                'product_quantity' => $product->product_quantity,
                'status' => $product->status,
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $save_url = $brand->brand_image;
        if ($request->hasFile('brand_image')) {

            // Delete old image if it exists
            if ($brand->brand_image) {
                $oldImagePath = str_replace('storage/', '', $brand->brand_image);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Store new image
            $imagePath = $request->file('brand_image')->store('brands', 'public');
            $save_url = 'storage/' . $imagePath;
        }

        $brand->update([
            'brand_name' => $request->brand_name,
            'brand_slug' => Str::slug($request->brand_name),
            'brand_image' => $save_url,
            'status' => $request->status,

        ]);

        return response()->json([
            'success' => true,
            'message' => 'Brand updated successfully',
            'data' => $brand
        ],200);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        if ($brand->brand_image) {
            $image = str_replace('storage/', '', $brand->brand_image);
            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
            }
        }

        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Brand deleted successfully'
        ],200);
    }
}
