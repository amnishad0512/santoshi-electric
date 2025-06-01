<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        return response()->json(Stock::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'stock_name' => 'required|string|max:255',
            'stock_quantity' => 'nullable|integer|min:0',
            'stock_status' => 'nullable|boolean',
        ]);

        $stock = Stock::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Stock created successfully',
            'data' => $stock
        ], 201);
    }

    public function show($id)
    {
         $stock = Stock::findOrFail($id);

        if (!$stock) {
            return response()->json([
                'success' => false,
                'message' => 'Stock not found'
            ], 404);
        }

        return response()->json($stock);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);

        $request->validate([
            'stock_name' => 'sometimes|required|string|max:255',
            'stock_quantity' => 'sometimes|required|integer|min:0',
            'stock_status' => 'sometimes|required|boolean',
        ]);

        $stock->update($request->only(['stock_name', 'stock_quantity', 'stock_status']));

        return response()->json([
            'success' => true,
            'message' => 'Stock updated successfully',
            'data' => $stock
        ]);
    }

    public function destroy($id)
    {
        $stock = Stock::find($id);

        if (!$stock) {
            return response()->json([
                'success' => false,
                'message' => 'Stock not found'
            ], 404);
        }

        $stock->delete();

        return response()->json([
            'success' => true,
            'message' => 'Stock deleted successfully'
        ]);
    }
}
