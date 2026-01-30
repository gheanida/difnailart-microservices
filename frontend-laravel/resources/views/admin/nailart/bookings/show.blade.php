@extends('layouts.admin')

@section('page-title', 'Booking Details')

@section('admin-content')
<div class="row">
    <div class="col-lg-8">
        <div class="card border-0 shadow mb-4">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Booking Information</h5>
                <span class="badge rounded-pill bg-{{ 
                    $booking->status == 'confirmed' ? 'success' : 
                    ($booking->status == 'pending' ? 'warning' : 
                    ($booking->status == 'completed' ? 'info' : 'secondary')) 
                }}">
                    {{ ucfirst($booking->status) }}
                </span>
            </div>
            <div class="card-body">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>Customer Details</h6>
                        <div class="d-flex align-items-start mb-3">
                            <i class="bi bi-person-circle fs-4 me-3 text-primary"></i>
                            <div>
                                <h5 class="mb-1">{{ $booking->user->name }}</h5>
                                <p class="text-muted mb-1">{{ $booking->user->email }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>Booking Details</h6>
                        <p class="mb-1">
                            <i class="bi bi-calendar-event me-2"></i>
                            <strong>{{ \Carbon\Carbon::parse($booking->booking_date)->format('l, d F Y') }}</strong>
                        </p>
                        <p class="mb-1">
                            <i class="bi bi-clock me-2"></i>
                            {{ $booking->booking_time }}
                        </p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card bg-light">
                            <div class="card-body">
                                <h6>Service Information</h6>
                                <h5 class="text-primary">{{ $booking->service->name }}</h5>
                                <p class="mb-2">{{ $booking->service->description }}</p>
                                <h4 class="text-success">
                                    Rp {{ number_format($booking->service->price, 0, ',', '.') }}
                                </h4>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6>Update Status</h6>
                                <form action="{{ route('admin.nailart.bookings.status', $booking->id) }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <div class="mb-3">
                                        <select class="form-select" name="status" required>
                                            <option value="pending" {{ $booking->status == 'pending' ? 'selected' : '' }}>
                                                Pending
                                            </option>
                                            <option value="confirmed" {{ $booking->status == 'confirmed' ? 'selected' : '' }}>
                                                Confirmed
                                            </option>
                                            <option value="completed" {{ $booking->status == 'completed' ? 'selected' : '' }}>
                                                Completed
                                            </option>
                                            <option value="cancelled" {{ $booking->status == 'cancelled' ? 'selected' : '' }}>
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-check-circle"></i> Update Status
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        @if($booking->notes)
        <div class="card border-0 shadow">
            <div class="card-header bg-white">
                <h6 class="mb-0">Customer Notes</h6>
            </div>
            <div class="card-body">
                <p class="mb-0">{{ $booking->notes }}</p>
            </div>
        </div>
        @endif
    </div>
</div>

<a href="{{ route('admin.nailart.bookings') }}" class="btn btn-secondary">Back to List</a>
@endsection
