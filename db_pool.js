const pg = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: true,
});

module.exports = pool;
