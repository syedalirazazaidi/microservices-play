# PowerShell script to create .env files for all services
# Run this from the shopping_app directory

$basePath = $PSScriptRoot

Write-Host "Creating .env files for all services..." -ForegroundColor Cyan

# User Service
$userEnv = @"
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=userdb
"@
$userEnv | Out-File -FilePath "$basePath\services\user-service\.env" -Encoding utf8
Write-Host "✓ Created user-service/.env" -ForegroundColor Green

# Product Service
$productEnv = @"
PORT=3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=productdb
"@
$productEnv | Out-File -FilePath "$basePath\services\product-service\.env" -Encoding utf8
Write-Host "✓ Created product-service/.env" -ForegroundColor Green

# Cart Service
$cartEnv = @"
PORT=3003
PRODUCT_SERVICE_URL=http://localhost:3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=cartdb
"@
$cartEnv | Out-File -FilePath "$basePath\services\cart-service\.env" -Encoding utf8
Write-Host "✓ Created cart-service/.env" -ForegroundColor Green

# Order Service
$orderEnv = @"
PORT=3004
CART_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3001

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=orderdb
"@
$orderEnv | Out-File -FilePath "$basePath\services\order-service\.env" -Encoding utf8
Write-Host "✓ Created order-service/.env" -ForegroundColor Green

# Payment Service
$paymentEnv = @"
PORT=3005
ORDER_SERVICE_URL=http://localhost:3004

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=paymentdb
"@
$paymentEnv | Out-File -FilePath "$basePath\services\payment-service\.env" -Encoding utf8
Write-Host "✓ Created payment-service/.env" -ForegroundColor Green

# Inventory Service
$inventoryEnv = @"
PORT=3006

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=inventorydb
"@
$inventoryEnv | Out-File -FilePath "$basePath\services\inventory-service\.env" -Encoding utf8
Write-Host "✓ Created inventory-service/.env" -ForegroundColor Green

Write-Host "`n✅ All .env files created successfully!" -ForegroundColor Green
Write-Host "`nNote: These files are in .gitignore and won't be committed to Git." -ForegroundColor Yellow
Write-Host "You can now safely commit config.env files to GitHub." -ForegroundColor Cyan

