<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('imoveis', function (Blueprint $table) {
            $table->id('ID_IMOVEL');
            $table->unsignedBigInteger('ID_IMOBILIARIA');
            $table->string('NM_IMOVEL', 150)->nullable();
            $table->enum('TP_IMOVEL', ['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL']);
            $table->decimal('VR_IMOVEL', 12, 2);
            $table->text('DS_TEXTO')->nullable();
            $table->string('DS_CEP_IMOVEL', 10)->nullable();
            $table->string('DS_BAIRRO_IMOVEL', 100)->nullable();
            $table->string('DS_CIDADE_IMOVEL', 100)->nullable();
            $table->string('DS_ESTADO_IMOVEL', 50)->nullable();
            $table->enum('STATUS_IMOVEL', ['DISPONIVEL', 'VENDIDO', 'ALUGADO'])->default('DISPONIVEL');
            $table->integer('QT_QUARTOS')->default(0);
            $table->integer('QT_BANHEIROS')->default(0);
            $table->integer('QT_VAGAS')->default(0);
            $table->decimal('VR_AREA_TOTAL', 10, 2)->nullable();
            $table->boolean('FL_DESTAQUE')->default(false);
            $table->timestamp('DT_CRIACAO')->useCurrent();
            $table->timestamp('DT_ATUALIZACAO')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('ID_IMOBILIARIA')
                  ->references('ID_IMOBILIARIA')
                  ->on('imobiliarias')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imoveis');
    }
};
