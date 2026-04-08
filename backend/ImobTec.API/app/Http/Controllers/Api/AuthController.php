<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['DS_SENHA'] = $data['DS_SENHA'];

        $usuario = Usuario::create($data);

        $token = $usuario->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => new UsuarioResource($usuario),
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $usuario = Usuario::where('DS_EMAIL', $request->DS_EMAIL)->first();

        if (!$usuario || !Hash::check($request->DS_SENHA, $usuario->DS_SENHA)) {
            return response()->json([
                'message' => 'Credenciais inválidas.',
            ], 401);
        }

        $usuario->tokens()->delete();
        $token = $usuario->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => new UsuarioResource($usuario->load('permissao')),
            'token' => $token,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UsuarioResource($request->user()->load('permissao')),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sessão encerrada.']);
    }
}
