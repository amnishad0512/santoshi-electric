<?php
namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport; // ✅ This line

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Your model policies
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Passport::routes(); // ✅ This enables Passport routes
    }
}
