<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;
use Validator;

class StockController extends Controller
{
    public function index()
    {
        try {
            $stocks = Stock::all();
            if ($stocks->isEmpty()) {
                return ResponseBuilder::error('No stocks found', 404);
            }
            return ResponseBuilder::success($stocks);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'stock_name' => 'required|string|max:255',
                'stock_quantity' => 'nullable|integer|min:0',
                'stock_status' => 'required|in:0,1,2', 
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $stock = Stock::create([
                'stock_name' => $request->stock_name,
                'stock_quantity' => $request->stock_quantity ?? 0,
                'stock_status' => $request->stock_status ?? 0,
            ]);

            return ResponseBuilder::success('Stock created successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $stock = Stock::find($id);

            if (!$stock) {
                return ResponseBuilder::error('Stock not found', 404);
            }

            return ResponseBuilder::success($stock);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $stock = Stock::find($id);

            if (!$stock) {
                return ResponseBuilder::error('Stock not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'stock_name' => 'sometimes|required|string|max:255',
                'stock_quantity' => 'sometimes|required|integer|min:0',
                'stock_status' => 'sometimes|nullable|in:0,1,2',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $stock->update($validator->validated());

            return ResponseBuilder::success('Stock updated successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $stock = Stock::find($id);

            if (!$stock) {
                return ResponseBuilder::error('Stock not found', 404);
            }

            $stock->delete();

            return ResponseBuilder::success('Stock deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
