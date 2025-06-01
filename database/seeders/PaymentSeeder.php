<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payments')->insert([
            [
                'order_id' => 1,
                'payment_method' => 'credit_card',
                'payment_status' => 'paid',
                'amount' => 120.50,
                'transaction_id' => 'TXN123ABC',
                'paid_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'payment_method' => 'paypal',
                'payment_status' => 'paid',
                'amount' => 75.00,
                'transaction_id' => 'TXN456DEF',
                'paid_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'payment_method' => 'bank_transfer',
                'payment_status' => 'paid',
                'amount' => 210.30,
                'transaction_id' => 'TXN789GHI',
                'paid_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 4,
                'payment_method' => 'credit_card',
                'payment_status' => 'paid',
                'amount' => 56.20,
                'transaction_id' => 'TXN101JKL',
                'paid_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 5,
                'payment_method' => 'paypal',
                'payment_status' => 'paid',
                'amount' => 310.00,
                'transaction_id' => 'TXN112MNO',
                'paid_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
