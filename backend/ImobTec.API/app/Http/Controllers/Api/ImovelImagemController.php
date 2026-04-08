<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImovelImagemResource;
use App\Models\Imovel;
use App\Models\ImovelImagem;
use Illuminate\Http\Request;

class ImovelImagemController extends Controller
{
    public function index(int $imovelId)
    {
        $imovel = Imovel::findOrFail($imovelId);

        return ImovelImagemResource::collection($imovel->imagens);
    }

    public function store(Request $request, int $imovelId)
    {
        Imovel::findOrFail($imovelId);

        $validated = $request->validate([
            'DS_URL' => 'required|url|max:500',
            'FL_PRINCIPAL' => 'nullable|boolean',
            'NR_ORDEM' => 'nullable|integer|min:0',
        ]);

        $validated['ID_IMOVEL'] = $imovelId;

        if (!empty($validated['FL_PRINCIPAL'])) {
            ImovelImagem::where('ID_IMOVEL', $imovelId)
                        ->update(['FL_PRINCIPAL' => false]);
        }

        $imagem = ImovelImagem::create($validated);

        return new ImovelImagemResource($imagem);
    }

    public function destroy(int $imovelId, int $imagemId)
    {
        $imagem = ImovelImagem::where('ID_IMOVEL', $imovelId)
                              ->where('ID_IMAGEM', $imagemId)
                              ->firstOrFail();

        $imagem->delete();

        return response()->noContent();
    }
}
