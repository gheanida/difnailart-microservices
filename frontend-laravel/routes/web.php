<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\NailArtBookingController;
use App\Http\Controllers\Admin\NailArtBookingAdminController;

// Tambahkan sementara di routes/web.php sebelum Route::get('/')
Route::get('/test-login', function() {
    return view('auth.login');
});

Route::get('/test-register', function() {
    return view('auth.register');
});

Route::get('/test-home', function() {
    return view('welcome');
});
// Home Route
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authentication Routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');

// Nail Art Booking Routes (Protected)
Route::middleware(['auth'])->group(function () {
    Route::get('/nailart/booking', [NailArtBookingController::class, 'index'])->name('nailart.booking');
    Route::post('/nailart/booking', [NailArtBookingController::class, 'store'])->name('nailart.booking.store');
    Route::get('/nailart/bookings', [NailArtBookingController::class, 'myBookings'])->name('nailart.bookings');
    Route::delete('/nailart/booking/{id}', [NailArtBookingController::class, 'cancel'])->name('nailart.booking.cancel');
});

// Admin Routes (Protected + Admin Middleware)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/nailart-bookings', [NailArtBookingAdminController::class, 'index'])->name('nailart.bookings');
    Route::get('/nailart-bookings/{id}', [NailArtBookingAdminController::class, 'show'])->name('nailart.bookings.show');
    Route::put('/nailart-bookings/{id}/status', [NailArtBookingAdminController::class, 'updateStatus'])->name('nailart.bookings.status');
    Route::delete('/nailart-bookings/{id}', [NailArtBookingAdminController::class, 'destroy'])->name('nailart.bookings.destroy');
});