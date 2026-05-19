Set-Location "H:\data\wantasy\chinglish-generator"
$output = "H:\data\wantasy\vercel-login-output.txt"
npx vercel login 2>&1 | Out-File $output -Encoding UTF8
