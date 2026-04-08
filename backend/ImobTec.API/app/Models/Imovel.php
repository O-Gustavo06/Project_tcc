<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Imovel extends Model
{
    protected $table = 'imoveis';
    protected $primaryKey = 'ID_IMOVEL';
    public $timestamps = false;

    protected $fillable = [
        'ID_IMOBILIARIA',
        'NM_IMOVEL',
        'TP_IMOVEL',
        'VR_IMOVEL',
        'DS_TEXTO',
        'DS_CEP_IMOVEL',
        'DS_BAIRRO_IMOVEL',
        'DS_CIDADE_IMOVEL',
        'DS_ESTADO_IMOVEL',
        'STATUS_IMOVEL',
        'QT_QUARTOS',
        'QT_BANHEIROS',
        'QT_VAGAS',
        'VR_AREA_TOTAL',
        'FL_DESTAQUE',
    ];

    protected function casts(): array
    {
        return [
            'VR_IMOVEL' => 'decimal:2',
            'VR_AREA_TOTAL' => 'decimal:2',
            'FL_DESTAQUE' => 'boolean',
        ];
    }

    public function imobiliaria(): BelongsTo
    {
        return $this->belongsTo(Imobiliaria::class, 'ID_IMOBILIARIA', 'ID_IMOBILIARIA');
    }

    public function imagens(): HasMany
    {
        return $this->hasMany(ImovelImagem::class, 'ID_IMOVEL', 'ID_IMOVEL')
                    ->orderBy('NR_ORDEM');
    }

    public function vendas(): HasMany
    {
        return $this->hasMany(Venda::class, 'ID_IMOVEL', 'ID_IMOVEL');
    }
}
