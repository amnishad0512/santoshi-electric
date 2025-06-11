<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class OrderController extends Controller
{
    public function index($limit = 5)
    {
        try {
          
            $orders = Order::with(['user', 'orderItems.product', 'payment', 'shippingAddress'])
            ->select('id', 'user_id', 'order_status', 'order_total')
            ->orderBy('id', 'desc')
            ->limit($limit)
            ->get();
            
            return ResponseBuilder::success($orders);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Invalid limit value', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_status' => 'required|string',
            'order_total' => 'required|numeric|min:0',
        ]);

        $order = Order::create([
            'user_id' => $request->user_id,
            'order_status' => $request->order_status,
            'order_total' => $request->order_total,
        ]);

        return ResponseBuilder::success('Order created successfully', 201);
        
    }

    public function show($id)
    {
        $order = Order::with(['user', 'orderItems.product', 'payment', 'shippingAddress'])->find($id);

        if (!$order) {
            return ResponseBuilder::error('Order not found', 404);
        }

        return ResponseBuilder::success($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return ResponseBuilder::error('Order not found', 404);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_status' => 'required|string',
            'order_total' => 'required|numeric|min:0',
        ]);

        $order->update($request->only(['user_id', 'order_status', 'order_total']));

        return ResponseBuilder::success( 'Order updated successfully');
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return ResponseBuilder::error('Order not found', 404);
        }

        $order->delete();

        return ResponseBuilder::success( 'Order deleted successfully');
    }
}
