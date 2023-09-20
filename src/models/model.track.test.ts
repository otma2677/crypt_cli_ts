/**
 *
 */
import assert from 'node:assert';
import { Database } from 'better-sqlite3';
import { initializeDatabaseTables } from '../core/core.database';
import { Track, TrackModel } from './model.track';

/**
 *
 */
describe('Testing model track functions and classes', () => {
  let db!: Database;
  let tm!: TrackModel;

  before(() => {
    const dbHandle = initializeDatabaseTables(':memory:', true);
    if (dbHandle)
      db = dbHandle;
    else
      throw new Error('Cannot create in memory database for SQLite');

    tm = new TrackModel(db);
  });

  after(() => {
    db.close();
  });

  it('set track', () => {
    const tracks: Array<Pick<Track, 'label' | 'content' | 'vector' | 'pass_salt'>> = [
      { label: 'hello', content: 'ddeeef', vector: 'fezfezf', pass_salt: 'zefezfezfezfezfezf' },
      { label: 'hella', content: 'ddeeeef', vector: 'fezfezf', pass_salt: 'zefezfezfezfezfezf' },
      { label: 'hellu', content: 'ezfzefzefddeee', vector: 'fezfezf', pass_salt: 'zefezfezfezfezfezf' },
    ];

    for (const track of tracks) {
      const res = tm.set(track);
      assert.equal(res, true);
    }
  });

  it('get track', () => {
    const res = tm.get({ label: 'hello' });

    assert.equal(res?.content, 'ddeeef');
  });

  it('delete track', () => {
    const res = tm.delete({ label: 'hello' });

    assert.equal(res, true);
  });
});
