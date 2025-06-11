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
        return ResponseBuilder::success(Stock::all(), 'Stocks retrieved successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            'stock_name' => 'required|string|max:255',
            'stock_quantity' => 'nullable|integer|min:0',
            'stock_status' => 'nullable|boolean',
        ]);

        $stock = Stock::create($request->all());

        return ResponseBuilder::success($stock, 'Stock created successfully', 201);
    }

    public function show($id)
    {
        $stock = Stock::find($id);

        if (!$stock) {
            return ResponseBuilder::error('Stock not found', 404);
        }

        return ResponseBuilder::success($stock, 'Stock retrieved successfully');
    }

    public function update(Request $request, $id)
    {
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

        return ResponseBuilder::success($stock, 'Stock updated successfully');
    }

    public function destroy($id)
    {
        $stock = Stock::find($id);

        if (!$stock) {
            return ResponseBuilder::error('Stock not found', 404);
        }

        $stock->delete();

        return ResponseBuilder::success(null, 'Stock deleted successfully');
    }
}
