<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImobiliariaController;
use App\Http\Controllers\Api\ImovelController;
use App\Http\Controllers\Api\ImovelImagemController;
use App\Http\Controllers\Api\VendaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rotas Públicas
|--------------------------------------------------------------------------
*/

// Imóveis (listagem e detalhes são públicos)
Route::get('/properties', [ImovelController::class, 'index']);
Route::get('/properties/{id}', [ImovelController::class, 'show']);

// Imagens de imóveis (leitura pública)
Route::get('/properties/{imovelId}/images', [ImovelImagemController::class, 'index']);

// Imobiliárias (leitura pública)
Route::get('/agencies', [ImobiliariaController::class, 'index']);
Route::get('/agencies/{id}', [ImobiliariaController::class, 'show']);

// Autenticação
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Rotas Protegidas (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Imóveis (CRUD protegido)
    Route::post('/properties', [ImovelController::class, 'store']);
    Route::put('/properties/{id}', [ImovelController::class, 'update']);
    Route::delete('/properties/{id}', [ImovelController::class, 'destroy']);

    // Imagens de imóveis (CRUD protegido)
    Route::post('/properties/{imovelId}/images', [ImovelImagemController::class, 'store']);
    Route::delete('/properties/{imovelId}/images/{imagemId}', [ImovelImagemController::class, 'destroy']);

    // Imobiliárias (CRUD protegido)
    Route::post('/agencies', [ImobiliariaController::class, 'store']);
    Route::put('/agencies/{id}', [ImobiliariaController::class, 'update']);
    Route::delete('/agencies/{id}', [ImobiliariaController::class, 'destroy']);

    // Vendas
    Route::get('/sales', [VendaController::class, 'index']);
    Route::get('/sales/{id}', [VendaController::class, 'show']);
    Route::post('/sales', [VendaController::class, 'store']);
    Route::put('/sales/{id}', [VendaController::class, 'update']);
});
