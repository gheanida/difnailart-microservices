<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Nail Art - DifNailart Studio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .service-card {
            transition: transform 0.3s;
            cursor: pointer;
        }
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .selected-service {
            border: 2px solid #0d6efd;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">DifNailart Studio</a>
            <div class="navbar-nav ms-auto">
                @if(session('logged_in'))
                    <a href="{{ route('dashboard') }}" class="nav-link">Dashboard</a>
                    <a href="{{ route('bookings.my') }}" class="nav-link">My Bookings</a>
                    <a href="{{ route('logout') }}" class="nav-link">Logout</a>
                @else
                    <a href="{{ route('login') }}" class="nav-link">Login</a>
                    <a href="{{ route('register') }}" class="nav-link">Register</a>
                @endif
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <h1 class="mb-4">Book Your Nail Art Service</h1>
        
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        
        @if($errors->any())
            <div class="alert alert-danger">
                {{ $errors->first() }}
            </div>
        @endif

        <div class="row mb-4">
            @foreach($services as $service)
                <div class="col-md-4 mb-3">
                    <div class="card service-card" 
                         onclick="selectService({{ $service['id'] }}, '{{ $service['name'] }}', {{ $service['price'] }})"
                         id="service-{{ $service['id'] }}">
                        <div class="card-body">
                            <h5 class="card-title">{{ $service['name'] }}</h5>
                            <p class="card-text">Duration: {{ $service['duration'] }} minutes</p>
                            <p class="card-text"><strong>Rp {{ number_format($service['price'], 0, ',', '.') }}</strong></p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="card">
            <div class="card-header">
                <h4>Booking Form</h4>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('bookings.create') }}">
                    @csrf
                    <input type="hidden" name="service_id" id="selected_service_id">
                    
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="booking_date" class="form-label">Booking Date</label>
                            <input type="date" class="form-control" id="booking_date" name="booking_date" required>
                        </div>
                        <div class="col-md-6">
                            <label for="booking_time" class="form-label">Booking Time</label>
                            <input type="time" class="form-control" id="booking_time" name="booking_time" required>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="notes" class="form-label">Additional Notes</label>
                        <textarea class="form-control" id="notes" name="notes" rows="3"></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <div id="selected-service-info" class="alert alert-info" style="display: none;">
                            Selected Service: <span id="service-name"></span> - 
                            Price: Rp <span id="service-price"></span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" id="book-btn" disabled>Book Now</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        let selectedServiceId = null;
        
        function selectService(id, name, price) {
            // Remove previous selection
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.remove('selected-service');
            });
            
            // Add selection to clicked card
            document.getElementById(`service-${id}`).classList.add('selected-service');
            
            // Update form
            selectedServiceId = id;
            document.getElementById('selected_service_id').value = id;
            document.getElementById('service-name').textContent = name;
            document.getElementById('service-price').textContent = price.toLocaleString('id-ID');
            document.getElementById('selected-service-info').style.display = 'block';
            document.getElementById('book-btn').disabled = false;
        }
        
        // Set minimum date to tomorrow
        document.addEventListener('DOMContentLoaded', function() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0];
            document.getElementById('booking_date').min = formattedDate;
        });
    </script>
</body>
</html>