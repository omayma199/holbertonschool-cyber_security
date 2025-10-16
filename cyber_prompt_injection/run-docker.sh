#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t ai-security-hub .

# Run the container with correct port mapping
echo "Running container..."
echo "Access the application at: http://localhost:80"
echo "Or use: http://localhost:5000 (if you prefer port 5000)"
echo ""
echo "To run with port 80:"
echo "docker run -p 80:80 ai-security-hub"
echo ""
echo "To run with port 5000:"
echo "docker run -p 5000:80 ai-security-hub"
echo ""
echo "To run with both ports:"
echo "docker run -p 80:80 -p 5000:5000 ai-security-hub"
echo ""

# Run with port 80 by default
docker run -p 80:80 ai-security-hub 