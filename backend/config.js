export default {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://mongo:27017/ecommerce',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'something secret',
};
