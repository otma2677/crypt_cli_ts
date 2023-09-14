/**
 *
 */
import assert from 'node:assert';
import { randomBytes } from 'node:crypto';

import { cipherCBC, decipherCBC, generatePassword } from './core.crypt.js';

/**
 *
 */
describe('Testing cryptographic functions', () => {
  it('Test generatePassword', () => {
    const salt = randomBytes(64).toString('hex');
    const p1 = generatePassword('hello world', salt);
    const p2 = generatePassword('hella world', salt);

    assert.notEqual(p1, p2);
    assert.equal(p1.length, p2.length);
  });

  it('Test cipherCBC && decipherCBC', () => {
    const salt = randomBytes(64).toString('hex');
    const pass = generatePassword('hello world', salt, 32);
    const message = 'this is a message bro';

    const ciphered = cipherCBC(message, pass);
    const deciphered = decipherCBC(
      ciphered.final.toString('hex'),
      pass,
      ciphered.vector.toString('hex')
    );

    assert.equal(deciphered.toString('utf-8'), message)
  });
});
