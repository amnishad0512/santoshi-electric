<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
         DB::statement("ALTER TABLE users CHANGE last_seen last_login DATETIME NULL");
    }

    public function down()
    {
         DB::statement("ALTER TABLE users CHANGE last_login last_seen DATETIME NULL");
    }
};
