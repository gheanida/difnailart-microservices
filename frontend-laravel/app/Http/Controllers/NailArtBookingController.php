<?php

namespace App\Http\Controllers;

use App\Models\NailArtBooking;
use App\Models\NailArtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NailArtBookingController extends Controller
{
    public function index()
    {
        $services = NailArtService::all();
        return view('nailart.booking', compact('services'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:nail_art_services,id',
            'booking_date' => 'required|date|after:today',
            'booking_time' => 'required|date_format:H:i',
            'notes' => 'nullable|string|max:500',
        ]);

        $booking = NailArtBooking::create([
            'user_id' => Auth::id(),
            'service_id' => $validated['service_id'],
            'booking_date' => $validated['booking_date'],
            'booking_time' => $validated['booking_time'],
            'notes' => $validated['notes'],
            'status' => 'pending'
        ]);

        return redirect()->route('nailart.bookings')
            ->with('success', 'Booking berhasil dibuat!');
    }

    public function myBookings()
    {
        $bookings = NailArtBooking::where('user_id', Auth::id())
            ->with('service')
            ->orderBy('booking_date', 'desc')
            ->get();

        return view('nailart.my-bookings', compact('bookings'));
    }

    public function cancel($id)
    {
        $booking = NailArtBooking::where('user_id', Auth::id())->findOrFail($id);
        
        if ($booking->status === 'pending') {
            $booking->update(['status' => 'cancelled']);
            return redirect()->back()->with('success', 'Booking berhasil dibatalkan');
        }

        return redirect()->back()->with('error', 'Tidak dapat membatalkan booking ini');
    }
}