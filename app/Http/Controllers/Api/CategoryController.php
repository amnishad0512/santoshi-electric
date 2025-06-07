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
            ->withCount('products', 'subCategories', 'subSubCategories')
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
        $category = Category::select('id', 'category_name', 'category_icon', 'created_at', 'updated_at')
        ->withCount('products', 'subCategories', 'subSubCategories')->find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $category
        ], 200);
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
// category dropdown list api - craeted by Yogi (date: 08jun25)
// This method returns a dropdown list of categories based on the brand ID provided.
// If no ID is provided, it returns all categories.
    public function categoryDropdown($id='')
    {
        if ($id) {
            $categories = Category::where('brand_id', $id)
                ->select('id as value', 'category_name as label')
                ->get();
        } else {
            $categories = Category::select('id as value', 'category_name as label')->get();
        }
        if (!$categories) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }else{
            return response()->json([
            'success' => true,
            'data' => $categories
            ]);
        }
    }


}
