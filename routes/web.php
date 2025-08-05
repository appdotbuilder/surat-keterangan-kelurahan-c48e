<?php

use App\Http\Controllers\CertificateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_certificates' => \App\Models\Certificate::count(),
            'pending_certificates' => \App\Models\Certificate::where('status', 'pending')->count(),
            'approved_certificates' => \App\Models\Certificate::where('status', 'approved')->count(),
            'rejected_certificates' => \App\Models\Certificate::where('status', 'rejected')->count(),
        ];
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    })->name('dashboard');

    // Certificate management routes
    Route::resource('certificates', CertificateController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
