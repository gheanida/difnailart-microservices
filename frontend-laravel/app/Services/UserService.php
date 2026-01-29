<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class UserService
{
    protected $client;
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('USER_SERVICE_URL', 'http://localhost:3001');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 10.0,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
        ]);
    }

    public function register($data)
    {
        try {
            $response = $this->client->post('/users/register', [
                'json' => $data
            ]);
            
            return json_decode($response->getBody(), true);
            
        } catch (\Exception $e) {
            Log::error('User registration failed: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Registration failed. Please try again.'
            ];
        }
    }

    public function login($credentials)
    {
        try {
            $response = $this->client->post('/users/login', [
                'json' => $credentials
            ]);
            
            $data = json_decode($response->getBody(), true);
            
            // Store user session
            if (isset($data['data']['userId'])) {
                session([
                    'user_id' => $data['data']['userId'],
                    'user_email' => $data['data']['email'],
                    'logged_in' => true
                ]);
            }
            
            return $data;
            
        } catch (\Exception $e) {
            Log::error('User login failed: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Login failed. Please check your credentials.'
            ];
        }
    }

    public function getUsers()
    {
        try {
            $response = $this->client->get('/users');
            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            Log::error('Failed to get users: ' . $e->getMessage());
            return ['data' => []];
        }
    }
}