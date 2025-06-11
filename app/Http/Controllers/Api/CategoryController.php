<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Helpers\ResponseBuilder;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'category_name', 'category_icon', 'status', 'created_at', 'updated_at')
            ->withCount('products', 'subCategories', 'subSubCategories')
            ->get();

        return ResponseBuilder::success($categories);
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

        return ResponseBuilder::created($category, 'Category created successfully');
    }

    public function show($id)
    {
        $category = Category::select('id', 'category_name', 'category_icon', 'status', 'created_at', 'updated_at')
            ->withCount('products', 'subCategories', 'subSubCategories')->find($id);

        if (!$category) {
            return ResponseBuilder::error('Category not found', 404);
        }

        return ResponseBuilder::success($category);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return ResponseBuilder::error('Category not found', 404);
        }

        $request->validate([
            'category_name' => 'required|string|max:255',
        ]);

        $category->update([
            'category_name' => $request->category_name,
            'category_slug' => Str::slug($request->category_name),
            'category_icon' => $request->category_icon,
        ]);

        return ResponseBuilder::success($category, 'Category updated successfully');
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return ResponseBuilder::error('Category not found', 404);
        }

        $category->delete();

        return ResponseBuilder::success(null, 'Category deleted successfully');
    }

    // category dropdown list api - created by Yogi (date: 08jun25)
    // This method returns a dropdown list of categories based on the brand ID provided.
    // If no ID is provided, it returns all categories.
    public function categoryDropdown($id = '')
    {
        if ($id) {
            $categories = Category::where('brand_id', $id)
                ->select('id as value', 'category_name as label')
                ->get();
        } else {
            $categories = Category::select('id as value', 'category_name as label')->get();
        }
        if (!$categories) {
            return ResponseBuilder::error('Category not found', 404);
        } else {
            return ResponseBuilder::success($categories);
        }
    }
}
