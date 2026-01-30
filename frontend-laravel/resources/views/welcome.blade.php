@extends('layouts.app')

@section('title', 'Home - DifNailart Studio')

@section('content')
<div class="container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section py-5 my-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-4">
                        Beautiful Nails,<br>
                        <span class="text-gradient">Confident You</span>
                    </h1>
                    <p class="lead mb-4">
                        At DifNailart Studio, we transform your nails into works of art. 
                        Book your perfect manicure experience with our talented artists.
                    </p>
                    <div class="d-flex flex-wrap gap-3">
                        @auth
                            <a href="{{ route('nailart.booking') }}" class="btn btn-primary btn-lg px-4">
                                <i class="bi bi-calendar-plus me-2"></i> Book Now
                            </a>
                            <a href="{{ route('nailart.bookings') }}" class="btn btn-outline-primary btn-lg px-4">
                                <i class="bi bi-calendar-check me-2"></i> My Bookings
                            </a>
                        @else
                            <a href="{{ route('register') }}" class="btn btn-primary btn-lg px-4">
                                <i class="bi bi-person-plus me-2"></i> Get Started
                            </a>
                            <a href="{{ route('login') }}" class="btn btn-outline-primary btn-lg px-4">
                                <i class="bi bi-box-arrow-in-right me-2"></i> Login
                            </a>
                        @endauth
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="position-relative">
                        <div class="card border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
                            <img src="https://images.unsplash.com/photo-1607779096195-4cfe1c8c6d6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                                 class="img-fluid" 
                                 alt="Nail Art Design">
                            <div class="card-img-overlay d-flex align-items-end">
                                <div class="bg-dark bg-opacity-50 p-3 text-white" style="border-radius: 0 0 20px 20px;">
                                    <h5 class="mb-0">Featured Design of the Week</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="display-5 fw-bold mb-3">Our Premium Services</h2>
                <p class="lead text-muted">From classic manicures to intricate nail art designs</p>
            </div>
            
            <div class="row g-4">
                @php
                    $services = [
                        ['name' => 'Basic Manicure', 'price' => 75000, 'desc' => 'Classic nail care with polish', 'icon' => 'bi-hand-thumbs-up'],
                        ['name' => 'Gel Nails', 'price' => 150000, 'desc' => 'Long-lasting gel polish', 'icon' => 'bi-gem'],
                        ['name' => 'Nail Art Design', 'price' => 200000, 'desc' => 'Creative designs & patterns', 'icon' => 'bi-brush'],
                        ['name' => 'Acrylic Nails', 'price' => 250000, 'desc' => 'Durable acrylic extensions', 'icon' => 'bi-star'],
                        ['name' => 'Spa Manicure', 'price' => 180000, 'desc' => 'Relaxing spa treatment', 'icon' => 'bi-flower1'],
                        ['name' => 'French Manicure', 'price' => 120000, 'desc' => 'Classic French style', 'icon' => 'bi-diamond'],
                    ];
                @endphp
                
                @foreach($services as $service)
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body text-center p-4">
                            <div class="icon-wrapper mb-4" style="
                                width: 70px;
                                height: 70px;
                                background: linear-gradient(135deg, #ff6b8b 0%, #ff8e53 100%);
                                border-radius: 50%;
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto;
                            ">
                                <i class="bi {{ $service['icon'] }} text-white" style="font-size: 1.8rem;"></i>
                            </div>
                            <h5 class="fw-bold mb-2">{{ $service['name'] }}</h5>
                            <p class="text-muted mb-3">{{ $service['desc'] }}</p>
                            <h4 class="text-primary mb-0">Rp {{ number_format($service['price'], 0, ',', '.') }}</h4>
                        </div>
                        <div class="card-footer bg-transparent border-0 text-center pb-4">
                            @auth
                                <a href="{{ route('nailart.booking') }}" class="btn btn-sm btn-primary px-3">
                                    Book Now
                                </a>
                            @else
                                <a href="{{ route('register') }}" class="btn btn-sm btn-primary px-3">
                                    Book Now
                                </a>
                            @endauth
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5">
        <div class="container">
            <div class="card border-0 shadow-lg overflow-hidden">
                <div class="row g-0">
                    <div class="col-lg-6 bg-gradient-primary text-white p-5 d-flex align-items-center">
                        <div>
                            <h2 class="display-6 fw-bold mb-4">Ready for Beautiful Nails?</h2>
                            <p class="mb-4">Join thousands of satisfied customers who trust us with their nail care.</p>
                            @auth
                                <a href="{{ route('nailart.booking') }}" class="btn btn-light btn-lg">
                                    <i class="bi bi-calendar-plus me-2"></i> Book Appointment
                                </a>
                            @else
                                <a href="{{ route('register') }}" class="btn btn-light btn-lg">
                                    <i class="bi bi-person-plus me-2"></i> Sign Up Free
                                </a>
                            @endauth
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <img src="https://images.unsplash.com/photo-1574098529590-3439889340c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                             class="img-fluid h-100" 
                             alt="Happy Customer"
                             style="object-fit: cover;">
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
    .hero-section {
        background: linear-gradient(135deg, #fdf2f8 0%, #fff7ed 100%);
        border-radius: 20px;
    }
    
    .text-gradient {
        background: linear-gradient(135deg, #ff6b8b 0%, #ff8e53 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .bg-gradient-primary {
        background: linear-gradient(135deg, #ff6b8b 0%, #ff8e53 100%) !important;
    }
</style>
@endsection
