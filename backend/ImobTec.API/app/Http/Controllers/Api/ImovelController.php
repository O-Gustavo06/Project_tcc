<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImovelRequest;
use App\Http\Requests\UpdateImovelRequest;
use App\Http\Resources\ImovelResource;
use App\Models\Imovel;
use Illuminate\Http\Request;

class ImovelController extends Controller
{
    public function index(Request $request)
    {
        $query = Imovel::with(['imagens', 'imobiliaria']);

        if ($request->filled('property_type')) {
            $typeMap = [
                'house' => 'CASA',
                'apartment' => 'APARTAMENTO',
                'land' => 'TERRENO',
                'commercial' => 'COMERCIAL',
            ];
            $dbType = $typeMap[$request->property_type] ?? $request->property_type;
            $query->where('TP_IMOVEL', $dbType);
        }

        if ($request->filled('city')) {
            $query->where('DS_CIDADE_IMOVEL', 'like', '%' . $request->city . '%');
        }

        if ($request->filled('state')) {
            $query->where('DS_ESTADO_IMOVEL', 'like', '%' . $request->state . '%');
        }

        if ($request->filled('district')) {
            $query->where('DS_BAIRRO_IMOVEL', 'like', '%' . $request->district . '%');
        }

        if ($request->filled('status')) {
            $query->where('STATUS_IMOVEL', $request->status);
        }

        if ($request->filled('min_price')) {
            $query->where('VR_IMOVEL', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('VR_IMOVEL', '<=', $request->max_price);
        }

        if ($request->filled('bedrooms')) {
            $query->where('QT_QUARTOS', '>=', $request->bedrooms);
        }

        if ($request->filled('featured')) {
            $query->where('FL_DESTAQUE', true);
        }

        $properties = $query->orderByDesc('FL_DESTAQUE')
                            ->orderByDesc('DT_CRIACAO')
                            ->paginate($request->integer('per_page', 15));

        return ImovelResource::collection($properties);
    }

    public function store(StoreImovelRequest $request)
    {
        $imovel = Imovel::create($request->validated());

        $imovel->load(['imagens', 'imobiliaria']);

        return new ImovelResource($imovel);
    }

    public function show(int $id)
    {
        $imovel = Imovel::with(['imagens', 'imobiliaria'])->findOrFail($id);

        return new ImovelResource($imovel);
    }

    public function update(UpdateImovelRequest $request, int $id)
    {
        $imovel = Imovel::findOrFail($id);
        $imovel->update($request->validated());
        $imovel->load(['imagens', 'imobiliaria']);

        return new ImovelResource($imovel);
    }

    public function destroy(int $id)
    {
        $imovel = Imovel::findOrFail($id);
        $imovel->delete();

        return response()->noContent();
    }
}
