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
        Schema::create('certificate_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Certificate type name');
            $table->string('code')->unique()->comment('Certificate type code');
            $table->text('description')->nullable()->comment('Certificate description');
            $table->text('template')->comment('Certificate template content');
            $table->boolean('is_active')->default(true)->comment('Whether certificate type is active');
            $table->timestamps();
            
            $table->index('code');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificate_types');
    }
};