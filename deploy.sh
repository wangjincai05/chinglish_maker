#!/bin/bash

set -e

echo "🚀 Starting deployment process..."

# Change to project directory
cd "$(dirname "$0")/chinglish-generator" || exit 1

echo "📦 Installing dependencies..."
npm ci

echo "🔍 Type checking..."
npm run check

echo "🔨 Building project..."
npm run build

echo "✅ Build complete!"
echo "📁 Output directory: $(pwd)/../dist"

echo -e "\n🎉 Deployment successful!\n"
echo "You can preview the build with:"
echo "  cd chinglish-generator && npm run preview"
echo -e "\nOr serve static files from the dist directory"
