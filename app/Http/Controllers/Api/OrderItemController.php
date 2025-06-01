<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        return response()->json(OrderItem::with(['order', 'product'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
            'item_quantity' => 'required|integer|min:1',
            'item_price' => 'required|numeric|min:0',
        ]);

        $orderItem = OrderItem::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'OrderItem created successfully',
            'data' => $orderItem
        ], 201);
    }

    public function show($id)
    {
        $orderItem = OrderItem::with(['order', 'product'])->findOrFail($id);

        if (!$orderItem) {
            return response()->json([
                'success' => false,
                'message' => 'OrderItem not found'
            ], 404);
        }

        return response()->json($orderItem);
    }

    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::findOrFail($id);

         $request->validate([
            'order_id'     => 'required|exists:orders,id',
            'product_id'   => 'required|exists:products,id',
            'item_quantity'=> 'required|integer|min:1',
            'item_price'   => 'required|numeric|min:0',
        ]);

        $orderItem->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'OrderItem updated successfully',
            'data' => $orderItem
        ]);
    }

    public function destroy($id)
    {
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            return response()->json([
                'success' => false,
                'message' => 'OrderItem not found'
            ], 404);
        }

        $orderItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'OrderItem deleted successfully'
        ]);
    }
}
