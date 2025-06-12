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
            $orders = Order::select('id', 'user_id', 'order_status', 'order_total', 'created_at', 'updated_at')
                ->with(['user:id,name,phone_number,email', 'orderItems.product', 'payment', 'shippingAddress'])
                ->orderBy('id', 'desc')
                ->limit($limit)
                ->get();

            return ResponseBuilder::success($orders);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch orders', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
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
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to create order', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $order = Order::with(['user', 'orderItems.product', 'payment', 'shippingAddress'])->find($id);

            if (!$order) {
                return ResponseBuilder::error('Order not found', 404);
            }

            return ResponseBuilder::success($order);
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to fetch order', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
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

            return ResponseBuilder::success('Order updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to update order', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return ResponseBuilder::error('Order not found', 404);
            }

            $order->delete();

            return ResponseBuilder::success('Order deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error('Failed to delete order', $e->getMessage());
        }
    }
}
