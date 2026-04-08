<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImobiliariaResumoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID_IMOBILIARIA,
            'name' => $this->NM_IMOBILIARIA,
        ];
    }
}
