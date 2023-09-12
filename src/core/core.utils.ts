/**
 *
 */
import { join } from 'node:path';
import { homedir } from 'node:os';
import { accessSync, mkdirSync } from 'node:fs';

/**
 *
 */
export const pathToDefaultFolder = join(homedir(), 'crypt_cli_data');

export function checkPath(path: string) {
  try {
    accessSync(path);

    return true;
  } catch (err) {
    return false;
  }
}

export function initializeDefaultFolders(path: string) {
  if (!checkPath(path))
    mkdirSync(path);
}
