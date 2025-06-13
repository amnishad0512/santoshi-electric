<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('footers', function (Blueprint $table) {
            $table->id();
            $table->string('store')->nullable();
            $table->json('phone')->nullable();
            $table->string('email')->nullable();
            $table->json('timing')->nullable();
            $table->json('social_media')->nullable(); // JSON: insta, facebook, etc.
            $table->text('description')->nullable();
            $table->integer('experience')->nullable();
            $table->bigInteger('users')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footers');
    }
};
