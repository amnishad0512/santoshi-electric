<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

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
            $request->validate([
                'stock_name' => 'required|string|max:255',
                'stock_quantity' => 'nullable|integer|min:0',
                'stock_status' => 'nullable|boolean',
            ]);

            $stock = Stock::create($request->all());

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

            $request->validate([
                'stock_name' => 'sometimes|required|string|max:255',
                'stock_quantity' => 'sometimes|required|integer|min:0',
                'stock_status' => 'sometimes|required|boolean',
            ]);

            $stock->update($request->only(['stock_name', 'stock_quantity', 'stock_status']));

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
