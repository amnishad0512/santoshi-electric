<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class ReviewController extends Controller
{
    public function index()
    {
        try {
            $reviews = Review::select('id', 'user_id', 'product_id', 'rating', 'comment')
            ->with(['user:id,name', 'product:id,product_name'])    
            ->get();

            return ResponseBuilder::success($reviews);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'product_id' => 'required|exists:products,id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string',
            ]);

            $review = Review::create($request->all());

            return ResponseBuilder::success('Review created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {   
        try {
            $review = Review::select('id', 'user_id', 'product_id', 'rating', 'comment')
            ->with(['user:id,name', 'product:id,product_name'])    
            ->find($id);
            if (!$review) {
                return ResponseBuilder::error('Review not found', 404);
            }

            return ResponseBuilder::success($review);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $review = Review::find($id);

            if (!$review) {
                return ResponseBuilder::error('Review not found', 404);
            }

            $request->validate([
                'user_id' => 'required|exists:users,id',
                'product_id' => 'required|exists:products,id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string',
            ]);

            $review->update($request->all());

            return ResponseBuilder::success('Review updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $review = Review::find($id);

            if (!$review) {
                return ResponseBuilder::error('Review not found', 404);
            }

            $review->delete();

            return ResponseBuilder::success('Review deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
