<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('home.home');
})->name('home');

Route::get('listComponent', function () {
    return view('anyComponents.listComponent');
})->name('listComponent');

Route::get('myReviews', function () {
    return view('reviews.myReviews');
})->name('myReviews');

Route::get('searchComponent/{toSearch}', function () {
    return view('anyComponents.searchComponent');
})->name('searchComponent');

Route::get('show/{id}', function () {
    return view('anyComponents.showComponent');
})->name('showComponent');
