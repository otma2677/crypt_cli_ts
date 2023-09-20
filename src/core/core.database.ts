/**
 *
 */
import Database from 'better-sqlite3';
import { join } from 'node:path';

/**
 *
 */
export function Connection(path?: string) {
  const db = Database(path ?? ':memory:');
  db.pragma('journal_mode = WAL');

  return db;
}

export function initializeDatabaseTables(path: string, returning = false) {
  const db = path === ':memory:' ? Database(':memory:') : Database(join(
    path,
    'main.db'
  ));

  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
        created_at text default current_timestamp not null,
        label text unique not null,
        content text not null,
        vector text not null,
        pass_salt text not null
    );
  `.trim());

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        created_at text default current_timestamp not null,
        name text unique not null,
        pepper text not null,
        output_favorite int not null
    );
  `.trim());

  if (returning)
    return db;


  db.close();
}
