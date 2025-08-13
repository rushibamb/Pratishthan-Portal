#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Vercel build process...');

try {
  if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
    throw new Error('package.json not found. Please run this script from the frontend directory.');
  }

  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true, force: true });
  if (fs.existsSync('node_modules/.vite')) fs.rmSync('node_modules/.vite', { recursive: true, force: true });

  console.log('📦 Installing dependencies...');
  execSync('npm ci --prefer-offline --no-audit', { stdio: 'inherit' });

  let useTerser = false;
  try {
    await import('terser');
    useTerser = true;
    console.log('✅ Terser found, will use for minification');
  } catch {
    console.log('⚠️  Terser not found, using esbuild minification');
  }

  if (useTerser) {
    const viteConfigPath = 'vite.config.js';
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

    viteConfig = viteConfig.replace(/minify: ['"]esbuild['"]/, 'minify: "terser"');

    if (!viteConfig.includes('terserOptions')) {
      viteConfig = viteConfig.replace(
        /(minify: "terser"),/,
        `$1,
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    }`
      );
    }

    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log('✅ Updated vite config to use terser');
  }

  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  if (!fs.existsSync('dist')) {
    throw new Error('Build failed: dist directory not created');
  }

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
