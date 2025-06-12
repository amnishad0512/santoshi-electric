<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class ProductImageController extends Controller
{
    public function index()
    {
        try {
            $productImages = ProductImage::select('id', 'product_id', 'path_name')
                ->with('product:id,product_name')
                ->get();

            return ResponseBuilder::success($productImages);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch product images', 500, $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'path_name' => 'required',
            ]);

            $productImage = ProductImage::create($request->all());

            return ResponseBuilder::success('Product Image created successfully', 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to create product image', 500, $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $productImage = ProductImage::select('id', 'product_id', 'path_name')
                ->with('product:id,product_name')
                ->find($id);

            if (!$productImage) {
                return ResponseBuilder::error('Product Image not found', 404);
            }

            return ResponseBuilder::success($productImage);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch product image', 500, $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $productImage = ProductImage::find($id);

            if (!$productImage) {
                return ResponseBuilder::error('Product Image not found', 404);
            }

            $request->validate([
                'path_name' => 'sometimes|required|string|max:255',
            ]);

            $productImage->update($request->only(['path_name']));

            return ResponseBuilder::success('Product Image updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to update product image', 500, $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $productImage = ProductImage::find($id);

            if (!$productImage) {
                return ResponseBuilder::error('Product Image not found', 404);
            }

            $productImage->delete();

            return ResponseBuilder::success('Product Image deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to delete product image', 500, $e->getMessage());
        }
    }
}
