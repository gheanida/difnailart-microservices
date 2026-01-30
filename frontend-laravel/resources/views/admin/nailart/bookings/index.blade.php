@extends('layouts.admin')

@section('page-title', 'Bookings Management')

@section('admin-content')
<div class="card border-0 shadow">
    <div class="card-body">
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif
        
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($bookings as $booking)
                    <tr>
                        <td>#{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-person-circle me-2"></i>
                                <div>
                                    <strong>{{ $booking->user->name }}</strong>
                                    <br>
                                    <small class="text-muted">{{ $booking->user->email }}</small>
                                </div>
                            </div>
                        </td>
                        <td>{{ $booking->service->name }}</td>
                        <td>
                            {{ \Carbon\Carbon::parse($booking->booking_date)->format('d/m/Y') }}
                            <br>
                            <small class="text-muted">{{ $booking->booking_time }}</small>
                        </td>
                        <td>Rp {{ number_format($booking->service->price, 0, ',', '.') }}</td>
                        <td>
                            <span class="badge rounded-pill bg-{{ 
                                $booking->status == 'confirmed' ? 'success' : 
                                ($booking->status == 'pending' ? 'warning' : 
                                ($booking->status == 'completed' ? 'info' : 'secondary')) 
                            }}">
                                {{ ucfirst($booking->status) }}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="{{ route('admin.nailart.bookings.show', $booking->id) }}" 
                                   class="btn btn-outline-info" title="View Details">
                                    <i class="bi bi-eye"></i>
                                </a>
                                <button type="button" class="btn btn-outline-primary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#statusModal{{ $booking->id }}"
                                        title="Change Status">
                                    <i class="bi bi-pencil"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Status Modal -->
                    <div class="modal fade" id="statusModal{{ $booking->id }}" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Update Booking Status</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <form action="{{ route('admin.nailart.bookings.status', $booking->id) }}" method="POST">
                                    @csrf
                                    @method('PUT')
                                    <div class="modal-body">
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
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Update Status</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    @empty
                    <tr>
                        <td colspan="7" class="text-center py-5">
                            <i class="bi bi-calendar-x display-4 text-muted d-block mb-3"></i>
                            <h5>No bookings found</h5>
                            <p class="text-muted">No nail art bookings have been made yet.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        {{ $bookings->links() }}
    </div>
</div>
@endsection
