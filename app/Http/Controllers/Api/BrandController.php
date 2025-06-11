<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Helpers\ResponseBuilder;

class BrandController extends Controller
{
    public function index()
    {
        $brand = Brand::select('id', 'brand_name', 'brand_image','status', 'created_at', 'updated_at')
            ->withCount('products')
            ->get();

        return ResponseBuilder::success($brand);
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_image' => 'required',
        ]);

        $save_url = null;
        if ($request->hasFile('brand_image')) {
            $imagePath = $request->file('brand_image')->store('brands', 'public');
            $save_url = $imagePath;
        }

        $brand = Brand::create([
            'brand_name' => $request->brand_name,
            'brand_slug' => Str::slug($request->brand_name),
            'brand_image' => $save_url,
            'status' => $request->status,
        ]);

        return ResponseBuilder::created('Brand created successfully');
    }

    public function show($id)
    {
        $brand = Brand::select('id', 'brand_name', 'brand_image','status', 'created_at', 'updated_at')
            ->find($id);

        if (!$brand) {
            return ResponseBuilder::error('Brand not found', 404);
        }

        return ResponseBuilder::success($brand);
    }


    public function BrandProducts(Request $request, $id)
    {
        $skip = $request->query('skip', 0);
        $limit = $request->query('limit', 5);

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

        return ResponseBuilder::success($data);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return ResponseBuilder::error('Brand not found', 404);
        }

        $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_image' => 'required',
        ]);

        $save_url = $brand->brand_image;
        if ($request->hasFile('brand_image')) {
            if ($brand->brand_image) {
                $oldImagePath = str_replace('storage/', '', $brand->brand_image);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }
            $imagePath = $request->file('brand_image')->store('brands', 'public');
            $save_url = 'storage/' . $imagePath;
        }

        $brand->update([
            'brand_name' => $request->brand_name,
            'brand_slug' => Str::slug($request->brand_name),
            'brand_image' => $save_url,
            'status' => $request->status,
        ]);

        return ResponseBuilder::success('Brand updated successfully');
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return ResponseBuilder::error('Brand not found', 404);
        }

        if ($brand->brand_image) {
            $image = str_replace('storage/', '', $brand->brand_image);
            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
            }
        }

        $brand->delete();

        return ResponseBuilder::success(null, 'Brand deleted successfully');
    }

    public function brandDropdown()
    {
        $brands = Brand::select('id as value', 'brand_name as label')->get();

        if ($brands->isEmpty()) {
            return ResponseBuilder::error('No brands found', 404);
        } else {
            return ResponseBuilder::success($brands);
        }
    }
}
