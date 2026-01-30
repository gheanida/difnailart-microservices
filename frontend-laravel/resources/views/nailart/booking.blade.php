@extends('layouts.app')

@section('title', 'Book Nail Art - DifNailart Studio')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card border-0 shadow">
                <div class="card-header bg-gradient-primary text-white">
                    <h4 class="mb-0"><i class="bi bi-calendar-plus"></i> Book Nail Art Session</h4>
                </div>
                <div class="card-body">
                    @if(session('success'))
                        <div class="alert alert-success">{{ session('success') }}</div>
                    @endif

                    <form method="POST" action="{{ route('nailart.booking.store') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="service_id" class="form-label">Select Service <span class="text-danger">*</span></label>
                            <select class="form-select @error('service_id') is-invalid @enderror" 
                                    id="service_id" name="service_id" required>
                                <option value="">-- Choose a service --</option>
                                @foreach($services as $service)
                                    <option value="{{ $service->id }}" 
                                            {{ old('service_id') == $service->id ? 'selected' : '' }}>
                                        {{ $service->name }} - 
                                        Rp {{ number_format($service->price, 0, ',', '.') }} 
                                        ({{ $service->duration_minutes }} mins)
                                    </option>
                                @endforeach
                            </select>
                            @error('service_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="booking_date" class="form-label">Booking Date <span class="text-danger">*</span></label>
                                <input type="date" 
                                       class="form-control @error('booking_date') is-invalid @enderror" 
                                       id="booking_date" 
                                       name="booking_date" 
                                       value="{{ old('booking_date') }}" 
                                       min="{{ date('Y-m-d', strtotime('+1 day')) }}" 
                                       required>
                                <small class="text-muted">Please book at least 1 day in advance</small>
                                @error('booking_date')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="col-md-6 mb-3">
                                <label for="booking_time" class="form-label">Booking Time <span class="text-danger">*</span></label>
                                <input type="time" 
                                       class="form-control @error('booking_time') is-invalid @enderror" 
                                       id="booking_time" 
                                       name="booking_time" 
                                       value="{{ old('booking_time') }}" 
                                       min="09:00" 
                                       max="18:00" 
                                       required>
                                <small class="text-muted">Operating hours: 09:00 - 18:00</small>
                                @error('booking_time')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="notes" class="form-label">Additional Notes</label>
                            <textarea class="form-control @error('notes') is-invalid @enderror" 
                                      id="notes" 
                                      name="notes" 
                                      rows="3" 
                                      placeholder="Any special requests or allergies...">{{ old('notes') }}</textarea>
                            @error('notes')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="{{ route('nailart.bookings') }}" class="btn btn-outline-secondary me-md-2">
                                <i class="bi bi-list-ul"></i> View My Bookings
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-check-circle"></i> Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Set min date to tomorrow
    document.getElementById('booking_date').min = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
    
    // Set default time to next available hour
    const now = new Date();
    let hours = now.getHours();
    if (hours < 9) hours = 9;
    if (hours >= 18) hours = 9;
    const nextHour = hours.toString().padStart(2, '0') + ':00';
    if (!document.getElementById('booking_time').value) {
        document.getElementById('booking_time').value = nextHour;
    }
</script>
@endsection
