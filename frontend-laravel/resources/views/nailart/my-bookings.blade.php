@extends('layouts.app')

@section('title', 'My Bookings - DifNailart Studio')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="bi bi-calendar-check"></i> My Bookings</h2>
        <a href="{{ route('nailart.booking') }}" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> New Booking
        </a>
    </div>

    @if($bookings->isEmpty())
        <div class="alert alert-info text-center py-5">
            <i class="bi bi-calendar-x display-4 d-block mb-3"></i>
            <h4>No bookings yet</h4>
            <p class="mb-0">You haven't made any nail art bookings.</p>
            <a href="{{ route('nailart.booking') }}" class="btn btn-primary mt-3">
                Make your first booking
            </a>
        </div>
    @else
        <div class="row">
            @foreach($bookings as $booking)
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span class="badge bg-{{ 
                            $booking->status == 'confirmed' ? 'success' : 
                            ($booking->status == 'pending' ? 'warning' : 
                            ($booking->status == 'completed' ? 'info' : 'secondary')) 
                        }}">
                            {{ ucfirst($booking->status) }}
                        </span>
                        <small>#{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}</small>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ $booking->service->name }}</h5>
                        <p class="card-text">
                            <i class="bi bi-calendar-event"></i> 
                            <strong>{{ \Carbon\Carbon::parse($booking->booking_date)->format('l, d F Y') }}</strong>
                            <br>
                            <i class="bi bi-clock"></i> {{ $booking->booking_time }}
                            <br>
                            <i class="bi bi-cash"></i> Rp {{ number_format($booking->service->price, 0, ',', '.') }}
                        </p>
                        @if($booking->notes)
                            <p class="card-text">
                                <small class="text-muted">
                                    <i class="bi bi-chat-text"></i> {{ Str::limit($booking->notes, 100) }}
                                </small>
                            </p>
                        @endif
                    </div>
                    <div class="card-footer bg-transparent">
                        @if($booking->status == 'pending')
                        <form action="{{ route('nailart.booking.cancel', $booking->id) }}" method="POST" 
                              onsubmit="return confirm('Are you sure you want to cancel this booking?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-outline-danger w-100">
                                <i class="bi bi-x-circle"></i> Cancel Booking
                            </button>
                        </form>
                        @elseif($booking->status == 'confirmed')
                            <div class="alert alert-success alert-sm mb-0 text-center">
                                <i class="bi bi-check-circle"></i> Confirmed
                            </div>
                        @endif
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
