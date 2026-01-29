<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookingService;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function index()
    {
        $services = $this->bookingService->getServices();
        return view('bookings.index', compact('services'));
    }

    public function create(Request $request)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'booking_date' => 'required|date|date_format:Y-m-d',
            'booking_time' => 'required|date_format:H:i',
            'notes' => 'nullable|string|max:500'
        ]);

        $bookingData = $request->only('service_id', 'booking_date', 'booking_time', 'notes');
        $bookingData['userId'] = session('user_id');

        $result = $this->bookingService->createBooking($bookingData);

        if (isset($result['error'])) {
            return back()->withErrors(['message' => $result['message']]);
        }

        return redirect()->route('bookings.my')->with('success', 'Booking created successfully!');
    }

    public function myBookings()
    {
        $userId = session('user_id');
        $bookings = $this->bookingService->getUserBookings($userId);
        
        return view('bookings.my', compact('bookings'));
    }

    public function dashboard()
    {
        if (!session('logged_in')) {
            return redirect()->route('login');
        }

        $userId = session('user_id');
        $bookings = $this->bookingService->getUserBookings($userId);
        $services = $this->bookingService->getServices();

        return view('dashboard', compact('bookings', 'services'));
    }
}