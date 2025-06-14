<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Helpers\ResponseBuilder;
use Validator;

class SubCategoryController extends Controller
{
    public function index()
    {   
        try {
            $subcategories = SubCategory::select('id', 'category_id', 'subcategory_name', 'created_at', 'updated_at')
                ->with(['category:id,category_name', 'subSubCategories:id,sub_category_id,sub_sub_category_name'])
                ->get();
            
            return ResponseBuilder::success($subcategories);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required',
                'subcategory_name' => 'required|string|max:255',
                'status' => 'required|in:0,1,2',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $subCategory = SubCategory::create([
                'category_id' => $request->category_id,
                'subcategory_name' => $request->subcategory_name,
                'subcategory_slug' => Str::slug($request->subcategory_name),
            ]);

            return ResponseBuilder::success('Sub Category created successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $subCategory = SubCategory::select('id', 'category_id', 'subcategory_name', 'created_at', 'updated_at')
                ->with(['category:id,category_name', 'subSubCategories:id,sub_category_id,sub_sub_category_name'])
                ->find($id);

            if (!$subCategory) {
                return ResponseBuilder::error('Sub Category not found', 404);
            }

            return ResponseBuilder::success($subCategory);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $subCategory = SubCategory::find($id);

            if (!$subCategory) {
                return ResponseBuilder::error('Sub Category not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'category_id'       => 'required',
                'subcategory_name'  => 'required|string|max:255',
                'subcategory_slug' => 'nullable|string|max:255|unique:sub_categories,subcategory_slug,' . $id,
                'status' => 'nullable|in:0,1,2',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $subCategory->update([
                'category_id' => $request->category_id,
                'subcategory_name' => $request->subcategory_name,
                'subcategory_slug' => Str::slug($request->subcategory_name),
            ]);
            
            return ResponseBuilder::success('Sub Category updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $subCategory = SubCategory::find($id);

            if (!$subCategory) {
                return ResponseBuilder::error('Sub Category not found', 404);
            }

            $subCategory->delete();

            return ResponseBuilder::success('Sub Category deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    // sub category dropdown list api craeted by Yogi (date: 08jun25)
    // This method returns a dropdown list of subcategories based on the category ID
    // If no ID is provided, it returns all subcategories.
    public function SubCategoryDropdown($id='')
    {
        try {
            if ($id) {
                $subCategories = SubCategory::where('category_id', $id)
                    ->select('id as value', 'subcategory_name as label')
                    ->get();
            } else {
                $subCategories = SubCategory::select('id as value', 'subcategory_name as label')->get();
            }
            if (!$subCategories) {
                return ResponseBuilder::error('Sub Category not found', 404);
            } else {
                return ResponseBuilder::success($subCategories);
            }
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
