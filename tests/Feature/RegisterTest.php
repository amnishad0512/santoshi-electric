<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_user_can_register()
{
    $response = $this->postJson('/api/register', [
        'name' => 'Test User',
        'phone_number' => '1234567890',
        'email' => 'test@example.com',
        'password' => 'password123',
        'role' => 2,
        'status' => 1,
    ]);
    $response->dump();

    $response->assertStatus(201)
         ->assertJsonStructure([
             'status',
             'user' => ['id', 'name', 'email'],
             'token'
         ]);

}
}
