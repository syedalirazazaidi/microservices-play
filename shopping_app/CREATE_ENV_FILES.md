# Where to Create .env Files

## 📍 Location

Create `.env` files in each service directory:

```
shopping_app/
├── services/
│   ├── user-service/
│   │   └── .env          ← Create here
│   ├── product-service/
│   │   └── .env          ← Create here
│   ├── cart-service/
│   │   └── .env          ← Create here
│   ├── order-service/
│   │   └── .env          ← Create here
│   ├── payment-service/
│   │   └── .env          ← Create here
│   └── inventory-service/
│       └── .env          ← Create here
```

## 📝 File Contents

### 1. user-service/.env
Create file at: `shopping_app/services/user-service/.env`

```env
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=userdb
```

### 2. product-service/.env
Create file at: `shopping_app/services/product-service/.env`

```env
PORT=3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=productdb
```

### 3. cart-service/.env
Create file at: `shopping_app/services/cart-service/.env`

```env
PORT=3003
PRODUCT_SERVICE_URL=http://localhost:3002

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=cartdb
```

### 4. order-service/.env
Create file at: `shopping_app/services/order-service/.env`

```env
PORT=3004
CART_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3001

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=orderdb
```

### 5. payment-service/.env
Create file at: `shopping_app/services/payment-service/.env`

```env
PORT=3005
ORDER_SERVICE_URL=http://localhost:3004

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=paymentdb
```

### 6. inventory-service/.env
Create file at: `shopping_app/services/inventory-service/.env`

```env
PORT=3006

MONGODB_USERNAME=akuraza6_db_user
MONGODB_PASSWORD=zRWrRNGp9wLHkqHl
MONGODB_CLUSTER=shopping.migh586.mongodb.net
MONGODB_DATABASE=inventorydb
```

## 🚀 Quick Steps

1. Navigate to each service directory
2. Create a new file named `.env` (with the dot at the beginning)
3. Copy the content from above
4. Save the file

## ⚠️ Important Notes

- `.env` files are in `.gitignore` - they won't be committed to Git
- These files contain your actual credentials
- Don't share these files or commit them to Git
- The `config.env` files are safe to commit (they only have placeholders)

## ✅ Verify

After creating the files, test a service:

```bash
cd shopping_app/services/user-service
npm start
```

If it connects to MongoDB successfully, you're all set!

