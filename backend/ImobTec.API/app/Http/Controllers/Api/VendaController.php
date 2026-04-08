<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VendaResource;
use App\Models\Venda;
use Illuminate\Http\Request;

class VendaController extends Controller
{
    public function index(Request $request)
    {
        $query = Venda::with(['usuario', 'imovel.imobiliaria']);

        if ($request->filled('status')) {
            $query->where('DS_STATUS', $request->status);
        }

        $vendas = $query->orderByDesc('DT_VENDA')->paginate(15);

        return VendaResource::collection($vendas);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_USUARIO' => 'required|exists:usuarios,ID_USUARIO',
            'ID_IMOVEL' => 'required|exists:imoveis,ID_IMOVEL',
            'VR_IMOVEL' => 'required|numeric|min:0',
            'VR_COMISSAO' => 'nullable|numeric|min:0',
            'DT_VENDA' => 'required|date',
            'DS_STATUS' => 'nullable|in:PENDENTE,CONCLUIDA,CANCELADA',
        ]);

        $venda = Venda::create($validated);
        $venda->load(['usuario', 'imovel']);

        return new VendaResource($venda);
    }

    public function show(int $id)
    {
        $venda = Venda::with(['usuario', 'imovel.imobiliaria'])->findOrFail($id);

        return new VendaResource($venda);
    }

    public function update(Request $request, int $id)
    {
        $venda = Venda::findOrFail($id);

        $validated = $request->validate([
            'DS_STATUS' => 'sometimes|in:PENDENTE,CONCLUIDA,CANCELADA',
            'VR_COMISSAO' => 'nullable|numeric|min:0',
        ]);

        $venda->update($validated);
        $venda->load(['usuario', 'imovel']);

        return new VendaResource($venda);
    }
}
