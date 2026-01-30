# Dockerfile
FROM node:18-alpine

WORKDIR /app

# 1. Copy package.json jika ada
COPY package*.json ./

# 2. Cek dan install
RUN if [ -f "package.json" ]; then \
      npm install; \
    else \
      echo "ERROR: No package.json found!" && \
      echo "Creating minimal package.json..." && \
      echo '{"name":"difnailart","version":"1.0.0","scripts":{"start":"echo \\"App running\\""}}' > package.json && \
      npm install; \
    fi

# 3. Copy aplikasi
COPY . .

# 4. Command untuk run
CMD ["npm", "start"]