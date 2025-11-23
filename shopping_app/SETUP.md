# Setup Guide

## Step 1: Install Dependencies

Run the following command to install dependencies for all services:

```bash
npm run install-all
```

Or install manually for each service:

```bash
cd services/user-service && npm install
cd ../product-service && npm install
cd ../cart-service && npm install
cd ../order-service && npm install
cd ../payment-service && npm install
cd ../inventory-service && npm install
cd ../../api-gateway && npm install
```

## Step 2: Create Environment Files

Create `.env` files in each service directory with the following content:

### services/user-service/.env
```
PORT=3001
MONGODB_URI=mongodb://admin:password123@localhost:27017/userdb?authSource=admin
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

### services/product-service/.env
```
PORT=3002
MONGODB_URI=mongodb://admin:password123@localhost:27018/productdb?authSource=admin
```

### services/cart-service/.env
```
PORT=3003
MONGODB_URI=mongodb://admin:password123@localhost:27019/cartdb?authSource=admin
PRODUCT_SERVICE_URL=http://localhost:3002
```

### services/order-service/.env
```
PORT=3004
MONGODB_URI=mongodb://admin:password123@localhost:27020/orderdb?authSource=admin
CART_SERVICE_URL=http://localhost:3003
USER_SERVICE_URL=http://localhost:3001
```

### services/payment-service/.env
```
PORT=3005
MONGODB_URI=mongodb://admin:password123@localhost:27021/paymentdb?authSource=admin
ORDER_SERVICE_URL=http://localhost:3004
```

### services/inventory-service/.env
```
PORT=3006
MONGODB_URI=mongodb://admin:password123@localhost:27022/inventorydb?authSource=admin
```

### api-gateway/.env (optional)
```
PORT=3000
USER_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
CART_SERVICE_URL=http://localhost:3003
ORDER_SERVICE_URL=http://localhost:3004
PAYMENT_SERVICE_URL=http://localhost:3005
INVENTORY_SERVICE_URL=http://localhost:3006
```

## Step 3: Start MongoDB Containers

```bash
docker-compose up -d
```

This will start 6 MongoDB instances, one for each service.

## Step 4: Start All Services

### Option 1: Start all services at once
```bash
npm run start:all
```

### Option 2: Start services individually in separate terminals
```bash
npm run start:user
npm run start:product
npm run start:cart
npm run start:order
npm run start:payment
npm run start:inventory
npm run start:gateway
```

## Step 5: Test the Services

### Test API Gateway
```bash
curl http://localhost:3000/health
```

### Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "brand": "TechBrand"
  }'
```

## Troubleshooting

1. **MongoDB Connection Issues**: Make sure Docker containers are running with `docker ps`
2. **Port Already in Use**: Change the PORT in the .env file for that service
3. **Service Not Found**: Ensure all services are running before making requests

