/**
 *
 */
import { Type, Static } from '@sinclair/typebox';
import { cipherCBC, generatePassword } from '../core/core.crypt';
import { TrackModel } from '../models/model.track';

/**
 *
 */
export const SetTrackOptionsCommand = Type.Object({
  label: Type.String(),
  content: Type.String(),
  raw_pass: Type.String(),
  pass_salt: Type.String(),
});

export type SetTrackOptions = Static<typeof SetTrackOptionsCommand>;

export const setTrackCommand = function (track: TrackModel, opts: SetTrackOptions) {
  const alreadyExists = track.get(opts);
  if (alreadyExists) {
    console.info(`Label "${opts.label}" is already in use.`);
    process.exit(0);
  }

  const key = generatePassword(opts.raw_pass, opts.pass_salt, 32);
  const ciphered = cipherCBC(opts.content, key);

  const result = track.set({
    label: opts.label,
    content: ciphered.final.toString('hex'),
    vector: ciphered.vector.toString('hex'),
    pass_salt: opts.pass_salt,
  });

  if (result) console.info('Data saved at ' + opts.label);
  else console.error('Cannot save data for unknown reason, please retry later.');
};
