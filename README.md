# Microservices Play

A microservices-based e-commerce application demonstrating best practices for building scalable, cloud-native applications.

## 🏗️ Architecture

This project implements a shopping app using microservices architecture with:
- **6 Microservices** (User, Product, Cart, Order, Payment, Inventory)
- **API Gateway** for centralized routing
- **MongoDB Atlas (Cloud)** for database storage
- **Service-to-service communication** via HTTP/REST

## 📁 Project Structure

```
microservices-play/
└── shopping_app/
    ├── services/          # Individual microservices
    ├── api-gateway/       # API Gateway service
    ├── docker-compose.yml # MongoDB setup (optional for local dev)
    └── README.md          # Detailed documentation
```

## 🚀 Quick Start

See the [shopping_app README](./shopping_app/README.md) for detailed setup instructions.

## 🗄️ Database

This project uses **MongoDB Atlas (Cloud)** for all database operations:
- Each microservice has its own isolated database
- Cloud-managed with automatic backups and scaling
- Production-ready configuration

## 📚 Documentation

- [Main README](./shopping_app/README.md) - Setup and API documentation
- [MongoDB Atlas Guide](./shopping_app/MONGODB_ATLAS_GUIDE.md) - Database configuration
- [Architecture Review](./shopping_app/REVIEW.md) - Code review and best practices

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Architecture**: Microservices with API Gateway
- **Communication**: HTTP/REST, Axios

## 📝 Notes

- All services use MongoDB Atlas for cloud-based database storage
- Each service maintains its own database for data isolation
- Configuration files use `config.env` which are copied to `.env` during setup