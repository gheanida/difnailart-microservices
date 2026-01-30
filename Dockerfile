# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy semua file source code
COPY . .

# Expose port aplikasi (sesuaikan dengan port aplikasi Anda)
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]