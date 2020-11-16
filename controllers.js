const dataAccess = require('./data-access');

//crypto
const getPurchases = async (req, res) => {
  const { userId } = req.params;
  const purchases = await dataAccess.getPurchases(userId);
  return res.status(200).json({ purchases });
};

const getPurchasesByCoin = async (req, res) => {
  const { coin } = req.body;
  const purchases = await dataAccess.getPurchasesByCoin(coin);
  return res.status(200).json({ purchases });
};

const createPurchase = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await dataAccess.getGeneralInfo(id);
    const {
      cryptoName,
      date,
      price,
      amountCrypto,
      fees,
      staking,
      isFree,
      currentUser,
    } = req.body;
    await dataAccess.createPurchase(
      cryptoName,
      date,
      price,
      amountCrypto,
      fees,
      staking,
      isFree,
      currentUser.id
    );
    if (!isFree && !staking) {
      const updateTotal =
        Number(data[0].total_invest) + Number(price * amountCrypto);
      const updateFees = Number(data[0].total_fees) + Number(fees);
      await dataAccess.updateGeneralInfo(updateTotal, updateFees);
    }
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const deletePurchase = async (req, res) => {
  const { id } = req.body;
  const response = await dataAccess.deletePurchase(id);
  return res.status(200).json({ response });
};

const getGeneralInfo = async (req, res) => {
  const { userId } = req.params;
  const data = await dataAccess.getGeneralInfo(userId);
  return res.status(200).json({ data });
};

const getLast5Purchase = async (req, res) => {
  const { userId } = req.params;
  const top5 = await dataAccess.getLast5Purchase(userId);
  return res.status(200).json({ top5 });
};

const getValueCoin = async (req, res) => {
  const { coin } = req.params;
  const response = await dataAccess.getValueCrypto(coin);
  return res.status(200).json({ response });
};

const getTopListValue = async (req, res) => {
  const response = await dataAccess.getTopList();
  return res.status(200).json({ response });
};

const getNewsArticles = async (req, res) => {
  const response = await dataAccess.getNewsArticles();
  return res.status(200).json({ response });
};

getAmountWallet = async (req, res) => {
  const { cryptoName } = req.params;
  const response = await dataAccess.getAmountWallet(cryptoName);
  return res.status(200).json({ response });
};

getAllAmountWallet = async (req, res) => {
  const response = await dataAccess.getAllAmountWallet();
  return res.status(200).json({ response });
};

//user

const getCleanPassword = (password) => {
  if (password.length >= 8) {
    return password;
  }
  throw new Error('Password must contain at least 8 characters.');
};

const createUser = async (req, res) => {
  try {
    const { username, firstname, name, mail } = req.body;
    const password = getCleanPassword(req.body.password);
    const response = await dataAccess.createUser(
      username,
      firstname,
      name,
      mail,
      password
    );
    await dataAccess.insertDataSoldInfo(response.id);
  } catch (error) {
    if (error.isUnknown) {
      return res.sendStatus(500);
    }
    return res.status(400).send({ errorMessage: error.message });
  }
  return res.sendStatus(201);
};

const createSession = async (req, res) => {
  const { username, password } = req.body;
  const userId = await dataAccess.getVerifiedUserId(username, password);
  if (userId) {
    const sessionId = await dataAccess.createSession(userId);
    res.cookie('sessionId', sessionId, {
      maxAge: 999900000,
      httpOnly: true,
      sameSite: true,
    });
    return res.status(201).json({ userId });
  } else {
    return res.status(404).json('No user found');
  }
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.cookies;
  await dataAccess.deleteSession(sessionId);
  return res.sendStatus(200);
};

const getCurrentUser = async (req, res) => {
  const { user } = req;
  if (user) {
    return res.status(200).send(user);
  }
  return res.sendStatus(401);
};

module.exports = {
  getPurchases,
  getPurchasesByCoin,
  createPurchase,
  deletePurchase,
  getValueCoin,
  getGeneralInfo,
  getLast5Purchase,
  getTopListValue,
  getNewsArticles,
  createUser,
  createSession,
  deleteSession,
  getCurrentUser,
};
