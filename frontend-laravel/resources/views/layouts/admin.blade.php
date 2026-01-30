@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link {{ Request::is('admin/nailart-bookings*') ? 'active' : '' }}" 
                           href="{{ route('admin.nailart.bookings') }}">
                            <i class="bi bi-calendar-check"></i>
                            Bookings Management
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-scissors"></i>
                            Services Management
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">@yield('page-title', 'Dashboard')</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    @yield('page-actions')
                </div>
            </div>
            
            @yield('admin-content')
        </main>
    </div>
</div>
@endsection
