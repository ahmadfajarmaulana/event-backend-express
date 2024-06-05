import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || "3000",
    mongoURI: process.env.MONGODB_URL || "mongodb://localhost:27017/event-mern",
    jwtSecret: process.env.JWT_SECRET || '',
    jwtAccessTokenExpired: process.env.ACCESS_TOKEN_JWT_EXPIRED ? parseInt(process.env.ACCESS_TOKEN_JWT_EXPIRED) : 30,
    jwtRefreshTokenExpired: process.env.REFRESH_TOKEN_JWT_EXPIRED ? parseInt(process.env.REFRESH_TOKEN_JWT_EXPIRED) : 60,

    //Redis
    redisURI: process.env.REDIS_URL as string,
    redisExpired: process.env.REDIS_EXPIRED ? parseInt(process.env.REDIS_EXPIRED) : 10000,
}