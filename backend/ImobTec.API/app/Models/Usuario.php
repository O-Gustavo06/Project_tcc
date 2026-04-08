<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'ID_USUARIO';

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'NM_USUARIO',
        'DT_NASCIMENTO',
        'DS_USUARIO',
        'DS_EMAIL',
        'DS_SENHA',
        'DS_GENERO',
        'TP_PERMISSAO',
    ];

    protected $hidden = [
        'DS_SENHA',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'DT_NASCIMENTO' => 'date',
            'DS_SENHA' => 'hashed',
        ];
    }

    public function getAuthPassword(): string
    {
        return $this->DS_SENHA;
    }

    public function permissao(): BelongsTo
    {
        return $this->belongsTo(Permissao::class, 'TP_PERMISSAO', 'ID_PERMISSAO');
    }
}
