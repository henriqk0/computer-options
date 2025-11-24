<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tbl_anycomponent', function (Blueprint $table) {
            $table->string('about', 600)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('tbl_anycomponent', function (Blueprint $table) {
            $table->dropColumn('about');
        });
    }
};
