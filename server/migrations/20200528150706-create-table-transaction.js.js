'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.runSql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

  return db.runSql(`CREATE TABLE transaction(
    transaction_id SERIAL PRIMARY KEY,
    coin_name TEXT UNIQUE NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_price INT NOT NULL,
    amount_coin INT NOT NULL,
    transaction_fees INT NOT NULL,
    user_id INT NOT NULL
  )`);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
