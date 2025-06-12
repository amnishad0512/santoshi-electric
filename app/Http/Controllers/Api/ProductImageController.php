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
        $productImages = ProductImage::with('product:id,product_name')
            ->select('id', 'product_id', 'path_name')
            ->get();

        return ResponseBuilder::success($productImages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'path_name' => 'required',
        ]);

        $productImage = ProductImage::create($request->all());

        return ResponseBuilder::success('Product Image created successfully', 201);
    }

    public function show($id)
    {
        $productImage = ProductImage::with('product')->find($id);

        if (!$productImage) {
            return ResponseBuilder::error('Product Image not found', 404);
        }

        return ResponseBuilder::success($productImage);
    }

    public function update(Request $request, $id)
    {
        $productImage = ProductImage::find($id);

        if (!$productImage) {
            return ResponseBuilder::error('Product Image not found', 404);
        }

        $request->validate([
            'path_name' => 'sometimes|required|string|max:255',
        ]);

        $productImage->update($request->only(['path_name']));

        return ResponseBuilder::success('Product Image updated successfully');
    }

    public function destroy($id)
    {
        $productImage = ProductImage::find($id);

        if (!$productImage) {
            return ResponseBuilder::error('Product Image not found', 404);
        }

        $productImage->delete();

        return ResponseBuilder::success('Product Image deleted successfully');
    }
}
