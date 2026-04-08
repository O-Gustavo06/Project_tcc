<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ID_USUARIO,
            'name' => $this->NM_USUARIO,
            'username' => $this->DS_USUARIO,
            'email' => $this->DS_EMAIL,
            'gender' => $this->DS_GENERO,
            'birth_date' => $this->DT_NASCIMENTO?->format('Y-m-d'),
            'role' => $this->whenLoaded('permissao', fn () => $this->permissao?->NM_PERMISSAO),
        ];
    }
}
