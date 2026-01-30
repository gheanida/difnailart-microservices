<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NailArtBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
        'booking_date',
        'booking_time',
        'notes',
        'status'
    ];

    protected $casts = [
        'booking_date' => 'date',
        'booking_time' => 'datetime:H:i'
    ];

    // Relationship dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship dengan service
    public function service()
    {
        return $this->belongsTo(NailArtService::class);
    }
}