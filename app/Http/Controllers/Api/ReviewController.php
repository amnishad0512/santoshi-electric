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
        $reviews = Review::with(['user:id,name', 'product:id,product_name'])
            ->select('id', 'user_id', 'product_id', 'rating', 'comment')
            ->get();

        return ResponseBuilder::success($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create($request->all());

        return ResponseBuilder::success('Review created successfully');
    }

    public function show($id)
    {
        $review = Review::with(['user', 'product'])->find($id);

        if (!$review) {
            return ResponseBuilder::error('Review not found', 404);
        }

        return ResponseBuilder::success($review);
    }

    public function update(Request $request, $id)
    {
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
    }

    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return ResponseBuilder::error('Review not found', 404);
        }

        $review->delete();

        return ResponseBuilder::success('Review deleted successfully');
    }
}
