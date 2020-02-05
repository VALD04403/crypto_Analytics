const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl
});

const getPurchases = async () => {
  const purchases = await pool.query(
    'SELECT * FROM purchase order by purchase_date DESC'
  );
};

module.exports = {
  getPurchases
};
