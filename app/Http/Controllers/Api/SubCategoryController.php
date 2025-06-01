<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function index()
    {
        return response()->json(SubCategory::with(['category', 'subSubCategories'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'subcategory_name' => 'required|string|max:255',
            'subcategory_slug' => 'required|string|max:255|unique:sub_categories,subcategory_slug',
        ]);

        $subCategory = SubCategory::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sub Category created successfully',
            'data' => $subCategory
        ], 201);
    }

    public function show($id)
    {
        $subCategory = SubCategory::with(['category', 'subSubCategories'])->findOrFail($id);

        if (!$subCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sub Category not found'
            ], 404);
        }

        return response()->json($subCategory);
    }

    public function update(Request $request, $id)
    {
        $subCategory = SubCategory::findOrFail($id);

        $request->validate([
            'category_id'       => 'required|exists:categories,id',
            'subcategory_name'  => 'required|string|max:255',
            'subcategory_slug'  => 'required|string|max:255|unique:sub_categories,subcategory_slug,' . $subCategory->id,
        ]);

        $subCategory->update($request->only(['subcategory_name', 'subcategory_slug']));

        return response()->json([
            'success' => true,
            'message' => 'Sub Category updated successfully',
            'data' => $subCategory
        ]);
    }

    public function destroy($id)
    {
        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sub Category not found'
            ], 404);
        }

        $subCategory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sub Category deleted successfully'
        ]);
    }
}
