/**
 *
 */
import { Type, Static } from '@sinclair/typebox';
import { TrackModel } from '../models/model.track';
import { decipherCBC, generatePassword } from '../core/core.crypt';

/**
 *
 */
export const getTrackOptionsCommand = Type.Object({
  label: Type.String(),
  raw_pass: Type.String()
});

export type GetTrackOptions = Static<typeof getTrackOptionsCommand>;

export const getTrackCommand = function (model: TrackModel, opts: GetTrackOptions) {
  const track = model.get(opts);
  if (!track) {
    console.info(`Label ${opts.label} does not exists.`);
    process.exit(0);
  }

  const key = generatePassword(opts.raw_pass, track.pass_salt);
  const deciphered = decipherCBC(track.content, key, track.vector);

  console.log(`Content of ${opts.label};\n${deciphered.toString('utf-8')}`);
};
