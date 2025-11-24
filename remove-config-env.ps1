# PowerShell script to remove config.env files from Git tracking
# This keeps the files on your disk but removes them from Git

Write-Host "Removing config.env files from Git tracking..." -ForegroundColor Yellow

# Navigate to project root
Set-Location $PSScriptRoot

# Remove config.env files from Git tracking (keeps local files)
git rm --cached shopping_app/services/user-service/config.env 2>$null
git rm --cached shopping_app/services/product-service/config.env 2>$null
git rm --cached shopping_app/services/cart-service/config.env 2>$null
git rm --cached shopping_app/services/order-service/config.env 2>$null
git rm --cached shopping_app/services/payment-service/config.env 2>$null
git rm --cached shopping_app/services/inventory-service/config.env 2>$null

Write-Host "`nConfig.env files removed from Git tracking!" -ForegroundColor Green
Write-Host "Files are still on your disk, but Git will ignore them now." -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Review changes: git status" -ForegroundColor White
Write-Host "2. Commit the removal: git commit -m 'Remove config.env files from tracking'" -ForegroundColor White
Write-Host "3. Push to GitHub: git push" -ForegroundColor White

