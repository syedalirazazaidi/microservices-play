/**
 * Build MongoDB connection string from environment variables
 * This allows keeping config.env in Git without exposing credentials
 */
const buildMongoUri = (defaultDatabase) => {
  // If MONGODB_URI is directly provided and doesn't contain placeholders, use it
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('${') && !process.env.MONGODB_URI.includes('username')) {
    return process.env.MONGODB_URI;
  }
  
  // Otherwise, build from individual components
  const username = process.env.MONGODB_USERNAME || process.env.MONGO_USERNAME;
  const password = process.env.MONGODB_PASSWORD || process.env.MONGO_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER || process.env.MONGO_CLUSTER;
  const database = process.env.MONGODB_DATABASE || process.env.MONGO_DATABASE || defaultDatabase;
  
  if (!username || !password || !cluster) {
    throw new Error(
      'MongoDB credentials missing. Set MONGODB_USERNAME, MONGODB_PASSWORD, and MONGODB_CLUSTER environment variables.\n' +
      'You can set them in a .env file (not committed to Git) or as system environment variables.'
    );
  }
  
  return `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
};

module.exports = { buildMongoUri };

