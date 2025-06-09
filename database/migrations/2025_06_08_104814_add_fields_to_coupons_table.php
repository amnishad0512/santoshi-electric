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
        Schema::table('coupons', function (Blueprint $table) {
            $table->string('discount_type')->default('percentage')->after('coupon_name');
            $table->decimal('minimum_purchase', 8, 2)->nullable()->after('coupon_discount');
            $table->decimal('maximum_discount', 8, 2)->nullable()->after('minimum_purchase');
            $table->integer('usage_limit')->nullable()->after('maximum_discount');
            $table->date('coupon_start_date')->nullable()->after('usage_limit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('coupons', function (Blueprint $table) {
            //
        });
    }
};
