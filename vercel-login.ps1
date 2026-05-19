Set-Location (Join-Path $PSScriptRoot "chinglish-generator")
$output = Join-Path $PSScriptRoot "vercel-login-output.txt"
npx vercel login 2>&1 | Out-File $output -Encoding UTF8
