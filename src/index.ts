#!/usr/bin/env node

/**
 * Node modules imports
 */
import { join } from 'node:path';
import { homedir } from 'node:os';
import { randomBytes } from 'node:crypto';

/**
 * External imports
 */
import { Database } from 'better-sqlite3';
import inquirer from 'inquirer';

/**
 * Internal imports
 */
import coreParseArguments from './core/core.parse-arguments';
import { TrackModel } from './models/model.track';
import { initializeDefaultFolders } from './core/core.utils';
import { Connection, initializeDatabaseTables } from './core/core.database';
import { setTrackCommand } from './commands/command.set-track';
import { getTrackCommand } from './commands/command.get-track';
import { delTrackCommand } from './commands/command.del-track';
import { helpCommand } from './commands/command.help';
import { listTracksCommand } from './commands/command.list-tracks';

/**
 *
 */
(async () => {
  let db!: Database;

  try {
    const pathToDefaultDirectory = join(homedir(), 'crypt_cli_data');

    initializeDefaultFolders(pathToDefaultDirectory);
    initializeDatabaseTables(pathToDefaultDirectory);

    const parsedArguments = coreParseArguments();
    if (parsedArguments.values.help) {
      return helpCommand();
    }

    const prompt = inquirer.createPromptModule();
    const rawPassword = await prompt([ { type: 'password', name: 'password', message: 'Password: '} ]);

    db = Connection(join(pathToDefaultDirectory, 'main.db'));
    const trackModel = new TrackModel(db);

    if (parsedArguments.values.set) {
      const rawContent = await prompt([ { type: 'password', name: 'content', message: 'Content: '} ]);
      return setTrackCommand(trackModel, {
        label: parsedArguments.values['set'] as string,
        content: rawContent.content,
        raw_pass: rawPassword.password,
        pass_salt: randomBytes(32).toString('hex')
      });
    }

    if (parsedArguments.values.get) {
      return getTrackCommand(trackModel, {
        label: parsedArguments.values['get'] as string,
        raw_pass: rawPassword.password as string
      });
    }

    if (parsedArguments.values.del) {
      return delTrackCommand(trackModel, {
        label: parsedArguments.values['delete'] as string
      });
    }

    if (parsedArguments.values.list) {
      return listTracksCommand(trackModel);
    }

    console.error('Command does not works');
  } catch (err) {
    if (err instanceof Error)
      console.error(err.message);

    if (db)
      db?.close();
    process.exit(1);
  }

  if (db)
    db.close();

  process.exit(0);
})();

