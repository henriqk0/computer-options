<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_anycomponent', function (Blueprint $table) {
            $table->id("anycomponent_id");
            $table->string("nameComponent", 50);
            $table->string("categoryLevel", 15);
            $table->decimal("bestPrice", 10, 2);
            $table->string("urlPrice", 170)->nullable();
            $table->date("datePrice");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_anycomponent');
    }
};
