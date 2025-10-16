# Use Node.js to build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Use Python to serve the app
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies including nginx, gunicorn, and other required packages
RUN apt-get update && apt-get install -y \
    gcc \
    nginx \
    curl \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy the built React app from the build stage
COPY --from=build /app/dist ./dist

# Copy Flask app and lab modules
COPY app.py .
COPY labs/ ./labs/

# Copy nginx configuration
COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy entrypoint and flags scripts
COPY etc/entrypoint.sh /etc/entrypoint.sh
COPY etc/flags.sh /etc/flags.sh

# Make scripts executable
RUN chmod +x /etc/entrypoint.sh /etc/flags.sh

# Create necessary directories
RUN mkdir -p /run/flask /var/log/gunicorn

# Expose ports
EXPOSE 80 5000

# Use the entrypoint script
CMD ["/etc/entrypoint.sh"] 