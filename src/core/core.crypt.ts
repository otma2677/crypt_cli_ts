/**
 *
 */
import { ScryptOptions, scryptSync, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

/**
 * Defaults follow OWASP recommendations
 */
export function generatePassword(raw: string, salt: string, length?: number) {
  const bSalt = Buffer.from(salt, 'hex');
  const bRaw = Buffer.from(raw);

  const N = Math.pow(2, 17);
  const r = 8;
  const p = 1;
  const maxmem = (128*p*r) + (128*(2+N)*r);
  const options: ScryptOptions =  { N, r, p, maxmem };

  const result = scryptSync(bRaw, bSalt, length ?? 32, options);

  return result.toString('hex');
}

export function cipherCBC(content: string, password: string) {
  const vector = randomBytes(16);
  const bPassword = Buffer.from(password, 'hex');
  const bContent = Buffer.from(content);

  const cipher = createCipheriv('aes-256-cbc', bPassword, vector);
  const updated = cipher.update(bContent);
  const final = Buffer.concat([
    updated,
    cipher.final()
  ]);

  return { vector, final };
}

export function decipherCBC(content: string, password: string, vector: string) {
  const bVector = Buffer.from(vector, 'hex');
  const bPassword = Buffer.from(password, 'hex');
  const bContent = Buffer.from(content, 'hex');

  const decipher = createDecipheriv('aes-256-cbc', bPassword, bVector);
  const updated = decipher.update(bContent);
  const final = Buffer.concat([
    updated,
    decipher.final()
  ]);

  return final;
}
