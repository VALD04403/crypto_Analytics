const dataAccess = require('./data-access');

const getPurchases = async (req, res) => {
  const purchases = await dataAccess.getPurchases();
  return res.status(200).json({ purchases });
};

module.exports = { getPurchases };
