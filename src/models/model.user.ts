/*
 *
 */
import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { Database } from 'better-sqlite3';

/**
 *
 */
export const userSchema = Type.Object({
  rowid: Type.Number(),
  created_at: Type.String(),
  name: Type.String(),
  pepper: Type.String(),
  output_favorite: Type.Number({ minimum: 0, maximum: 9 }),
});

export type User = Static<typeof userSchema>;

export class UserModel {
  private db!: Database;

  constructor(db: Database) {
    this.db = db;
  }

  set(user: Omit<User, 'rowid' | 'created_at'>) {
    const result = this.db
      .prepare('INSERT INTO users(name, pepper, output_favorite) VALUES(?, ?, ?)')
      .run(user.name, user.pepper, user.output_favorite);

    return result.changes !== 0;
  }

  update(user: Omit<User, 'rowid' | 'created_at'>) {
    const result = this.db
      .prepare('UPDATE users SET name = ?, pepper = ?, output_favorite = ? WHERE name = ?')
      .run(user.name, user.pepper, user.output_favorite, user.name);

    return result.changes !== 0;
  }

  get(userName: string) {
    const result = this.db
      .prepare('SELECT ROWID, * FROM users WHERE name = ?')
      .get(userName);

    const isValidUser = Value.Check(userSchema, result);

    return isValidUser ? result as User : null;
  }

  delete(userName: string) {
    const result = this.db
      .prepare('DELETE FROM users WHERE name = ?')
      .run(userName);

    return result.changes !== 0;
  }
}
