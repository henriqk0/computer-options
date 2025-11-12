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

Route::get('searchComponent/{toSearch}', function () {
    return view('anyComponents.searchComponent');
})->name('searchComponent');
