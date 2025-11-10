<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnyComponentController;
use App\Http\Controllers\AuthController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:api')->get('user', [AuthController::class, 'user']);
Route::middleware('auth:api')->post('refresh', [AuthController::class, 'refresh']);

Route::middleware(['auth:api', 'role:user'])->post(
    'createAnyComponent',
    [AnyComponentController::class, 'createAnyComponent']
)->name('createAnyComponent');

Route::get(
    'listAnyComponent',
    [AnyComponentController::class, 'listAnyComponent']
)->name('listAnyComponent');

Route::middleware(['auth:api', 'role:user'])->put(
    'updateAnyComponent',
    [AnyComponentController::class, 'updateAnyComponent']
)->name('updateAnyComponent');

Route::middleware(['auth:api', 'role:user'])->delete(
    'deleteAnyComponent/{id}',
    [AnyComponentController::class, 'deleteAnyComponent']
)->name('deleteAnyComponent');
