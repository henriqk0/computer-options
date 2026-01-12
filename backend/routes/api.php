<?php

use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnyComponentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware(['jwt.verify', 'jwt.auto'])->post('logout', [AuthController::class, 'logout']);
Route::middleware(['jwt.verify', 'jwt.auto'])->get('user', [AuthController::class, 'user']);
Route::middleware('jwt.refreshable')->post('refresh', [AuthController::class, 'refresh']);

Route::middleware(['jwt.verify', 'jwt.auto', 'role:admin'])->get(
    'listUsers',
    [AuthController::class, 'listUsers']
)->name('listUsers');
Route::middleware(['jwt.verify', 'jwt.auto', 'role:admin'])->delete(
    'deleteUser/{id}',
    [AuthController::class, 'deleteUser']
)->name('deleteUser');
Route::middleware(['jwt.verify', 'jwt.auto', 'role:admin'])->patch(
    'patchRole/{id}',
    [AuthController::class, 'patchRole']
)->name('patchRole');

Route::middleware(['jwt.verify', 'jwt.auto', 'role:editor'])->post(
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

Route::middleware(['jwt.verify', 'jwt.auto', 'role:editor'])->put(
    'updateAnyComponent',
    [AnyComponentController::class, 'updateAnyComponent']
)->name('updateAnyComponent');

// Review section
Route::middleware(['jwt.verify', 'jwt.auto', 'role:editor'])->post(
    'createReview',
    [ReviewController::class, 'createReview']
)->name('createReview');

Route::middleware(['jwt.verify', 'jwt.auto', 'role:editor'])->delete(
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

Route::middleware(['jwt.verify', 'jwt.auto', 'role:user'])->get(
    'listMyReview',
    [ReviewController::class, 'listMyReview']
)->name('listMyReview');

Route::middleware(['jwt.verify', 'jwt.auto', 'role:user'])->put(
    'updateReview',
    [ReviewController::class, 'updateReview']
)->name('updateReview');

Route::middleware(['jwt.verify', 'jwt.auto', 'role:user'])->delete(
    'deleteReview/{id}',
    [ReviewController::class, 'deleteReview']
)->name('deleteReview');

// Like Section
Route::middleware(['jwt.verify', 'jwt.auto', 'role:user'])->post(
    'like',
    [LikeController::class, 'like']
)->name('like');

Route::middleware(['jwt.verify', 'jwt.auto', 'role:user'])->delete(
    'unlike/{id}',
    [LikeController::class, 'undolike']
)->name('unlike');
