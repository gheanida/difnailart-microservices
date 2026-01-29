public function register(Request $request)
{
    // ✅ HAPUS validasi yang butuh database
    // SALAH: $request->validate([
    //     'name' => 'required|string|max:255',
    //     'email' => 'required|email|unique:users,email', // ← Ini butuh database
    //     'password' => 'required|min:6|confirmed',
    // ]);
    
    // ✅ GUNAKAN validasi sederhana tanpa database
    
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'password' => 'required|min:6',
        'password_confirmation' => 'required|same:password',
    ]);

    $response = $this->userService->register([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password,
        'password_confirmation' => $request->password_confirmation
    ]);

    if ($response && isset($response['token'])) {
        session(['api_token' => $response['token']]);
        session(['user' => $response['user'] ?? null]);
        
        return redirect('/');
    }

    return back()->withErrors([
        'email' => 'Registration failed. Please try again.'
    ]);
}