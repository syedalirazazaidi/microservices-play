const fs = require('fs');
const path = require('path');

const services = [
  'user-service',
  'product-service',
  'cart-service',
  'order-service',
  'payment-service',
  'inventory-service'
];

console.log('Setting up environment files...\n');

services.forEach(service => {
  const configPath = path.join(__dirname, 'services', service, 'config.env');
  const envPath = path.join(__dirname, 'services', service, '.env');
  
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, envPath);
    console.log(`✓ Created .env for ${service}`);
  } else {
    console.log(`✗ Config file not found for ${service}`);
  }
});

console.log('\nSetup complete!');
console.log('Next steps:');
console.log('1. Start MongoDB: docker-compose up -d');
console.log('2. Install dependencies: npm run install-all');
console.log('3. Start services: npm run start:all');

