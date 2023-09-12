/**
 *
 */
import assert from 'node:assert';
import { checkPath } from './core.utils';

/**
 *
 */
describe('Test utils functions', () => {
  it('Test checkpath', () => {
    const fakePath = 'c://keodk/dezzef';
    const realPath = process.cwd();

    assert.equal(checkPath(fakePath), false);
    assert.equal(checkPath(realPath), true);
  });
});
