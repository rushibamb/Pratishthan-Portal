#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Vercel build process...');

try {
  // Ensure script is in correct directory
  if (!fs.existsSync(path.join(__dirname, 'package.json'))) {
    throw new Error('package.json not found. Please run from the frontend directory.');
  }

  console.log('🧹 Cleaning old build artifacts...');
  if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true, force: true });
  if (fs.existsSync('node_modules/.vite')) fs.rmSync('node_modules/.vite', { recursive: true, force: true });

  // No npm install here – Vercel already installs dependencies before running build scripts

  console.log('🔍 Checking for Terser...');
  let useTerser = false;
  try {
    await import('terser');
    useTerser = true;
    console.log('✅ Terser available, using it for minification.');
  } catch {
    console.log('⚠️ Terser not found, using default esbuild minification.');
  }

  // Optional: tweak vite.config.js if Terser is available
  if (useTerser && fs.existsSync('vite.config.js')) {
    let viteConfig = fs.readFileSync('vite.config.js', 'utf8');

    // Replace minify: 'esbuild' with minify: 'terser'
    viteConfig = viteConfig.replace(/minify:\s*['"]esbuild['"]/, 'minify: "terser"');

    // Add terserOptions if not already there
    if (!viteConfig.includes('terserOptions')) {
      viteConfig = viteConfig.replace(
        /(minify:\s*"terser",?)/,
        `$1
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    },`
      );
    }

    fs.writeFileSync('vite.config.js', viteConfig);
    console.log('✅ Updated vite.config.js to use Terser.');
  }

  console.log('🏗 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  if (!fs.existsSync('dist')) {
    throw new Error('Build failed: dist directory not created.');
  }

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
