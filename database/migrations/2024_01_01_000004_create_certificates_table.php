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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('certificate_type_id')->constrained()->onDelete('cascade');
            $table->string('certificate_number')->unique()->comment('Certificate number');
            $table->string('applicant_name')->comment('Applicant full name');
            $table->string('place_of_birth')->comment('Place of birth');
            $table->date('date_of_birth')->comment('Date of birth');
            $table->text('address')->comment('Complete address');
            $table->string('nik', 16)->comment('National Identity Number');
            $table->text('purpose')->comment('Purpose of certificate');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('issued_at')->nullable()->comment('Certificate issuance date');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            
            $table->index('certificate_number');
            $table->index('nik');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};