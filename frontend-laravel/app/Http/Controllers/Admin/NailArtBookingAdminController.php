<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NailArtBooking;
use Illuminate\Http\Request;

class NailArtBookingAdminController extends Controller
{
    public function index()
    {
        $bookings = NailArtBooking::with(['user', 'service'])
            ->orderBy('booking_date', 'desc')
            ->paginate(10);

        return view('admin.nailart.bookings.index', compact('bookings'));
    }

    public function show($id)
    {
        $booking = NailArtBooking::with(['user', 'service'])->findOrFail($id);
        return view('admin.nailart.bookings.show', compact('booking'));
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled'
        ]);

        $booking = NailArtBooking::findOrFail($id);
        $booking->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Status booking berhasil diperbarui');
    }

    public function destroy($id)
    {
        $booking = NailArtBooking::findOrFail($id);
        $booking->delete();

        return redirect()->route('admin.nailart.bookings')
            ->with('success', 'Booking berhasil dihapus');
    }
}