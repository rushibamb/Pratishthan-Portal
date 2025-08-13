#!/bin/bash

# Build script for Ganpati Mandal Trust Website
echo "🚀 Starting build process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Check if terser is available
if npm list terser > /dev/null 2>&1; then
    echo "✅ Terser found, using terser minification"
    # Update vite config to use terser
    sed -i 's/minify: "esbuild"/minify: "terser"/' vite.config.js
else
    echo "⚠️  Terser not found, using esbuild minification"
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check build status
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: dist/"
    
    # Show build stats
    echo "📊 Build statistics:"
    du -sh dist/
    echo "📁 Files created:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi
