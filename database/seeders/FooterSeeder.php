<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Footer;

class FooterSeeder extends Seeder
{
    public function run()
    {
        Footer::create([
            'store' => '123 Electronics Street, Tech City, TC 1234',
            'phone' => ['+91 1234567890', '+91 9876543210'],
            'email' => 'info@santoshielectric.com',
            'timing' => ['Mon-Sat: 9AM-8PM', 'Sun: 10AM-6PM'],
            'social_media' => [
                'insta' => 'https://instagram.com/santoshielectric',
                'facebook' => 'https://facebook.com/santoshielectric'
            ],
            'description' => 'We are the best electronics store in town.',
            'experience' => 10,
            'users' => 10000,
        ]);
    }
}
