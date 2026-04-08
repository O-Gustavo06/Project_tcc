<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('imovel_imagens', function (Blueprint $table) {
            $table->id('ID_IMAGEM');
            $table->unsignedBigInteger('ID_IMOVEL');
            $table->string('DS_URL', 500);
            $table->boolean('FL_PRINCIPAL')->default(false);
            $table->integer('NR_ORDEM')->default(0);
            $table->timestamp('DT_CRIACAO')->useCurrent();

            $table->foreign('ID_IMOVEL')
                  ->references('ID_IMOVEL')
                  ->on('imoveis')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('imovel_imagens');
    }
};
