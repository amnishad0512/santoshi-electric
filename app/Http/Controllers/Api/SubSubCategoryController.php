<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubSubCategory;
use Illuminate\Http\Request;

class SubSubCategoryController extends Controller
{
    public function index()
    {
        return response()->json(SubSubCategory::with(['category', 'subCategory'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id'            => 'required|exists:categories,id',
            'sub_category_id'        => 'required|exists:sub_categories,id',
            'sub_sub_category_name'  => 'required|string|max:255',
            'sub_sub_category_slug'  => 'required|string|max:255|unique:sub_sub_categories,sub_sub_category_slug',
        ]);

        $subSubCategory = SubSubCategory::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sub Sub Category created successfully',
            'data' => $subSubCategory
        ], 201);
    }

    public function show($id)
    {
        $subSubCategory = SubSubCategory::with(['category', 'subCategory'])->findOrFail($id);

        if (!$subSubCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sub Sub Category not found'
            ], 404);
        }

        return response()->json($subSubCategory);
    }

    public function update(Request $request, $id)
    {
        $subSubCategory = SubSubCategory::findOrFail($id);

        $request->validate([
            'category_id'            => 'required|exists:categories,id',
            'sub_category_id'        => 'required|exists:sub_categories,id',
            'sub_sub_category_name'  => 'required|string|max:255',
            'sub_sub_category_slug'  => 'required|string|max:255|unique:sub_sub_categories,sub_sub_category_slug,' . $subSubCategory->id,
        ]);

        $subSubCategory->update($request->only([
            'sub_sub_category_name',
            'sub_sub_category_slug',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Sub Sub Category updated successfully',
            'data' => $subSubCategory
        ]);
    }

    public function destroy($id)
    {
        $subSubCategory = SubSubCategory::find($id);

        if (!$subSubCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sub Sub Category not found'
            ], 404);
        }

        $subSubCategory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sub Sub Category deleted successfully'
        ]);
    }
}
