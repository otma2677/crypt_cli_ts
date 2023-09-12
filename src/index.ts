#!/usr/bin/env node

/**
 *
 */
import { join } from 'node:path';
import { homedir } from 'node:os';

/**
 *
 */
import inquirer from 'inquirer';

/**
 *
 */
import { initializeDefaultFolders } from './core/core.utils';
import { Connection, initializeDatabaseTables } from './core/core.database';
import coreParseArguments from './core/core.parse-arguments';
import { TrackModel } from './models/model.track';
import { setTrackCommand } from './commands/command.set-track';
import { randomBytes } from 'node:crypto';
import { getTrackCommand } from './commands/command.get-track';
import { delTrackCommand } from './commands/command.del-track';

/**
 *
 */
(async () => {
  try {
    const pathToDefaultDirectory = join(homedir(), 'crypt_cli_data');

    initializeDefaultFolders(pathToDefaultDirectory);
    initializeDatabaseTables(pathToDefaultDirectory);

    const parsedArguments = coreParseArguments();

    const prompt = inquirer.createPromptModule();
    const rawPassword = await prompt([ { type: 'password', name: 'password', message: 'Password: '} ]);

    const db = Connection(join(pathToDefaultDirectory, 'main.db'));
    const trackModel = new TrackModel(db);

    if (parsedArguments.values.set) {
      const rawContent = await prompt([ { type: 'password', name: 'content', message: 'Content: '} ]);
      setTrackCommand(trackModel, {
        label: parsedArguments.values['set'] as string,
        content: rawContent.content,
        raw_pass: rawPassword.password,
        pass_salt: randomBytes(32).toString('hex')
      });
    } else if (parsedArguments.values.get) {
      getTrackCommand(trackModel, {
        label: parsedArguments.values['get'] as string,
        raw_pass: rawPassword.password as string
      });
    } else if (parsedArguments.values.delete) {
      delTrackCommand(trackModel, {
        label: parsedArguments.values['delete'] as string
      });
    } else {
      console.error('Command does not works');
    }

    db.close();
  } catch (err) {
    console.error('Unknown error happened', err);
  }
})();

