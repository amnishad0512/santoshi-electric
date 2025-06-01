<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reviews')->insert([
            [
                'user_id' => 1,
                'product_id' => 1,
                'rating' => 5,
                'comment' => 'Amazing product! Highly recommend.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'product_id' => 2,
                'rating' => 4,
                'comment' => 'Very comfortable and good quality.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'product_id' => 3,
                'rating' => 3,
                'comment' => 'Works fine but could be better.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'product_id' => 4,
                'rating' => 5,
                'comment' => 'Loved this book! A must-read.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'product_id' => 5,
                'rating' => 4,
                'comment' => 'Good quality yoga mat, very durable.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
