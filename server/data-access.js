const fetch = require('node-fetch');
const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY_CRYPTO;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

//crypto

const getPurchases = async (userId) => {
  const purchases = await pool.query(
    'SELECT transaction_id,coin_name, transaction_date, transaction_price, amount_coin, transaction_fees, staking, transaction_free, user_id FROM transaction WHERE user_id = $1 order by transaction_date DESC',
    [userId]
  );
  return purchases.rows;
};

const getPurchasesByCoin = async (coin) => {
  const purchases = await pool.query(
    'SELECT * FROM transaction WHERE coin_name = $1 order by transaction_date DESC',
    [coin]
  );
  return purchases.rows;
};

const createPurchase = async (
  coin,
  date,
  price,
  amount,
  fees,
  staking,
  isFree,
  userId
) => {
  const purchase = await pool.query(
    'INSERT INTO transaction (coin_name, transaction_date, transaction_price, amount_coin, transaction_fees, staking, transaction_free, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8 )',
    [coin, date, price, amount, fees, staking, isFree, userId]
  );
  return purchase.rows;
};

const deletePurchase = async (id) => {
  const purchase = await pool.query(
    'DELETE FROM transaction WHERE transaction_id = $1',
    [id]
  );
  return purchase;
};

const getGeneralInfo = async (userId) => {
  const data = await pool.query(
    'SELECT total_invest, total_fees FROM sold_info WHERE user_id = $1',
    [userId]
  );
  return data.rows;
};

const updateGeneralInfo = async (total, fees) => {
  const info = await pool.query(
    `UPDATE sold_info SET total_invest = $1, total_fees = $2`,
    [total, fees]
  );
  return info.rows;
};

const getLast5Purchase = async (id) => {
  const top5 = await pool.query(
    ' SELECT coin_name, transaction_date, transaction_price, amount_coin, transaction_fees, transaction_id FROM transaction WHERE user_id = $1 ORDER BY transaction_date DESC LIMIT 5 OFFSET 0',
    [id]
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

const getNewsArticles = async () => {
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${apiKey}`;
  const list = await await fetch(url).json();
  return list;
};

// user

const createUser = async (username, firstname, name, mail, password) => {
  try {
    const user = await pool.query(
      `INSERT INTO users (username, firstname, lastname, mail, password) VALUES ($1, $2,$3, crypt($4, gen_salt('bf')), crypt($5, gen_salt('bf'))) RETURNING id`,
      [username, firstname, name, mail, password]
    );
    return user.rows[0];
  } catch (error) {
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('Username is already taken.');
    }
    throw new UnknownError();
  }
};

const getVerifiedUserId = async (username, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE username = $1 AND password = crypt($2, password)',
    [username, password]
  );
  return result.rows[0].id;
};

const createSession = async (userId) => {
  const result = await pool.query(
    'INSERT INTO session (user_id) VALUES ($1) RETURNING session_id',
    [userId]
  );
  return result.rows[0].session_id;
};

const deleteSession = async (sessionId) => {
  await pool.query('DELETE FROM session WHERE session_id = $1', [sessionId]);
};

const getUserFromSessionId = async (sessionId) => {
  const result = await pool.query(
    `
    SELECT users.id AS id, username FROM users
      JOIN session
      ON session.user_id = users.id
    WHERE session.session_id = $1
    `,
    [sessionId]
  );
  const user = result.rows[0];
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  return user;
};

const insertDataSoldInfo = async (userId) => {
  await pool.query(
    `INSERT INTO sold_info (user_id, total_invest, total_fees) VALUES($1, 0, 0)`,
    [userId]
  );
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
  getNewsArticles,
  createUser,
  getVerifiedUserId,
  createSession,
  getUserFromSessionId,
  deleteSession,
  insertDataSoldInfo,
};
