<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('order:id,order_number')->get(['id', 'order_id', 'payment_method', 'payment_status', 'amount', 'transaction_id', 'paid_at']);

        return ResponseBuilder::success($payments, 'Payments fetched successfully');
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

        return ResponseBuilder::created($payment, 'Payment created successfully');
    }

    public function show($id)
    {
        $payment = Payment::with('order')->find($id);

        if (!$payment) {
            return ResponseBuilder::error('Payment not found', 404);
        }

        return ResponseBuilder::success($payment, 'Payment fetched successfully');
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return ResponseBuilder::error('Payment not found', 404);
        }

        $request->validate([
            'order_id'        => 'required|exists:orders,id',
            'payment_method' => 'sometimes|required|string|max:50',
            'payment_status' => 'sometimes|required|string|max:20',
            'amount' => 'sometimes|required|numeric|min:0',
            'transaction_id' => 'nullable|string|max:100',
            'paid_at' => 'nullable|date',
        ]);

        $payment->update($request->all());

        return ResponseBuilder::success($payment, 'Payment updated successfully');
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return ResponseBuilder::error('Payment not found', 404);
        }

        $payment->delete();

        return ResponseBuilder::success(null, 'Payment deleted successfully');
    }
}
