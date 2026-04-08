<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'DS_EMAIL' => 'required|email',
            'DS_SENHA' => 'required|string|min:6',
        ];
    }
}
