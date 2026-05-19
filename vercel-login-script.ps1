$outputPath = "H:\data\wantasy\vercel-login-output.txt"
Set-Location "H:\data\wantasy\chinglish-generator"
npx vercel login *>"$outputPath"
