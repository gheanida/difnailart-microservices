<?php

use Illuminate\Support\Facades\Route;

// Single Page Application Route
// Semua routing dihandle oleh Vue Router di frontend
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');