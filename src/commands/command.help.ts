/**
 *
 */

/**
 *
 */
export const helpCommand = function () {
  const helpers = [
    'Available commands:',
    'help\tDisplay commands and details',
    'set\tSet a cipher under a given label and with a prompted password and content',
    'get\tDecipher a track and give it back, with apropriate name & password',
    'del\tDelete a given track'
  ];

  for (const helper of helpers)
    console.log(helper);
};

// printf("Available commands:\n");
// printf("help - Display commands and details\n");
// printf("set - Set a value under the given label\n");
// printf("\t ex: \"ccli set mysecretlabel\"\n");
