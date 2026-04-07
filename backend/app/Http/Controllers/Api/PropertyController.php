<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Property::query()
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
            'title' => ['required', 'string', 'max:200'],
            'price' => ['nullable', 'numeric'],
            'property_type' => ['required', 'string', 'max:20'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'created_by' => ['nullable', 'integer']
        ]);

        $property = Property::create([
            'company_id' => $companyId,
            'title' => $payload['title'],
            'price' => $payload['price'] ?? 0,
            'property_type' => $payload['property_type'],
            'location' => $payload['location'],
            'status' => $payload['status'] ?? 'available',
            'description' => $payload['description'] ?? null,
            'created_by' => $payload['created_by'] ?? null
        ]);

        return response()->json($property, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $companyId = (int) $request->query('company_id', 1);

        return Property::query()
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
            'title' => ['sometimes', 'string', 'max:200'],
            'price' => ['sometimes', 'numeric'],
            'property_type' => ['sometimes', 'string', 'max:20'],
            'location' => ['sometimes', 'string', 'max:255'],
            'status' => ['sometimes', 'string', 'max:20'],
            'description' => ['nullable', 'string']
        ]);

        $property = Property::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $property->update($payload);

        return $property;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $companyId = (int) $request->input('company_id', $request->query('company_id', 1));

        $property = Property::query()
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $property->delete();

        return response()->noContent();
    }
}
