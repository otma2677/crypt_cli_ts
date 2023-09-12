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
        short: 'c'
      },
      get: {
        type: 'string',
        short: 'g'
      },
      delete: {
        type: 'string',
        short: 'd'
      }
    },
    strict: false,
    tokens: true
  });

  const isValid = result.values.get !== undefined || result.values.create !== undefined || result.values.set !== undefined;
  if (isValid)
    return result;

  throw new Error('Arguments are missing, please see the documentation for usage.');
}
