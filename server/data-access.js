const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl
});

const getPurchases = async () => {
  const purchases = await pool.query(
    'SELECT * FROM purchase order by purchase_date DESC'
  );
  return purchases.rows;
};

const getPurchasesByCoin = async coin => {
  const purchases = await pool.query(
    `SELECT * FROM purchase WHERE coin_name = ${coin} order by purchase_date DESC `
  );
  return purchases.rows;
};

const createPurchase = async (coin, date, price, mount, amount, fees) => {
  const purchase = await pool.query(
    'INSERT INTO purchase (coin_name, purchase_date, purchase_price, purchase_mount, amount_coin, purchase_fees) VALUES($1, $2, $3, $4, $5, $6 )',
    [coin, date, price, mount, amount, fees]
  );
  return purchase.rows;
};

module.exports = {
  getPurchases,
  createPurchase,
  getPurchasesByCoin
};
