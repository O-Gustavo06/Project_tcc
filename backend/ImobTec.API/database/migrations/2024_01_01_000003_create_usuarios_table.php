<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('ID_USUARIO');
            $table->string('NM_USUARIO', 100)->nullable();
            $table->date('DT_NASCIMENTO')->nullable();
            $table->string('DS_USUARIO', 30);
            $table->string('DS_EMAIL', 100)->unique();
            $table->string('DS_SENHA');
            $table->string('DS_GENERO', 20);
            $table->unsignedBigInteger('TP_PERMISSAO')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('TP_PERMISSAO')
                  ->references('ID_PERMISSAO')
                  ->on('permissoes')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
