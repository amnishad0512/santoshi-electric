<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    public function index()
    {   
        $subcategories = SubCategory::select('id', 'subcategory_name')
            ->with(['category:id,category_name', 'subSubCategories:id,sub_category_id,sub_sub_category_name'])
            ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $subcategories
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'subcategory_name' => 'required|string|max:255',
        ]);

        $subCategory = SubCategory::create([
            'category_id' => $request->category_id,
            'subcategory_name' => $request->subcategory_name,
            'subcategory_slug' => Str::slug($request->subcategory_name),
        ]);

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
        ]);

        $subCategory->update([
            'category_id' => $request->category_id,
            'subcategory_name' => $request->subcategory_name,
            'subcategory_slug' => Str::slug($request->subcategory_name),
        ]);
        
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
