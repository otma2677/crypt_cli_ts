/**
 *
 */
import { parseArgs } from 'node:util';

/**
 *
 */
export default function () {
  const result = parseArgs({
    options: {
      set: {
        type: 'string',
        short: 's'
      },
      get: {
        type: 'string',
        short: 'g'
      },
      del: {
        type: 'string',
        short: 'd'
      },
      list: {
        type: 'string',
        short: 'l'
      },
      help: {
        type: 'boolean',
      },
      toClipboard: {
        type: 'boolean',
        short: 't'
      }
    },
    strict: false,
    tokens: true
  });

  const isValid =
    result.values.set !== undefined ||
    result.values.get !== undefined ||
    result.values.del !== undefined ||
    result.values.help !== undefined;
  if (isValid)
    return result;

  throw new Error('Arguments are missing, please see the documentation for usage.');
}
