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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->nullable()->constrained('brands')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->foreignId('sub_category_id')->nullable()->constrained('sub_categories')->onDelete('set null');
            $table->foreignId('sub_sub_category_id')->nullable()->constrained('sub_sub_categories')->onDelete('set null');
            $table->string('product_name');
            $table->string('product_slug')->unique();
            $table->string('product_code')->nullable();
            $table->integer('product_quantity')->default(0);
            $table->string('product_tags')->nullable();
            $table->string('product_size')->nullable();
            $table->string('product_colour')->nullable();
            $table->decimal('product_selling_price', 10, 2)->nullable();
            $table->decimal('product_discount_price', 10, 2)->nullable();
            $table->text('product_short_desc')->nullable();
            $table->text('product_long_desc')->nullable();
            $table->string('product_thumbnail')->nullable();
            $table->boolean('hot_deal')->default(false);
            $table->boolean('featured')->default(false);
            $table->boolean('special_offer')->default(false);
            $table->boolean('special_deals')->default(false);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
