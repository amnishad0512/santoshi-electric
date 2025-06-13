<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Helpers\ResponseBuilder;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::select(
                'id', 'brand_id', 'category_id', 'sub_category_id', 'sub_sub_category_id',
                'product_name', 'product_quantity', 'product_selling_price',
                'product_discount_price', 'product_thumbnail', 'status', 'created_at', 'updated_at'
            )
            ->with([
                'brand:id,brand_name',
                'category:id,category_name',
                'subCategory:id,subcategory_name',
                'subSubCategory:id,sub_sub_category_name',
                'productImages:id,product_id,path_name',
            ])
            ->get();

            if ($products->isEmpty()) {
                return ResponseBuilder::success('No products found');
            }

            return ResponseBuilder::success($products);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
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
                'product_thumbnail' => 'required',
                'hot_deal' => 'required',
                'featured' => 'required',
                'special_offer' => 'required',
                'special_deals' => 'required',
                'status' => 'required',
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

            return ResponseBuilder::success('Product created successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::select(
                'id', 'brand_id', 'category_id', 'sub_category_id', 'sub_sub_category_id',
                'product_name', 'product_code', 'product_quantity', 'product_tags', 'product_size', 
                'product_colour', 'product_selling_price','product_discount_price', 'product_short_desc', 
                'product_long_desc', 'product_thumbnail', 'hot_deal', 'featured', 'special_offer', 'special_deals', 'status', 'created_at', 'updated_at'
            )
            ->with([
                'brand:id,brand_name',
                'category:id,category_name',
                'subCategory:id,subcategory_name',
                'subSubCategory:id,sub_sub_category_name',
                'productImages:id,product_id,path_name',
            ])
            ->find($id);
            if (!$product) {
                return ResponseBuilder::error('Product not found', 404);
            }

            return ResponseBuilder::success($product);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return ResponseBuilder::error('Product not found', 404);
            }

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
                'product_thumbnail' => 'required',
                'hot_deal' => 'required',
                'featured' => 'required',
                'special_offer' => 'required',
                'special_deals' => 'required',
                'status' => 'required',
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

            return ResponseBuilder::success('Product updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return ResponseBuilder::error('Product not found', 404);
            }

            if ($product->product_thumbnail) {
                $oldImagePath = str_replace('storage/', '', $product->product_thumbnail);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            $product->delete();

            return ResponseBuilder::success('Product deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function FeaturedProducts(Request $request)
    {
        try {
            $limit = $request->input('limit', 10);  
            $products = Product::select(
                'id', 'brand_id', 'category_id', 'sub_category_id', 'sub_sub_category_id',
                'product_name', 'product_quantity', 'product_selling_price',
                'product_discount_price', 'product_thumbnail', 'status', 'created_at', 'updated_at'
            )
            ->with([
                'brand:id,brand_name',
                'category:id,category_name',
                'subCategory:id,subcategory_name',
                'subSubCategory:id,sub_sub_category_name',
                'productImages:id,product_id,path_name',
            ])->where('featured', 1)
            ->limit($limit)
            ->get();

            return ResponseBuilder::success($products);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
