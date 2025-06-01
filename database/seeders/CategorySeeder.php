<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'category_name' => 'Electronics',
                'category_slug' => 'electronics',
                'category_icon' => 'electronics.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Fashion',
                'category_slug' => 'fashion',
                'category_icon' => 'fashion.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Home & Kitchen',
                'category_slug' => 'home-kitchen',
                'category_icon' => 'home_kitchen.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Books',
                'category_slug' => 'books',
                'category_icon' => 'books.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Sports',
                'category_slug' => 'sports',
                'category_icon' => 'sports.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
