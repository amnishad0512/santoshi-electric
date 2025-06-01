<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('coupons')->insert([
            [
                'coupon_name' => 'WELCOME10',
                'coupon_discount' => 10,
                'coupon_validity' => '2025-12-31',
                'coupon_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coupon_name' => 'SUMMER20',
                'coupon_discount' => 20,
                'coupon_validity' => '2025-08-31',
                'coupon_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coupon_name' => 'FESTIVE15',
                'coupon_discount' => 15,
                'coupon_validity' => '2025-11-15',
                'coupon_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coupon_name' => 'BLACKFRIDAY30',
                'coupon_discount' => 30,
                'coupon_validity' => '2025-11-28',
                'coupon_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coupon_name' => 'NEWYEAR25',
                'coupon_discount' => 25,
                'coupon_validity' => '2026-01-10',
                'coupon_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
