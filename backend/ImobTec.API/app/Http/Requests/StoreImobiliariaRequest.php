<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImobiliariaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'NM_IMOBILIARIA' => 'nullable|string|max:100',
            'RZ_SOCIAL' => 'nullable|string|max:150',
            'DS_CNPJ' => 'nullable|string|max:20|unique:imobiliarias,DS_CNPJ',
            'NM_TELEFONE' => 'required|string|max:20',
            'DS_CEP' => 'nullable|string|max:10',
            'DS_EMAIL' => 'required|email|max:100|unique:imobiliarias,DS_EMAIL',
            'DS_RUA' => 'nullable|string|max:150',
            'NR_CASA' => 'nullable|string|max:10',
            'NM_BAIRRO' => 'nullable|string|max:100',
            'NM_CIDADE' => 'nullable|string|max:100',
            'NM_ESTADO' => 'nullable|string|max:50',
        ];
    }
}
