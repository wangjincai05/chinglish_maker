$outputPath = Join-Path $PSScriptRoot "vercel-login-output.txt"
Set-Location (Join-Path $PSScriptRoot "chinglish-generator")
npx vercel login *>"$outputPath"
