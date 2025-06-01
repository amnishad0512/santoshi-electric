<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_items')->insert([
            [
                'order_id' => 1,
                'product_id' => 2,
                'item_quantity' => 1,
                'item_price' => 49.99,
            ],
            [
                'order_id' => 1,
                'product_id' => 3,
                'item_quantity' => 2,
                'item_price' => 19.99,
            ],
            [
                'order_id' => 2,
                'product_id' => 1,
                'item_quantity' => 1,
                'item_price' => 99.99,
            ],
            [
                'order_id' => 3,
                'product_id' => 4,
                'item_quantity' => 3,
                'item_price' => 15.50,
            ],
            [
                'order_id' => 4,
                'product_id' => 5,
                'item_quantity' => 2,
                'item_price' => 25.00,
            ],
        ]);
    }
}
