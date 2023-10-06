/**
 *
 */
import { TrackModel } from '../models/model.track';

/**
 *
 */
export const listTracksCommand = function (model: TrackModel) {
  const tracks = model.getAll(100);

  for (const track of tracks)
    console.log(`Track N¤${track.rowid} => ${track.label}`);
};
