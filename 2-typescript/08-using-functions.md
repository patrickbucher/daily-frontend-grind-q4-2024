## Using functions

Unlike many other languages, JavaScript does _not_ support function overloading.
If too few arguments are passed, the remainder parameters have the value
`undefined`. If too many arguments are passed, they are collected in the
`arguments` array.

TypeScript, however, is stricter than JavaScript and does _not_ allow a function
to be called with a different number of arguments.
