/**
 *
 */
import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { Database } from 'better-sqlite3';

/**
 *
 */
export const trackSchema = Type.Object({
  rowid: Type.Number(),
  created_at: Type.String(),
  label: Type.String(),
  content: Type.String(),
  vector: Type.String(),
  pass_salt: Type.String()
});

export type Track = Static<typeof trackSchema>;

export class TrackModel {
  private db!: Database;

  constructor(db: Database) {
    this.db = db;
  }

  set(track: Pick<Track, 'label' | 'content' | 'vector' | 'pass_salt'>) {
    const result = this.db
      .prepare('INSERT INTO tracks(label, content, vector, pass_salt) VALUES(?, ?, ?, ?)')
      .run(
        track.label,
        track.content,
        track.vector,
        track.pass_salt
      );

    return result.changes !== 0;
  }

  delete(track: Pick<Track, 'label'>) {
    const result = this.db
      .prepare('DELETE FROM tracks WHERE label = ?')
      .run(track.label);

    return result.changes !== 0;
  }

  get(track: Pick<Track, 'label'>) {
    const result = this.db
      .prepare('SELECT ROWID, * FROM tracks WHERE label = ?')
      .get(track.label);

    const isATrack = Value.Check(trackSchema, result);

    return isATrack ? result as Track : null;
  }

  getAll(quantity: number) {
    return this.db
      .prepare('SELECT ROWID, * FROM tracks ORDER BY ROWID desc LIMIT ?')
      .all(quantity) as Array<Track>;
  }
}
