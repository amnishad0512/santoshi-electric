<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sub_sub_categories')->insert([
            [
                'category_id' => 1,
                'sub_category_id' => 1,
                'sub_sub_category_name' => 'Android Phones',
                'sub_sub_category_slug' => 'android-phones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 1,
                'sub_category_id' => 1,
                'sub_sub_category_name' => 'iPhones',
                'sub_sub_category_slug' => 'iphones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'sub_category_id' => 3,
                'sub_sub_category_name' => 'Trail Running Shoes',
                'sub_sub_category_slug' => 'trail-running-shoes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'sub_category_id' => 4,
                'sub_sub_category_name' => 'Casual Sneakers',
                'sub_sub_category_slug' => 'casual-sneakers',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 3,
                'sub_category_id' => 5,
                'sub_sub_category_name' => 'Countertop Blenders',
                'sub_sub_category_slug' => 'countertop-blenders',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
