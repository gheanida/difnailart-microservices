const express = require('express');
const app = express();

// Coba port secara berurutan
const PORT_OPTIONS = [3000, 3001, 3002, 3003, 3004, 3005, 8080, 8000, 9000];
let selectedPort = null;

// Fungsi untuk start server dengan port tertentu
function startServer(portIndex = 0) {
  if (portIndex >= PORT_OPTIONS.length) {
    console.error('❌ Semua port tidak available!');
    process.exit(1);
  }
  
  const port = PORT_OPTIONS[portIndex];
  const server = app.listen(port, () => {
    selectedPort = port;
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`🔗 Login endpoint: http://localhost:${port}/login`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} sedang digunakan, mencoba port berikutnya...`);
      startServer(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Routes
app.get('/login', (req, res) => {
  res.json({ 
    success: true,
    message: 'Login endpoint is working!',
    service: 'Node.js Microservice',
    port: selectedPort,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'difnailart-api',
    port: selectedPort
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Difnailart Microservices API',
    status: 'running',
    port: selectedPort,
    endpoints: [
      'GET /login',
      'GET /health', 
      'GET /'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: ['/login', '/health', '/']
  });
});

console.log('🚀 Starting server...');
startServer();
