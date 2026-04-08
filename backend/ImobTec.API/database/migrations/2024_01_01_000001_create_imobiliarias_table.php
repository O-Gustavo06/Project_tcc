<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('imobiliarias', function (Blueprint $table) {
            $table->id('ID_IMOBILIARIA');
            $table->string('NM_IMOBILIARIA', 100)->nullable();
            $table->string('RZ_SOCIAL', 150)->nullable();
            $table->string('DS_CNPJ', 20)->nullable()->unique();
            $table->string('NM_TELEFONE', 20);
            $table->string('DS_CEP', 10)->nullable();
            $table->string('DS_EMAIL', 100)->unique();
            $table->string('DS_RUA', 150)->nullable();
            $table->string('NR_CASA', 10)->nullable();
            $table->string('NM_BAIRRO', 100)->nullable();
            $table->string('NM_CIDADE', 100)->nullable();
            $table->string('NM_ESTADO', 50)->nullable();
            $table->timestamp('DT_CRIACAO')->useCurrent();
            $table->timestamp('DT_ATUALIZACAO')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imobiliarias');
    }
};
