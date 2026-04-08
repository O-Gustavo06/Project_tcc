<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImovelImagemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID_IMAGEM,
            'url' => $this->DS_URL,
            'is_primary' => (bool) $this->FL_PRINCIPAL,
            'order' => $this->NR_ORDEM,
        ];
    }
}
