# Environment Variables Setup Guide

## 🔒 Security: Credentials are NOT in Git

All `config.env` files are now safe to commit to Git - they don't contain actual passwords!

## 📝 How It Works

The application builds MongoDB connection strings from **separate environment variables** instead of hardcoded credentials.

## 🚀 Setup Instructions

### Option 1: Create .env files (Recommended)

Create a `.env` file in each service directory with your actual credentials:

#### user-service/.env
```env
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# MongoDB Atlas Credentials
MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=userdb
```

#### product-service/.env
```env
PORT=3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=productdb
```

#### cart-service/.env
```env
PORT=3003
PRODUCT_SERVICE_URL=http://localhost:3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=cartdb
```

#### order-service/.env
```env
PORT=3004
CART_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3001

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=orderdb
```

#### payment-service/.env
```env
PORT=3005
ORDER_SERVICE_URL=http://localhost:3004

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=paymentdb
```

#### inventory-service/.env
```env
PORT=3006

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=inventorydb
```

### Option 2: System Environment Variables

Set these in your system environment:

**Windows (PowerShell):**
```powershell
$env:MONGODB_USERNAME="akuraza6_db_user"
$env:MONGODB_PASSWORD="zRWrRNGp9wLHkqHl"
$env:MONGODB_CLUSTER="shopping.migh586.mongodb.net"
```

**Windows (Command Prompt):**
```cmd
set MONGODB_USERNAME=akuraza6_db_user
set MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
set MONGODB_CLUSTER=shopping.migh586.mongodb.net
```

**Linux/Mac:**
```bash
export MONGODB_USERNAME="akuraza6_db_user"
export MONGODB_PASSWORD="zRWrRNGp9wLHkqHl"
export MONGODB_CLUSTER="shopping.migh586.mongodb.net"
```

### Option 3: Full Connection String

You can also set the full connection string directly:

```env
MONGODB_URI=mongodb+srv://akuraza6_db_user:zRWrRNGp9wLHkqHl@shopping.migh586.mongodb.net/userdb?retryWrites=true&w=majority
```

## ✅ Verification

After setting up, test each service:

```bash
npm run start:user
npm run start:product
# etc.
```

## 🔐 Security Notes

- ✅ `.env` files are in `.gitignore` - they won't be committed
- ✅ `config.env` files are safe to commit (no real credentials)
- ✅ Credentials are only in `.env` files (local) or system environment
- ✅ Each service can have its own database name

## 📚 How the Code Works

The `utils/dbConfig.js` file in each service:
1. Checks if `MONGODB_URI` is set (full connection string)
2. If not, builds connection string from separate variables:
   - `MONGODB_USERNAME`
   - `MONGODB_PASSWORD`
   - `MONGODB_CLUSTER`
   - `MONGODB_DATABASE` (or uses default per service)

This way, `config.env` files can be safely committed to Git!

