<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permissao extends Model
{
    protected $table = 'permissoes';
    protected $primaryKey = 'ID_PERMISSAO';
    public $timestamps = false;

    protected $fillable = [
        'NM_PERMISSAO',
        'DS_PERMISSAO',
    ];
}
