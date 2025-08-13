# Build Troubleshooting Guide

## 🚨 Common Build Errors & Solutions

### 1. **Terser Not Found Error**
```
[vite:terser] terser not found. Since Vite v3, terser has become an optional dependency.
```

**Solution:**
- The build script automatically detects terser availability
- If terser is not available, it falls back to esbuild minification
- This is handled automatically by `vercel-build.js`

### 2. **Build Command Issues**
```
Error: Command "npm run build" exited with 1
```

**Solutions:**
- Use `npm run build:vercel` instead of `npm run build`
- The Vercel build script handles dependency installation and configuration
- Check that all dependencies are properly installed

### 3. **Dependency Installation Issues**
```
npm ERR! peer dependency conflicts
```

**Solutions:**
- The `.npmrc` file includes `legacy-peer-deps=true`
- Use `npm ci` instead of `npm install` for consistent builds
- Clear `node_modules` and reinstall if needed

## 🔧 Build Process

### Standard Build
```bash
npm run build
```

### Vercel-Optimized Build
```bash
npm run build:vercel
```

### Clean Build
```bash
npm run clean
npm run install:deps
npm run build
```

## 📁 Build Output

The build process creates:
- `dist/` - Production build files
- `dist/index.html` - Main HTML file
- `dist/assets/` - JavaScript, CSS, and other assets

## 🐛 Debugging Build Issues

### 1. **Check Dependencies**
```bash
npm ls --depth=0
```

### 2. **Verify Vite Configuration**
```bash
node -e "console.log(require('./vite.config.js'))"
```

### 3. **Check Build Scripts**
```bash
npm run
```

### 4. **Local Build Test**
```bash
npm run build:vercel
```

## 🚀 Vercel Deployment

### Automatic Deployment
- Push to main branch triggers automatic deployment
- Vercel uses `vercel.json` configuration
- Build command: `npm run build:vercel`
- Output directory: `dist`

### Manual Deployment
```bash
vercel --prod
```

## 📊 Performance Monitoring

### Build Metrics
- Build time: Usually 2-5 minutes
- Bundle size: Optimized with code splitting
- Cache headers: Configured for optimal performance

### Post-Deployment
- Monitor Core Web Vitals
- Check service worker registration
- Verify lazy loading functionality

## 🔄 Rollback Strategy

If build fails:
1. Check build logs for specific errors
2. Revert to previous working commit
3. Test build locally before pushing
4. Use `npm run clean` to clear build artifacts

## 📞 Support

For persistent build issues:
1. Check Vercel build logs
2. Verify all dependencies are compatible
3. Test build locally with `npm run build:vercel`
4. Check for environment-specific issues
