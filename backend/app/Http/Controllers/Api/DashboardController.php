<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Deal;
use App\Models\Property;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $companyId = (int) $request->query('company_id', 1);

        $userIds = User::query()
            ->where('company_id', $companyId)
            ->pluck('id');

        $stats = [
            'properties' => Property::where('company_id', $companyId)->count(),
            'clients' => Client::where('company_id', $companyId)->count(),
            'openDeals' => Deal::where('company_id', $companyId)->where('stage', '!=', 'closed')->count(),
            'dueTasks' => Task::whereIn('user_id', $userIds)->where('status', 'pending')->count()
        ];

        $pipeline = [
            'new' => Deal::where('company_id', $companyId)->where('stage', 'new')->count(),
            'contacted' => Deal::where('company_id', $companyId)->where('stage', 'contacted')->count(),
            'visit' => Deal::where('company_id', $companyId)->where('stage', 'visit')->count(),
            'negotiation' => Deal::where('company_id', $companyId)->where('stage', 'negotiation')->count(),
            'closed' => Deal::where('company_id', $companyId)->where('stage', 'closed')->count()
        ];

        return [
            'stats' => $stats,
            'pipeline' => $pipeline
        ];
    }
}
