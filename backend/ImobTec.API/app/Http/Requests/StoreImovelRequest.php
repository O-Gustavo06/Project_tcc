<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreImovelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ID_IMOBILIARIA' => 'required|exists:imobiliarias,ID_IMOBILIARIA',
            'NM_IMOVEL' => 'nullable|string|max:150',
            'TP_IMOVEL' => 'required|in:CASA,APARTAMENTO,TERRENO,COMERCIAL',
            'VR_IMOVEL' => 'required|numeric|min:0',
            'DS_TEXTO' => 'nullable|string',
            'DS_CEP_IMOVEL' => 'nullable|string|max:10',
            'DS_BAIRRO_IMOVEL' => 'nullable|string|max:100',
            'DS_CIDADE_IMOVEL' => 'nullable|string|max:100',
            'DS_ESTADO_IMOVEL' => 'nullable|string|max:50',
            'STATUS_IMOVEL' => 'nullable|in:DISPONIVEL,VENDIDO,ALUGADO',
            'QT_QUARTOS' => 'nullable|integer|min:0',
            'QT_BANHEIROS' => 'nullable|integer|min:0',
            'QT_VAGAS' => 'nullable|integer|min:0',
            'VR_AREA_TOTAL' => 'nullable|numeric|min:0',
            'FL_DESTAQUE' => 'nullable|boolean',
        ];
    }
}
