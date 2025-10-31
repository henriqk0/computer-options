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

Route::get('newComponent', function () {
    return view('anyComponents.newComponent');
})->name('newComponent');
