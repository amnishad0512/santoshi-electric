<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('sub_categories')->insert([
            [
                'category_id' => 1,
                'subcategory_name' => 'Smartphones',
                'subcategory_slug' => 'smartphones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'subcategory_name' => 'Laptops',
                'subcategory_slug' => 'laptops',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'subcategory_name' => 'Running Shoes',
                'subcategory_slug' => 'running-shoes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'subcategory_name' => 'Sneakers',
                'subcategory_slug' => 'sneakers',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 3,
                'subcategory_name' => 'Blenders',
                'subcategory_slug' => 'blenders',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
