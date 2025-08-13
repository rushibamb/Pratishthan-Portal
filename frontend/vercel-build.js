#!/usr/bin/env node

/**
 * Vercel Build Script for Ganpati Mandal Trust Website
 * This script ensures reliable builds on Vercel's infrastructure
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname and __filename equivalents in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Vercel build process...');

try {
  // Check if we're in the right directory
  if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
    throw new Error('package.json not found. Please run this script from the frontend directory.');
  }

  // Clean previous build artifacts
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  if (fs.existsSync('node_modules/.vite')) {
    fs.rmSync('node_modules/.vite', { recursive: true, force: true });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci --prefer-offline --no-audit', { stdio: 'inherit' });

  // Check terser availability
  let useTerser = false;
  try {
    await import('terser');
    useTerser = true;
    console.log('✅ Terser found, will use for minification');
  } catch (e) {
    console.log('⚠️  Terser not found, using esbuild minification');
  }

  // Update vite config if terser is available
  if (useTerser) {
    const viteConfigPath = 'vite.config.js';
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

    // Replace esbuild with terser
    viteConfig = viteConfig.replace(
      /minify: ['"]esbuild['"]/,
      'minify: "terser"'
    );

    // Add terser options
    if (!viteConfig.includes('terserOptions')) {
      viteConfig = viteConfig.replace(
        /(minify: "terser"),/,
        `$1,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }`
      );
    }

    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log('✅ Updated vite config to use terser');
  }

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify build output
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed: dist directory not created');
  }

  const distStats = fs.statSync('dist');
  console.log(`✅ Build completed successfully!`);
  console.log(`📁 Build output: dist/ (${Math.round(distStats.size / 1024)} KB)`);

  // List build files
  const files = fs.readdirSync('dist');
  console.log(`📄 Files created: ${files.length} files`);

  // Check for critical files
  const criticalFiles = ['index.html', 'assets'];
  criticalFiles.forEach(file => {
    if (files.includes(file)) {
      console.log(`✅ ${file} found`);
    } else {
      console.log(`⚠️  ${file} missing`);
    }
  });

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
