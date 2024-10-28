const url = "https://eloquentjavascript.net/author";
const formats = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbow+unicorns",
];
for (const format of formats) {
  let response = fetch(url, { headers: { Accept: format } })
    .then((res) => console.log(res.text().then(console.log)))
    .catch((err) => console.log(`error fetching ${url} as ${format}: ${err}`));
}
