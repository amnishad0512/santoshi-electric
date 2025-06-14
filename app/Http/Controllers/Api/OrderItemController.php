<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;
use Validator;

class OrderItemController extends Controller
{
    public function index()
    {
        try {
            $orderItems = OrderItem::select('id', 'order_id', 'product_id', 'item_quantity', 'item_price')
                ->with(['order:id,order_total', 'product:id,product_name'])
                ->get();

            return ResponseBuilder::success($orderItems);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required|exists:orders,id',
                'product_id' => 'required|exists:products,id',
                'item_quantity' => 'required|integer|min:1',
                'item_price' => 'required|numeric|min:0',
                'status' => 'required|in:0,1,2',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $orderItem = OrderItem::create($validator->validated());

            return ResponseBuilder::success('OrderItem created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $orderItem = OrderItem::with(['order', 'product'])->find($id);

            if (!$orderItem) {
                return ResponseBuilder::error('OrderItem not found', 404);
            }

            return ResponseBuilder::success($orderItem);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $orderItem = OrderItem::find($id);

            if (!$orderItem) {
                return ResponseBuilder::error('OrderItem not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'order_id'     => 'required|exists:orders,id',
                'product_id'   => 'required|exists:products,id',
                'item_quantity'=> 'required|integer|min:1',
                'item_price'   => 'required|numeric|min:0',
                'status' => 'nullable|in:0,1,2',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $orderItem->update($validator->validated());

            return ResponseBuilder::success('OrderItem updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $orderItem = OrderItem::find($id);

            if (!$orderItem) {
                return ResponseBuilder::error('OrderItem not found', 404);
            }

            $orderItem->delete();

            return ResponseBuilder::success('OrderItem deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
