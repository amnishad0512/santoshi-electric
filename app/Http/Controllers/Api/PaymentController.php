<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('order:id,order_number')->get(['id', 'order_id', 'payment_method', 'payment_status', 'amount', 'transaction_id', 'paid_at']);

        return response()->json([
            'status' => 'success',
            'data' => $payments
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_method' => 'required|string|max:50',
            'payment_status' => 'required|string|max:20',
            'amount' => 'required|numeric|min:0',
            'transaction_id' => 'nullable|string|max:100',
            'paid_at' => 'nullable|date',
        ]);

        $payment = Payment::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'data' => $payment
        ], 201);
    }

    public function show($id)
    {
        $payment = Payment::with('order')->findOrFail($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found'
            ], 404);
        }

        return response()->json($payment);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $request->validate([
            'order_id'        => 'required|exists:orders,id',
            'payment_method' => 'sometimes|required|string|max:50',
            'payment_status' => 'sometimes|required|string|max:20',
            'amount' => 'sometimes|required|numeric|min:0',
            'transaction_id' => 'nullable|string|max:100',
            'paid_at' => 'nullable|date',
        ]);

        $payment->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment not found'
            ], 404);
        }

        $payment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Payment deleted successfully'
        ]);
    }
}
