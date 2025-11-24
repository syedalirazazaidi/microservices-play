#!/bin/bash
# Script to remove config.env files from Git tracking
# This keeps the files on your disk but removes them from Git

echo "Removing config.env files from Git tracking..."

# Remove config.env files from Git tracking (keeps local files)
git rm --cached shopping_app/services/user-service/config.env
git rm --cached shopping_app/services/product-service/config.env
git rm --cached shopping_app/services/cart-service/config.env
git rm --cached shopping_app/services/order-service/config.env
git rm --cached shopping_app/services/payment-service/config.env
git rm --cached shopping_app/services/inventory-service/config.env

echo ""
echo "Config.env files removed from Git tracking!"
echo "Files are still on your disk, but Git will ignore them now."
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Commit the removal: git commit -m 'Remove config.env files from tracking'"
echo "3. Push to GitHub: git push"

