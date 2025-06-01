<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
        ['brand_name' => 'Brand 1', 'brand_slug' => 'brand-1', 'brand_image' => 'brand1.png'],
        ['brand_name' => 'Brand 2', 'brand_slug' => 'brand-2', 'brand_image' => 'brand2.png'],
        ['brand_name' => 'Brand 3', 'brand_slug' => 'brand-3', 'brand_image' => 'brand3.png'],
        ['brand_name' => 'Brand 4', 'brand_slug' => 'brand-4', 'brand_image' => 'brand4.png'],
        ['brand_name' => 'Brand 5', 'brand_slug' => 'brand-5', 'brand_image' => 'brand5.png'],
    ]);

    }
}
