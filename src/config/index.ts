import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'stage'}.local` });


export const { 
    NODE_ENV, PORT, DB_HOST, 
    DB_DATABASE, SECRET_KEY, REACT_BASE_URL
} = process.env;
export const IS_DEV_ENV = NODE_ENV === 'development'

export default {
    IS_DEV_ENV,
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET_KEY: process.env.SECRET_KEY || 'INDIA',
}
