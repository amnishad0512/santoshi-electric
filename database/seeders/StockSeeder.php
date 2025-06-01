<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('stocks')->insert([
            [
                'stock_name' => 'Warehouse A',
                'stock_quantity' => 150,
                'stock_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'stock_name' => 'Warehouse B',
                'stock_quantity' => 200,
                'stock_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'stock_name' => 'Warehouse C',
                'stock_quantity' => 120,
                'stock_status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'stock_name' => 'Warehouse D',
                'stock_quantity' => 300,
                'stock_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'stock_name' => 'Warehouse E',
                'stock_quantity' => 80,
                'stock_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
