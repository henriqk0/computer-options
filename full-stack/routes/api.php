<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AnyComponentController;

Route::get('/user', function (Request $request) {
    return $request->user;
})->middleware('auth:sanctum');

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
