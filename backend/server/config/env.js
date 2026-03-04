import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://ruhais:R9745091254s@cluster0.qh1cr6m.mongodb.net/ecommerce-web?retryWrites=true&w=majority&appName=Cluster0',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
    NODE_ENV: process.env.NODE_ENV || 'development'
};
