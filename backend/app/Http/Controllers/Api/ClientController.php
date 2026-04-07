<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Client::query()
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
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:190'],
            'interest' => ['required', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'source' => ['nullable', 'string', 'max:100'],
            'assigned_to' => ['nullable', 'integer']
        ]);

        $client = Client::create([
            'company_id' => $companyId,
            'assigned_to' => $payload['assigned_to'] ?? null,
            'name' => $payload['name'],
            'phone' => $payload['phone'] ?? null,
            'email' => $payload['email'] ?? null,
            'interest' => $payload['interest'],
            'notes' => $payload['notes'] ?? null,
            'source' => $payload['source'] ?? null
        ]);

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Client::query()
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
            'name' => ['sometimes', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:190'],
            'interest' => ['sometimes', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'source' => ['nullable', 'string', 'max:100'],
            'assigned_to' => ['nullable', 'integer']
        ]);

        $client = Client::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $client->update($payload);

        return $client;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $companyId = (int) $request->input('company_id', $request->query('company_id', 1));

        $client = Client::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $client->delete();

        return response()->noContent();
    }
}
