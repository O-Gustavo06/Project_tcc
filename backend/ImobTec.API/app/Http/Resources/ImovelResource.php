<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImovelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $typeMap = [
            'CASA' => 'house',
            'APARTAMENTO' => 'apartment',
            'TERRENO' => 'land',
            'COMERCIAL' => 'commercial',
        ];

        return [
            'id' => $this->ID_IMOVEL,
            'title' => $this->NM_IMOVEL,
            'property_type' => $typeMap[$this->TP_IMOVEL] ?? 'house',
            'price' => (float) $this->VR_IMOVEL,
            'description' => $this->DS_TEXTO,
            'status' => $this->STATUS_IMOVEL,
            'bedrooms' => $this->QT_QUARTOS,
            'bathrooms' => $this->QT_BANHEIROS,
            'parking_spaces' => $this->QT_VAGAS,
            'area_total' => $this->VR_AREA_TOTAL ? (float) $this->VR_AREA_TOTAL : null,
            'is_featured' => (bool) $this->FL_DESTAQUE,
            'address' => [
                'zipcode' => $this->DS_CEP_IMOVEL,
                'district' => $this->DS_BAIRRO_IMOVEL,
                'city' => $this->DS_CIDADE_IMOVEL,
                'state' => $this->DS_ESTADO_IMOVEL,
            ],
            'images' => ImovelImagemResource::collection($this->whenLoaded('imagens')),
            'advertiser' => new ImobiliariaResumoResource($this->whenLoaded('imobiliaria')),
            'created_at' => $this->DT_CRIACAO,
        ];
    }
}
