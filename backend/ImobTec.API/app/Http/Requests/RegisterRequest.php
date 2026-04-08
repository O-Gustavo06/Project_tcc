<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'NM_USUARIO' => 'required|string|max:100',
            'DT_NASCIMENTO' => 'nullable|date',
            'DS_USUARIO' => 'required|string|max:30',
            'DS_EMAIL' => 'required|email|max:100|unique:usuarios,DS_EMAIL',
            'DS_SENHA' => 'required|string|min:6|confirmed',
            'DS_GENERO' => 'required|string|max:20',
        ];
    }
}
