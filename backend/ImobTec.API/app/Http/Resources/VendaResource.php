<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID_VENDA,
            'property_value' => (float) $this->VR_IMOVEL,
            'commission' => $this->VR_COMISSAO ? (float) $this->VR_COMISSAO : null,
            'sale_date' => $this->DT_VENDA?->format('Y-m-d'),
            'status' => $this->DS_STATUS,
            'user' => new UsuarioResource($this->whenLoaded('usuario')),
            'property' => new ImovelResource($this->whenLoaded('imovel')),
        ];
    }
}
