<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with(['order:id,order_number', 'product:id,product_name'])
            ->select('id', 'order_id', 'product_id', 'item_quantity', 'item_price')
            ->get();

        return ResponseBuilder::success($orderItems);
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

        return ResponseBuilder::success('OrderItem created successfully');
    }

    public function show($id)
    {
        $orderItem = OrderItem::with(['order', 'product'])->find($id);

        if (!$orderItem) {
            return ResponseBuilder::error('OrderItem not found', 404);
        }

        return ResponseBuilder::success($orderItem);
    }

    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            return ResponseBuilder::error('OrderItem not found', 404);
        }

        $request->validate([
            'order_id'     => 'required|exists:orders,id',
            'product_id'   => 'required|exists:products,id',
            'item_quantity'=> 'required|integer|min:1',
            'item_price'   => 'required|numeric|min:0',
        ]);

        $orderItem->update($request->all());

        return ResponseBuilder::success('OrderItem updated successfully');
    }

    public function destroy($id)
    {
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            return ResponseBuilder::error('OrderItem not found', 404);
        }

        $orderItem->delete();

        return ResponseBuilder::success('OrderItem deleted successfully');
    }
}
