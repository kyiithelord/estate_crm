<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::apiResource('properties', PropertyController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('deals', DealController::class);
Route::patch('/deals/{deal}/stage', [DealController::class, 'stage']);

Route::apiResource('tasks', TaskController::class);
Route::patch('/tasks/{task}/complete', [TaskController::class, 'complete']);
