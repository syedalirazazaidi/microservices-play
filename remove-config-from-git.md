# Remove config.env files from Git tracking

## Steps to remove config.env files from GitHub

Since `config.env` files were already committed to Git, you need to remove them from tracking while keeping them locally.

### Step 1: Remove from Git tracking (keeps local files)

Run these commands in your terminal:

```bash
cd E:\microservices\microservices-play

# Remove all config.env files from Git tracking
git rm --cached shopping_app/services/user-service/config.env
git rm --cached shopping_app/services/product-service/config.env
git rm --cached shopping_app/services/cart-service/config.env
git rm --cached shopping_app/services/order-service/config.env
git rm --cached shopping_app/services/payment-service/config.env
git rm --cached shopping_app/services/inventory-service/config.env

# Or remove all at once (if they're all in the same pattern)
git rm --cached shopping_app/services/*/config.env
```

### Step 2: Commit the removal

```bash
git commit -m "Remove config.env files from tracking - contains sensitive MongoDB credentials"
```

### Step 3: Verify files are still on disk

```bash
# Check that files still exist locally
ls shopping_app/services/*/config.env
```

### Step 4: Push to GitHub

```bash
git push
```

## What this does:

- ✅ Removes `config.env` from Git tracking
- ✅ Keeps files on your local disk (they won't be deleted)
- ✅ Files are now ignored by `.gitignore`
- ✅ Future changes to `config.env` won't be tracked

## Alternative: Remove all at once

If you want to remove all config.env files in one command:

```bash
cd E:\microservices\microservices-play
git rm --cached shopping_app/services/**/config.env
git commit -m "Remove config.env files from tracking"
git push
```

## Verify it worked

After pushing, check GitHub - the `config.env` files should no longer appear in the repository.

