<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendas', function (Blueprint $table) {
            $table->id('ID_VENDA');
            $table->unsignedBigInteger('ID_USUARIO');
            $table->unsignedBigInteger('ID_IMOVEL');
            $table->decimal('VR_IMOVEL', 12, 2);
            $table->decimal('VR_COMISSAO', 10, 2)->nullable();
            $table->date('DT_VENDA');
            $table->enum('DS_STATUS', ['PENDENTE', 'CONCLUIDA', 'CANCELADA'])->default('PENDENTE');

            $table->foreign('ID_USUARIO')
                  ->references('ID_USUARIO')
                  ->on('usuarios');

            $table->foreign('ID_IMOVEL')
                  ->references('ID_IMOVEL')
                  ->on('imoveis');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendas');
    }
};
