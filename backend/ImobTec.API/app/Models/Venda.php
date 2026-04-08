<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Venda extends Model
{
    protected $table = 'vendas';
    protected $primaryKey = 'ID_VENDA';
    public $timestamps = false;

    protected $fillable = [
        'ID_USUARIO',
        'ID_IMOVEL',
        'VR_IMOVEL',
        'VR_COMISSAO',
        'DT_VENDA',
        'DS_STATUS',
    ];

    protected function casts(): array
    {
        return [
            'VR_IMOVEL' => 'decimal:2',
            'VR_COMISSAO' => 'decimal:2',
            'DT_VENDA' => 'date',
        ];
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'ID_USUARIO', 'ID_USUARIO');
    }

    public function imovel(): BelongsTo
    {
        return $this->belongsTo(Imovel::class, 'ID_IMOVEL', 'ID_IMOVEL');
    }
}
