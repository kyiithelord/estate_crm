<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class BootstrapSeeder extends Seeder
{
    /**
     * Seed the application's minimum required records.
     */
    public function run(): void
    {
        $company = Company::query()->updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Default Workspace',
                'plan' => 'starter',
            ]
        );

        User::query()->updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Default Agent',
                'email' => 'agent@estate-crm.local',
                'password' => 'password',
                'company_id' => $company->id,
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
