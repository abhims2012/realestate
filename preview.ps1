# Simple Local HTTP Server for realestate.com.au Clone
# This script hosts your project locally to bypass browser CORS restrictions on ES modules.

$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  Server started successfully!" -ForegroundColor Green
    Write-Host "  Open your browser and navigate to: http://localhost:$port/" -ForegroundColor Cyan
    Write-Host "  Press Ctrl+C in this terminal to stop the server." -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Green

    $baseDir = Get-Location

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }
        
        # Resolve clean file path
        $cleanPath = $urlPath.Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        if ($cleanPath.StartsWith([System.IO.Path]::DirectorySeparatorChar)) {
            $cleanPath = $cleanPath.Substring(1)
        }
        
        $filePath = Join-Path $baseDir $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            # Determine content type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }

            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                Write-Host "Error serving $urlPath : $_" -ForegroundColor Red
            }
        } else {
            $response.StatusCode = 404
            $errHtml = "<h1>404 Not Found</h1><p>The file $urlPath could not be found.</p>"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errHtml)
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Failed to start server: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
