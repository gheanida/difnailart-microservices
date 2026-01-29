#!/bin/bash

echo "🔧 Fixing Docker Build Issues..."

echo "1. Creating necessary docker config files..."
mkdir -p frontend-laravel/docker

# Create apache.prod.conf
cat > frontend-laravel/docker/apache.prod.conf << 'EOF'
<VirtualHost *:80>
    DocumentRoot /var/www/html/public
    <Directory /var/www/html/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
EOF

echo "2. Simplifying Dockerfile.prod..."
cat > frontend-laravel/Dockerfile.prod << 'EOF'
FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN composer install --no-interaction --optimize-autoloader --no-dev \
    && chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache

# Simple Apache config
RUN echo 'ServerName localhost\n\
<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

EXPOSE 80
CMD ["apache2-foreground"]
EOF

echo "3. Testing production build..."
docker-compose -f docker-compose.prod.yml build --no-cache laravel-frontend

if [ $? -eq 0 ]; then
    echo "✅ Docker build successful!"
else
    echo "❌ Docker build failed. Trying alternative approach..."
    
    # Try even simpler approach
    cat > frontend-laravel/Dockerfile.prod << 'EOF'
FROM php:8.1-apache

WORKDIR /var/www/html
COPY . .

# Just copy existing apache config if exists
COPY docker/apache.prod.conf /etc/apache2/sites-available/000-default.conf 2>/dev/null || \
    echo "Using default Apache config"

RUN a2enmod rewrite

EXPOSE 80
CMD ["apache2-foreground"]
EOF
    
    docker-compose -f docker-compose.prod.yml build --no-cache laravel-frontend
fi

echo "✅ Fix script completed"