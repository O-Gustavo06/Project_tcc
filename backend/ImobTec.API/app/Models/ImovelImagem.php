<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImovelImagem extends Model
{
    protected $table = 'imovel_imagens';
    protected $primaryKey = 'ID_IMAGEM';
    public $timestamps = false;

    protected $fillable = [
        'ID_IMOVEL',
        'DS_URL',
        'FL_PRINCIPAL',
        'NR_ORDEM',
    ];

    protected function casts(): array
    {
        return [
            'FL_PRINCIPAL' => 'boolean',
        ];
    }

    public function imovel(): BelongsTo
    {
        return $this->belongsTo(Imovel::class, 'ID_IMOVEL', 'ID_IMOVEL');
    }
}
