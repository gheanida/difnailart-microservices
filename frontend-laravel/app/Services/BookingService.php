<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class BookingService
{
    protected $client;
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('BOOKING_SERVICE_URL', 'http://localhost:3002');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 10.0,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
        ]);
    }

    public function getServices()
    {
        try {
            $response = $this->client->get('/bookings/services');
            $data = json_decode($response->getBody(), true);
            return $data['data'] ?? [];
        } catch (\Exception $e) {
            Log::error('Failed to get services: ' . $e->getMessage());
            return [];
        }
    }

    public function createBooking($bookingData)
    {
        try {
            $response = $this->client->post('/bookings', [
                'json' => $bookingData
            ]);
            
            return json_decode($response->getBody(), true);
            
        } catch (\Exception $e) {
            Log::error('Booking creation failed: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Booking failed. Please try again.'
            ];
        }
    }

    public function getUserBookings($userId)
    {
        try {
            $response = $this->client->get("/bookings/user/{$userId}");
            $data = json_decode($response->getBody(), true);
            return $data['data'] ?? [];
        } catch (\Exception $e) {
            Log::error('Failed to get user bookings: ' . $e->getMessage());
            return [];
        }
    }
}
