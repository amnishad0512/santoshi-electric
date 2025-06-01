<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('users')->insert([
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'phone_number' => '1234567890',
                'last_seen' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'profile_photo_path' => 'images/users/alice.jpg',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'phone_number' => '2345678901',
                'last_seen' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'profile_photo_path' => 'images/users/bob.jpg',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'phone_number' => '3456789012',
                'last_seen' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'profile_photo_path' => 'images/users/charlie.jpg',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Diana Prince',
                'email' => 'diana@example.com',
                'phone_number' => '4567890123',
                'last_seen' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'profile_photo_path' => 'images/users/diana.jpg',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ethan Hunt',
                'email' => 'ethan@example.com',
                'phone_number' => '5678901234',
                'last_seen' => now(),
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'profile_photo_path' => 'images/users/ethan.jpg',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
