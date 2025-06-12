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
        try {
            $categories = Category::select('id', 'category_name', 'category_icon', 'status', 'created_at', 'updated_at')
                ->withCount('products', 'subCategories', 'subSubCategories')
                ->get();

            return ResponseBuilder::success($categories);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|max:255',
            ]);

            $category = Category::create([
                'category_name' => $request->category_name,
                'category_slug' => Str::slug($request->category_name),
                'category_icon' => $request->category_icon,
            ]);

            return ResponseBuilder::success('Category created successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $category = Category::select('id', 'category_name', 'category_icon', 'status', 'created_at', 'updated_at')
                ->withCount('products', 'subCategories', 'subSubCategories')->find($id);

            if (!$category) {
                return ResponseBuilder::error('Category not found', 404);
            }

            return ResponseBuilder::success($category);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
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

            return ResponseBuilder::success('Category updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return ResponseBuilder::error('Category not found', 404);
            }

            $category->delete();

            return ResponseBuilder::success('Category deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function categoryDropdown($id = '')
    {
        try {
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
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
