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

exports.up = function (db) {
  return db.runSql(`CREATE TABLE session(
    id SERIAL PRIMARY KEY,
    user_id uuid,
    session_id uuid DEFAULT uuid_generate_v4(),
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
