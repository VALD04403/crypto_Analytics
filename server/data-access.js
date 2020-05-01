const fetch = require('node-fetch');
const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY_CRYPTO;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const getPurchases = async () => {
  const purchases = await pool.query(
    'SELECT * FROM purchase order by purchase_date DESC'
  );
  return purchases.rows;
};

const getPurchasesByCoin = async (coin) => {
  const purchases = await pool.query(
    'SELECT * FROM purchase WHERE coin_name = $1 order by purchase_date DESC',
    [coin]
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

const deletePurchase = async (id) => {
  const purchase = await pool.query(
    'DELETE FROM purchase WHERE purchase_id=$1',
    [id]
  );
  return purchase;
};

const getGeneralInfo = async () => {
  const data = await pool.query(
    'SELECT total_invest, total_fees FROM general_info'
  );
  return data.rows;
};

const updateGeneralInfo = async (total, fees) => {
  const info = await pool.query(
    `UPDATE general_info SET total_invest = $1, totla_fess = $2`,
    [total, fees]
  );
  return info.rows;
};

const getLast5Purchase = async () => {
  const top5 = await pool.query(
    ' SELECT coin_name, purchase_date, purchase_price, purchase_mount, amount_coin, purchase_fees, purchase_id FROM purchase ORDER BY purchase_date DESC LIMIT 5 OFFSET 0;'
  );
  return top5.rows;
};

const getValueCrypto = async (coin) => {
  const url = `http://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=EUR&api_key=${apiKey}`;
  const value = await (await fetch(url)).json();
  return value.EUR;
};

const getTopList = async () => {
  const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=EUR&api_key=${apiKey}`;
  const list = await (await fetch(url)).json();
  return list;
};

module.exports = {
  getPurchases,
  createPurchase,
  getPurchasesByCoin,
  deletePurchase,
  getValueCrypto,
  getGeneralInfo,
  getLast5Purchase,
  updateGeneralInfo,
  getTopList,
};
