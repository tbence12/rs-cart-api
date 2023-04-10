import { Pool, Client } from 'pg';

const config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const pool = new Pool(config);
const client = new Client(config);
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

export const poolQuery = (text, params) => {
  return pool.query(text, params);
};

export const clientQuery = (text, params, callback) => {
  return client.query(text, params, callback);
};
