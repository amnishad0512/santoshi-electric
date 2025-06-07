<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    public function index()
    {
        $productImages = ProductImage::with('product:id,product_name')
            ->select('id', 'product_id', 'path_name')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $productImages
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'path_name' => 'required',
        ]);

        $productImage = ProductImage::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Product Image created successfully',
            'data' => $productImage
        ], 201);
    }

    public function show($id)
    {
        $productImage = ProductImage::with('product')->findOrFail($id);

        if (!$productImage) {
            return response()->json([
                'success' => false,
                'message' => 'Product Image not found'
            ], 404);
        }

        return response()->json($productImage);
    }

    public function update(Request $request, $id)
    {
        $productImage = ProductImage::findOrFail($id);

        $request->validate([
            'path_name' => 'sometimes|required|string|max:255',
        ]);

        $productImage->update($request->only(['path_name']));

        return response()->json([
            'success' => true,
            'message' => 'Product Image updated successfully',
            'data' => $productImage
        ]);
    }

    public function destroy($id)
    {
        $productImage = ProductImage::find($id);

        if (!$productImage) {
            return response()->json([
                'success' => false,
                'message' => 'Product Image not found'
            ], 404);
        }

        $productImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product Image deleted successfully'
        ]);
    }
}
