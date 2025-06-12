<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Helpers\ResponseBuilder;

class SubSubCategoryController extends Controller
{
    public function index()
    {
        try {
            $subsubcategories = SubSubCategory::select('id', 'sub_sub_category_name')
                ->with(['category:id,category_name', 'subCategory:id,subcategory_name'])
                ->get();

            return ResponseBuilder::success($subsubcategories);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch sub sub categories.', 500, $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_id'            => 'required|exists:categories,id',
                'sub_category_id'        => 'required|exists:sub_categories,id',
                'sub_sub_category_name'  => 'required|string|max:255',
            ]);

            $subSubCategory = SubSubCategory::create([
                'category_id' => $request->category_id,
                'sub_category_id' => $request->sub_category_id,
                'sub_sub_category_name' => $request->sub_sub_category_name,
                'sub_sub_category_slug' => Str::slug($request->sub_sub_category_name),
            ]);

            return ResponseBuilder::success('Sub Sub Category created successfully', 201);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to create sub sub category.', 500, $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $subSubCategory = SubSubCategory::with(['category', 'subCategory'])->find($id);

            if (!$subSubCategory) {
                return ResponseBuilder::error('Sub Sub Category not found', 404);
            }

            return ResponseBuilder::success($subSubCategory);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch sub sub category.', 500, $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $subSubCategory = SubSubCategory::find($id);

            if (!$subSubCategory) {
                return ResponseBuilder::error('Sub Sub Category not found', 404);
            }

            $request->validate([
                'category_id'            => 'required|exists:categories,id',
                'sub_category_id'        => 'required|exists:sub_categories,id',
                'sub_sub_category_name'  => 'required|string|max:255',
            ]);

            $subSubCategory->update([
                'category_id' => $request->category_id,
                'sub_category_id' => $request->sub_category_id,
                'sub_sub_category_name' => $request->sub_sub_category_name,
                'sub_sub_category_slug' => Str::slug($request->sub_sub_category_name),
            ]);

            return ResponseBuilder::success('Sub Sub Category updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to update sub sub category.', 500, $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $subSubCategory = SubSubCategory::find($id);

            if (!$subSubCategory) {
                return ResponseBuilder::error('Sub Sub Category not found', 404);
            }

            $subSubCategory->delete();

            return ResponseBuilder::success('Sub Sub Category deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to delete sub sub category.', 500, $e->getMessage());
        }
    }

    public function SubSubCategoryDropdown($id = '')
    {
        try {
            if ($id) {
                $subSubCategories = SubSubCategory::where('sub_category_id', $id)
                    ->select('id as value', 'sub_sub_category_name as label')
                    ->get();
            } else {
                $subSubCategories = SubSubCategory::select('id as value', 'sub_sub_category_name as label')->get();
            }

            if ($subSubCategories->isEmpty()) {
                return ResponseBuilder::error('Sub Sub Category not found', 404);
            }

            return ResponseBuilder::success($subSubCategories);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch sub sub categories.', 500, $e->getMessage());
        }
    }
}
