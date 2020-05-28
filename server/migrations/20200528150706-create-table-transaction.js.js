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
    transaction_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_name TEXT NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_price NUMERIC NOT NULL,
    amount_coin NUMERIC NOT NULL,
    transaction_fees NUMERIC NOT NULL,
    user_id uuid NOT NULL
  )`);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
