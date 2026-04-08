<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImobiliariaRequest;
use App\Http\Resources\ImobiliariaResource;
use App\Models\Imobiliaria;
use Illuminate\Http\Request;

class ImobiliariaController extends Controller
{
    public function index(Request $request)
    {
        $query = Imobiliaria::withCount('imoveis');

        if ($request->filled('city')) {
            $query->where('NM_CIDADE', 'like', '%' . $request->city . '%');
        }

        $imobiliarias = $query->orderBy('NM_IMOBILIARIA')->paginate(15);

        return ImobiliariaResource::collection($imobiliarias);
    }

    public function store(StoreImobiliariaRequest $request)
    {
        $imobiliaria = Imobiliaria::create($request->validated());

        return new ImobiliariaResource($imobiliaria);
    }

    public function show(int $id)
    {
        $imobiliaria = Imobiliaria::withCount('imoveis')->findOrFail($id);

        return new ImobiliariaResource($imobiliaria);
    }

    public function update(StoreImobiliariaRequest $request, int $id)
    {
        $imobiliaria = Imobiliaria::findOrFail($id);
        $imobiliaria->update($request->validated());

        return new ImobiliariaResource($imobiliaria);
    }

    public function destroy(int $id)
    {
        $imobiliaria = Imobiliaria::findOrFail($id);
        $imobiliaria->delete();

        return response()->noContent();
    }
}
