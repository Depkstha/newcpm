<?php

use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('roles')->as('role.')->middleware('auth')->group(function () {
    Route::get('/', [RoleController::class, 'index'])->name('index');
    Route::get('/create', [RoleController::class, 'create'])->name('create');
    Route::post('/store', [RoleController::class, 'store'])->name('store');
    Route::put('/update/{role}', [RoleController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [RoleController::class, 'destroy'])->name('destroy');
});
