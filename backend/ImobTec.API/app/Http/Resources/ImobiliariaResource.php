<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImobiliariaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID_IMOBILIARIA,
            'name' => $this->NM_IMOBILIARIA,
            'corporate_name' => $this->RZ_SOCIAL,
            'cnpj' => $this->DS_CNPJ,
            'phone' => $this->NM_TELEFONE,
            'email' => $this->DS_EMAIL,
            'address' => [
                'zipcode' => $this->DS_CEP,
                'street' => $this->DS_RUA,
                'number' => $this->NR_CASA,
                'district' => $this->NM_BAIRRO,
                'city' => $this->NM_CIDADE,
                'state' => $this->NM_ESTADO,
            ],
            'properties_count' => $this->whenCounted('imoveis'),
            'created_at' => $this->DT_CRIACAO,
        ];
    }
}
