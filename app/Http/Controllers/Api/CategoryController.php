<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'category_name', 'category_icon', 'created_at')
            // ->withCount('products', 'subCategories')
            // ->get();
            ->with([
                'subCategories:id,category_id,subcategory_name',
                'subCategories.subSubCategories:id,sub_category_id,sub_sub_category_name',
                'products:id,category_id,product_name'
            ])->withCount('products', 'subCategories')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
         $request->validate([
            'category_name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'category_name' => $request->category_name,
            'category_slug' => Str::slug($request->category_name),
            'category_icon' => $request->category_icon,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = Category::with(['subCategories.subSubCategories', 'products'])->findOrFail($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json(Category::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

         $request->validate([
            'category_name' => 'required|string|max:255',
        ]);

        $category->update([
            'category_name' => $request->category_name,
            'category_slug' => Str::slug($request->category_name),
            'category_icon' => $request->category_icon,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
