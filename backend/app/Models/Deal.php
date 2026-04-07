<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'client_id',
        'property_id',
        'assigned_to',
        'stage',
        'value_amount',
        'closed_at',
        'notes'
    ];

    protected $casts = [
        'closed_at' => 'datetime'
    ];
}
