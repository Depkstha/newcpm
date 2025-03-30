<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix("users")->as()->middleware('auth')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('user.index');
});
