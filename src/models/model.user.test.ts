/**
 *
 */
import assert from 'node:assert';
import { Database } from 'better-sqlite3';
import { initializeDatabaseTables } from '../core/core.database';
import { User, UserModel } from './model.user';

/**
 *
 */
describe('Testing model user functions and classes', () => {
  let db!: Database;
  let um!: UserModel;

  before(() => {
    const dbHandle = initializeDatabaseTables(':memory:', true);
    if (dbHandle)
      db = dbHandle;
    else
      throw new Error('Cannot create in memory database for SQLite');

    um = new UserModel(db);
  });

  after(() => {
    db.close();
  });

  it('set user', () => {
    const users: Array<Omit<User, 'rowid' | 'created_at'>> = [
      { name: 'hello', pepper: 'something1', output_favorite: 1 },
      { name: 'hallo', pepper: 'something2', output_favorite: 2 },
      { name: 'hillo', pepper: 'something3', output_favorite: 3 },
    ];

    for (const user of users) {
      const res = um.set(user);
      assert.equal(res, true);
    }
  });

  it('get user', () => {
    const res1 = um.get('hallo');
    const res2 = um.get('hillo');

    assert.equal(res1?.output_favorite, 2);
    assert.equal(res2?.output_favorite, 3);
  });

  it('update user', () => {
    const res = um.update({ name: 'hello', pepper: 'newpepper1', output_favorite: 9 });

    assert.equal(res, true);
  });

  it('delete user', () => {
    const res = um.delete('hillo');

    assert.equal(res, true);
  });
});
