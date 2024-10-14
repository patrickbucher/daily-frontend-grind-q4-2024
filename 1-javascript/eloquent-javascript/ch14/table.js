const mountains = [
  {
    name: "Kilimanjaro",
    height: 5895,
    place: "Tanzania",
  },
  {
    name: "Pilatus",
    height: 2142,
    place: "Switzerland",
  },
  {
    name: "Napf",
    height: 1418,
    place: "Switzerland",
  },
  {
    name: "Mount Doom",
    height: 482,
    place: "Mordor",
  },
];

const table = document.getElementById("mountains");
for (const mountain of mountains) {
  const tr = document.createElement("tr");
  const name = document.createElement("td");
  const height = document.createElement("td");
  const place = document.createElement("td");
  name.appendChild(document.createTextNode(mountain.name));
  height.appendChild(document.createTextNode(mountain.height));
  height.style.textAlign = "right";
  place.appendChild(document.createTextNode(mountain.place));
  tr.appendChild(name);
  tr.appendChild(height);
  tr.appendChild(place);
  table.appendChild(tr);
}
