<template>
    <div>
      <div class="hero-section">
        <h1>Welcome to DifNailart Studio</h1>
        <p>Premium nail art services with professional artists</p>
        <router-link to="/products" class="btn btn-primary">
          Browse Services
        </router-link>
      </div>
      
      <div class="features mt-5">
        <h2>Why Choose Us</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="feature-card">
              <h5>Professional Artists</h5>
              <p>Certified and experienced nail technicians</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <h5>Hygienic Tools</h5>
              <p>Sterilized equipment for your safety</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card">
              <h5>Premium Products</h5>
              <p>High-quality nail polishes and materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  .hero-section {
    text-align: center;
    padding: 4rem 1rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    margin-bottom: 2rem;
  }
  .feature-card {
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: 100%;
  }
  </style>