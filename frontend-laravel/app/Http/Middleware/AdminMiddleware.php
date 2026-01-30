<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // contoh sederhana, bisa kamu kembangkan
        if (!auth()->check()) {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
