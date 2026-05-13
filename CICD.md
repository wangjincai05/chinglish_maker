# CI/CD Pipeline for Chinglish Generator

## Overview
This project has a fully automated CI/CD pipeline for building and deploying the Chinglish Generator application.

## 📦 Local Deployment

### Option 1: Manual Deployment
Run the deployment script to build and deploy:
```bash
./deploy.sh
```

### Option 2: NPM Script
From the `chinglish-generator` directory:
```bash
npm run deploy
```

### Option 3: Git Hooks (Automatic)
Git hooks are configured automatically!
- **pre-commit: Automatically builds before every commit
- **post-merge: Automatically builds after pulling code

## 🌐 GitHub Actions

The CI/CD pipeline uses GitHub Actions for automated builds.

### Setup
1. Push your code to GitHub
2. The workflow will automatically build on:
   - Push to `main` or `master` branches
   - Pull requests
   - Manual triggers (via GitHub UI

### Viewing Build Artifacts
After a successful build, artifacts are uploaded to the Actions tab as `build-artifact`.

## 📁 Build Output
Production builds are output to the `dist/` directory at the project root.

## 🚀 Previewing the Build
To preview the production build:
```bash
cd chinglish-generator
npm run preview
```
This will start a preview server at http://localhost:4173/.

## ⚙️ Configuration

### Disabling Git Hooks
If you want to temporarily disable git hooks:
```bash
git config core.hooksPath .git/hooks
```

### Re-enabling Git Hooks
```bash
git config core.hooksPath .githooks
```

### Skipping Hooks for Single Commit
```bash
git commit --no-verify
```
