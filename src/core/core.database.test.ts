/**
 *
 */
import assert from 'node:assert';
import { initializeDatabaseTables } from './core.database';

/**
 *
 */
describe('Testing database functions', () => {
  it('test initializeDatabaseTables function', () => {
    const db = initializeDatabaseTables(':memory:', true);

    const result = db?.prepare('SELECT * FROM sqlite_master where type = ?').all('table');

    assert.equal(result?.length, 2);

    db?.close();
  });
});
