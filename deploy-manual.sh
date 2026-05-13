#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Build the project
cd /workspace/chinglish-generator
echo "🔨 Building project..."
npm run build

# Deploy to GitHub Pages
cd /workspace/dist
echo "📦 Deploying to wangjincai05/view..."

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git remote add origin https://github.com/wangjincai05/view.git
fi

git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push -f origin HEAD:gh-pages

echo "✅ Deployment complete!"
echo "🌐 Visit: https://wangjincai05.github.io/view/"