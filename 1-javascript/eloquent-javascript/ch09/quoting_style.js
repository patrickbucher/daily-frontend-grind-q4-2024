const story = `
He said: 'Well, isn't there anything else?'
She replied: 'Didn't I tell you everything?'
He said: 'I don't know what everything is.'
She said: 'So then I told you everything.'
`;

let quoted = story.replace(/(\s)'(\w)/g, "$1«$2").replace(
  /([^\w\s\d]|\w)'(\s)/g,
  "$1»$2",
).replace(/(\w)'(\w)/g, "$1’$2");
console.log(quoted);
