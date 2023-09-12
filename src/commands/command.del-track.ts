/**
 *
 */
import { Type, Static } from '@sinclair/typebox';
import { TrackModel } from '../models/model.track';

/**
 *
 */
export const delTrackOptionsCommand = Type.Object({
  label: Type.String(),
});

export type DelTrackOptions = Static<typeof delTrackOptionsCommand>;

export const delTrackCommand = function (model: TrackModel, opts: DelTrackOptions) {
  const deleted = model.delete(opts);

  if (deleted) console.info('Successfully deleted ' + opts.label);
  else console.info('Cannot delete track for unknown reason, please retry later.');
};
