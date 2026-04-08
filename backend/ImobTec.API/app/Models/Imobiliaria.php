<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Imobiliaria extends Model
{
    protected $table = 'imobiliarias';
    protected $primaryKey = 'ID_IMOBILIARIA';
    public $timestamps = false;

    protected $fillable = [
        'NM_IMOBILIARIA',
        'RZ_SOCIAL',
        'DS_CNPJ',
        'NM_TELEFONE',
        'DS_CEP',
        'DS_EMAIL',
        'DS_RUA',
        'NR_CASA',
        'NM_BAIRRO',
        'NM_CIDADE',
        'NM_ESTADO',
    ];

    public function imoveis(): HasMany
    {
        return $this->hasMany(Imovel::class, 'ID_IMOBILIARIA', 'ID_IMOBILIARIA');
    }
}
