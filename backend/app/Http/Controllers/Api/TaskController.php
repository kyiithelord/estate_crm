<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $companyId = (int) $request->query('company_id', 1);

        $userIds = User::query()
            ->where('company_id', $companyId)
            ->pluck('id');

        return Task::query()
            ->whereIn('user_id', $userIds)
            ->orderBy('due_date')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->validate([
            'user_id' => ['required', 'integer'],
            'deal_id' => ['nullable', 'integer'],
            'title' => ['required', 'string', 'max:200'],
            'due_date' => ['required', 'date'],
            'status' => ['nullable', 'string', 'max:20']
        ]);

        $task = Task::create([
            'user_id' => $payload['user_id'],
            'deal_id' => $payload['deal_id'] ?? null,
            'title' => $payload['title'],
            'due_date' => $payload['due_date'],
            'status' => $payload['status'] ?? 'pending'
        ]);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $companyId = (int) $request->query('company_id', 1);

        $userIds = User::query()
            ->where('company_id', $companyId)
            ->pluck('id');

        return Task::query()
            ->whereIn('user_id', $userIds)
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $payload = $request->validate([
            'user_id' => ['sometimes', 'integer'],
            'deal_id' => ['nullable', 'integer'],
            'title' => ['sometimes', 'string', 'max:200'],
            'due_date' => ['sometimes', 'date'],
            'status' => ['nullable', 'string', 'max:20']
        ]);

        $task = Task::findOrFail($id);
        $task->update($payload);

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->noContent();
    }

    public function complete(string $id)
    {
        $task = Task::findOrFail($id);
        $task->update(['status' => 'completed']);

        return $task;
    }
}
