<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AnyComponentController;
use App\Http\Controllers\AuthController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('user', [AuthController::class, 'user']);

Route::post(
    'createAnyComponent',
    [AnyComponentController::class, 'createAnyComponent']
)->name('createAnyComponent');

Route::get(
    'listAnyComponent',
    [AnyComponentController::class, 'listAnyComponent']
)->name('listAnyComponent');

Route::put(
    'updateAnyComponent',
    [AnyComponentController::class, 'updateAnyComponent']
)->name('updateAnyComponent');

Route::delete(
    'deleteAnyComponent/{id}',
    [AnyComponentController::class, 'deleteAnyComponent']
)->name('deleteAnyComponent');
