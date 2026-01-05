export const EnvConfiguration = () => ({
  environment: process.env.ENV || 'dev',
  tokenApi: process.env.TOKEN_API,
  jwtSecret: process.env.JWT_SECRET,
  authToken: process.env.AUTH_TOKEN,
  port: process.env.PORT ?? 3000,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
});