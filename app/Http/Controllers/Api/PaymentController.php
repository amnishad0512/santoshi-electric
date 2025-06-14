<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Helpers\ResponseBuilder;
use Validator;

class PaymentController extends Controller
{
    public function index()
    {
        try {
            $payments = Payment::with('order:id,order_total')->get(['id', 'order_id', 'payment_method', 'payment_status', 'amount', 'transaction_id', 'paid_at']);
            return ResponseBuilder::success($payments);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required|exists:orders,id',
                'payment_method' => 'required|string|max:50',
                'payment_status' => 'required|string|max:20',
                'amount' => 'required|numeric|min:0',
                'transaction_id' => 'nullable|string|max:100',
                'paid_at' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $payment = Payment::create($validator->validated());

            return ResponseBuilder::success('Payment created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $payment = Payment::with('order')->find($id);

            if (!$payment) {
                return ResponseBuilder::error('Payment not found', 404);
            }

            return ResponseBuilder::success($payment);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $payment = Payment::find($id);

            if (!$payment) {
                return ResponseBuilder::error('Payment not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'order_id'        => 'required|exists:orders,id',
                'payment_method' => 'sometimes|required|string|max:50',
                'payment_status' => 'sometimes|required|string|max:20',
                'amount' => 'sometimes|required|numeric|min:0',
                'transaction_id' => 'nullable|string|max:100',
                'paid_at' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return ResponseBuilder::error($validator->errors()->first(), 422);
            }

            $payment->update($validator->validated());

            return ResponseBuilder::success('Payment updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ResponseBuilder::error($e->errors(), 422);
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $payment = Payment::find($id);

            if (!$payment) {
                return ResponseBuilder::error('Payment not found', 404);
            }

            $payment->delete();

            return ResponseBuilder::success('Payment deleted successfully');
        } catch (\Exception $e) {
            return ResponseBuilder::error($e->getMessage(), 500);
        }
    }
}
