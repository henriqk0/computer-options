<?php

use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnyComponentController;
use App\Http\Controllers\ReviewController;
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

Route::get(
    'displayFeatured',
    [AnyComponentController::class, 'displayFeatured']
)->name('displayFeatured');

Route::get(
    'searchAnyComponent/{toSearch}',
    [AnyComponentController::class, 'searchAnyComponent']
)->name('searchAnyComponent');

Route::get(
    'showAnyComponent/{id}',
    [AnyComponentController::class, 'showAnyComponent']
)->name('showAnyComponent');

Route::middleware(['auth:api', 'role:user'])->put(
    'updateAnyComponent',
    [AnyComponentController::class, 'updateAnyComponent']
)->name('updateAnyComponent');

// Review section
Route::middleware(['auth:api', 'role:user'])->post(
    'createReview',
    [ReviewController::class, 'createReview']
)->name('createReview');

Route::middleware(['auth:api', 'role:user'])->delete(
    'deleteAnyComponent/{id}',
    [AnyComponentController::class, 'deleteAnyComponent']
)->name('deleteAnyComponent');

Route::get(
    'listBestReview/{componentId}',
    [ReviewController::class, 'listBestReview']
)->name('listBestReview');

Route::get(
    'listAllReview/{componentId}',
    [ReviewController::class, 'listAllReview']
)->name('listAllReview');

Route::middleware(['auth:api', 'role:user'])->get(
    'listMyReview',
    [ReviewController::class, 'listMyReview']
)->name('listMyReview');

Route::middleware(['auth:api', 'role:user'])->put(
    'updateReview',
    [ReviewController::class, 'updateReview']
)->name('updateReview');

Route::middleware(['auth:api', 'role:user'])->delete(
    'deleteReview/{id}',
    [ReviewController::class, 'deleteReview']
)->name('deleteReview');

// Like Section
Route::middleware(['auth:api', 'role:user'])->post(
    'like',
    [LikeController::class, 'like']
)->name('like');

Route::middleware(['auth:api', 'role:user'])->delete(
    'unlike/{id}',
    [LikeController::class, 'undolike']
)->name('unlike');
