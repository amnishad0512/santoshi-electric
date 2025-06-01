<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('orders')->insert([
            [
                'user_id' => 1,
                'order_status' => 'processing',
                'order_total' => 120.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'order_status' => 'shipped',
                'order_total' => 75.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'order_status' => 'completed',
                'order_total' => 210.30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'order_status' => 'processing',
                'order_total' => 56.20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'order_status' => 'completed',
                'order_total' => 310.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
