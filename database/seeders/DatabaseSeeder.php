<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            // UserSeeder::class,
            // BrandSeeder::class,
            // CategorySeeder::class,
            // SubCategorySeeder::class,
            // SubSubCategorySeeder::class,
            // ProductSeeder::class,
            // ProductImageSeeder::class,
            // CouponSeeder::class,
            // StockSeeder::class,
            // OrderSeeder::class,
            // OrderItemSeeder::class,
            // ShippingAddressSeeder::class,
            // ReviewSeeder::class,
            // PaymentSeeder::class,
            FooterSeeder::class,
        ]);
    }

}
