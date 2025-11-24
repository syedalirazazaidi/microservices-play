# Shopping App Microservices

A microservices-based e-commerce application built with Node.js, Express, and MongoDB.

## Architecture

This application consists of the following microservices:

1. **User Service** (Port 3001) - User authentication and management
2. **Product Service** (Port 3002) - Product catalog management
3. **Cart Service** (Port 3003) - Shopping cart operations
4. **Order Service** (Port 3004) - Order processing
5. **Payment Service** (Port 3005) - Payment processing
6. **Inventory Service** (Port 3006) - Stock management
7. **API Gateway** (Port 3000) - Routes requests to appropriate services

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

## Setup

1. Setup environment files:
```bash
npm run setup
```
This will copy `config.env` files to `.env` files for each service.

2. Install dependencies for all services:
```bash
npm run install-all
```

3. Configure MongoDB Atlas:
   - This project uses **MongoDB Atlas (Cloud)** for database
   - Connection strings are configured in `config.env` files
   - No local MongoDB setup required
   - Ensure your IP is whitelisted in Atlas Network Access

4. Start all services:
```bash
npm run start:all
```

Or start individual services:
```bash
npm run start:user
npm run start:product
npm run start:cart
npm run start:order
npm run start:payment
npm run start:inventory
npm run start:gateway
```

## API Endpoints

### User Service (http://localhost:3001)
- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user

### Product Service (http://localhost:3002)
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create product (admin)
- PUT /api/products/:id - Update product (admin)
- DELETE /api/products/:id - Delete product (admin)

### Cart Service (http://localhost:3003)
- GET /api/cart/:userId - Get user's cart
- POST /api/cart/:userId/items - Add item to cart
- PUT /api/cart/:userId/items/:itemId - Update cart item
- DELETE /api/cart/:userId/items/:itemId - Remove item from cart
- DELETE /api/cart/:userId - Clear cart

### Order Service (http://localhost:3004)
- POST /api/orders - Create order
- GET /api/orders/:id - Get order by ID
- GET /api/orders/user/:userId - Get user's orders
- PUT /api/orders/:id/status - Update order status

### Payment Service (http://localhost:3005)
- POST /api/payments - Process payment
- GET /api/payments/:id - Get payment by ID
- GET /api/payments/order/:orderId - Get payment by order ID

### Inventory Service (http://localhost:3006)
- GET /api/inventory/:productId - Get product inventory
- POST /api/inventory - Add inventory
- PUT /api/inventory/:productId - Update inventory
- POST /api/inventory/reserve - Reserve inventory
- POST /api/inventory/release - Release inventory

### API Gateway (http://localhost:3000)
Routes all requests to appropriate microservices with prefix `/api`

## Database

All services use **MongoDB Atlas (Cloud)** with **separate databases** for data isolation:
- **MongoDB Atlas Cluster**: mongodb+srv://shopping.migh586.mongodb.net
- **User Service Database**: `userdb`
- **Product Service Database**: `productdb`
- **Cart Service Database**: `cartdb`
- **Order Service Database**: `orderdb`
- **Payment Service Database**: `paymentdb`
- **Inventory Service Database**: `inventorydb`

### Why MongoDB Atlas?

This approach provides:
- ✅ **Cloud-managed MongoDB** - No local setup required
- ✅ **High Availability** - Automatic failover and backups
- ✅ **Scalability** - Easy to scale up/down as needed
- ✅ **Separate databases per service** - Data isolation and security
- ✅ **Global Distribution** - Multi-region support for future
- ✅ **Monitoring & Alerts** - Built-in performance monitoring
- ✅ **Production-ready** - Better for deployment and maintenance

### Configuration

- Connection strings are stored in each service's `config.env` file
- Uses `mongodb+srv://` protocol for Atlas connection
- Databases are created automatically on first connection
- All services share the same Atlas cluster but have isolated databases

### Setup MongoDB Atlas

1. Create/access your MongoDB Atlas account
2. Create a cluster (or use existing)
3. Create a database user with appropriate permissions
4. Whitelist your IP address in Network Access
5. Get your connection string and update `config.env` files
6. Each service uses its own database name in the connection string

See `MONGODB_ATLAS_GUIDE.md` for detailed configuration guide.

## Development

Each service is independent and can be developed, tested, and deployed separately.

