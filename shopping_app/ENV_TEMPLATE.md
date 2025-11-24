# Environment Variables Template

## Quick Setup

Copy these values into `.env` files in each service directory. The `.env` files are gitignored and won't be committed.

### For user-service/.env:
```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=userdb
```

### For product-service/.env:
```
PORT=3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=productdb
```

### For cart-service/.env:
```
PORT=3003
PRODUCT_SERVICE_URL=http://localhost:3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=cartdb
```

### For order-service/.env:
```
PORT=3004
CART_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3001

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=orderdb
```

### For payment-service/.env:
```
PORT=3005
ORDER_SERVICE_URL=http://localhost:3004

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=paymentdb
```

### For inventory-service/.env:
```
PORT=3006

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=inventorydb
```

## What Changed?

✅ **config.env files** - Now contain only placeholders (safe to commit to Git)
✅ **.env files** - Contain actual credentials (gitignored, NOT committed)
✅ **Code** - Builds connection string from environment variables

## Next Steps

1. Create `.env` files in each service directory with the values above
2. The `config.env` files are now safe to commit (no real passwords)
3. Push to GitHub - credentials won't be exposed!

