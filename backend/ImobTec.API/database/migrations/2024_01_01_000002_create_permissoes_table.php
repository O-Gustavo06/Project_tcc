<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('permissoes', function (Blueprint $table) {
            $table->id('ID_PERMISSAO');
            $table->string('NM_PERMISSAO', 50);
            $table->string('DS_PERMISSAO', 100)->nullable();
            $table->timestamp('DT_CRIACAO')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permissoes');
    }
};
