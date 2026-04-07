<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use Illuminate\Http\Request;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Deal::query()
            ->where('company_id', $companyId)
            ->orderByDesc('id')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $companyId = (int) $request->input('company_id', 1);

        $payload = $request->validate([
            'client_id' => ['required', 'integer'],
            'property_id' => ['nullable', 'integer'],
            'assigned_to' => ['nullable', 'integer'],
            'stage' => ['nullable', 'string', 'max:20'],
            'value_amount' => ['nullable', 'numeric'],
            'closed_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string']
        ]);

        $deal = Deal::create([
            'company_id' => $companyId,
            'client_id' => $payload['client_id'],
            'property_id' => $payload['property_id'] ?? null,
            'assigned_to' => $payload['assigned_to'] ?? null,
            'stage' => $payload['stage'] ?? 'new',
            'value_amount' => $payload['value_amount'] ?? 0,
            'closed_at' => $payload['closed_at'] ?? null,
            'notes' => $payload['notes'] ?? null
        ]);

        return response()->json($deal, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Deal::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $companyId = (int) $request->input('company_id', $request->query('company_id', 1));

        $payload = $request->validate([
            'client_id' => ['sometimes', 'integer'],
            'property_id' => ['nullable', 'integer'],
            'assigned_to' => ['nullable', 'integer'],
            'stage' => ['sometimes', 'string', 'max:20'],
            'value_amount' => ['nullable', 'numeric'],
            'closed_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string']
        ]);

        $deal = Deal::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $deal->update($payload);

        return $deal;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $companyId = (int) $request->input('company_id', $request->query('company_id', 1));

        $deal = Deal::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $deal->delete();

        return response()->noContent();
    }

    public function stage(Request $request, string $id)
    {
        $companyId = (int) $request->input('company_id', $request->query('company_id', 1));

        $payload = $request->validate([
            'stage' => ['required', 'string', 'max:20']
        ]);

        $deal = Deal::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $deal->update(['stage' => $payload['stage']]);

        return $deal;
    }
}
