const pool = require('./db_pool');
const axios = require('axios');

const apiKey = process.env.API_KEY_CRYPTO;

//crypto

const getPurchases = async (userId) => {
  try {
    const purchases = await pool.query(
      'SELECT transaction_id,coin_name, transaction_date, transaction_price, amount_coin, transaction_fees, staking, transaction_free, user_id FROM transaction WHERE user_id = $1 order by transaction_date DESC',
      [userId]
    );
    return purchases.rows;
  } catch (error) {
    console.log(error);
  }
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
  try {
    const purchase = await pool.query(
      'INSERT INTO transaction (coin_name, transaction_date, transaction_price, amount_coin, transaction_fees, staking, transaction_free, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8 )',
      [coin, date, price, amount, fees, staking, isFree, userId]
    );
    return purchase.rows;
  } catch (error) {
    console.log(error);
  }
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

const updateGeneralInfo = async (total, fees, userId) => {
  try {
    const info = await pool.query(
      `UPDATE sold_info SET total_invest = $1, total_fees = $2 WHERE user_id = $3`,
      [total, fees, userId]
    );
    return info.rows;
  } catch (error) {
    console.log(error);
  }
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
  const value = await axios.get(url);
  return value.data.EUR;
};

const getTopList = async () => {
  const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=EUR&api_key=${apiKey}`;
  const list = await axios.get(url);
  return list.data;
};

const getNewsArticles = async () => {
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${apiKey}`;
  const list = await axios.get(url);
  return list.data;
};

getAmountWallet = async (cryptoName) => {
  const amountWallet = await pool.query('SELECT * FROM wallet WHERE name $1', [
    cryptoName,
  ]);
  return amountWallet.rows;
};

getAllAmountWallet = async () => {
  const amountWallet = await pool.query('SELECT * FROM wallet');
  return amountWallet.rows;
};

// user

const createUser = async (firstname, name, mail, password) => {
  try {
    const user = await pool.query(
      `INSERT INTO users (firstname, lastname, mail, password) VALUES ($1, $2, crypt($3, gen_salt('bf')), crypt($4, gen_salt('bf'))) RETURNING id`,
      [firstname, name, mail, password]
    );
    return user.rows[0];
  } catch (error) {
    console.log(error);
    // Postgres UNIQUE VIOLATION
    if (error.code === '23505') {
      throw new Error('email is already taken.');
    }
    throw new UnknownError();
  }
};

const getVerifiedUserId = async (mail, password) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE mail = crypt($1, mail) AND password = crypt($2, password)',
    [mail, password]
  );
  return result.rows[0] ? result.rows[0].id : null;
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
    SELECT users.id AS id, firstname, lastname FROM users
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

//api coinbase
const getUserFromCoinbase = async (token) => {
  const url = `https://api.coinbase.com/v2/user`;
  const user = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return user.data;
};

const getUserWallets = async (token) => {
  const url = 'https://api.coinbase.com/v2/accounts';
  const wallets = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return wallets.data.data;
};

const getUserTransactionsWallets = async (token, accountId) => {
  const url = `https://api.coinbase.com/v2/accounts/${accountId}/transactions`;
  const transactions = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return transactions.data.data;
};

const getUserBuysWallets = async (token, accountId) => {
  const url = `https://api.coinbase.com/v2/accounts/${accountId}/buys`;
  const buys = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return buys.data.data;
};

const getPriceCrypto = async (token, currency_pair) => {
  const url = `https://api.coinbase.com/v2/prices/${currency_pair}/buy`;
  const price = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return price.data.data;
};

const getToken = async (info) => {
  try {
    const url = `https://api.coinbase.com/oauth/token`;
    const newToken = await axios.post(url, info);
    return newToken.data;
  } catch (error) {
    console.log(error);
  }
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
  getUserFromCoinbase,
  getUserWallets,
  getUserTransactionsWallets,
  getUserBuysWallets,
  getPriceCrypto,
  getToken,
};
