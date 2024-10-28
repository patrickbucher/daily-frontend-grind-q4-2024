function getElementsByTagName(node, name) {
  name = name.toLowerCase();
  let matches = [];
  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.nodeName.toLowerCase() == name) {
      matches.push(child);
    }
    if (child.nodeType == Node.ELEMENT_NODE) {
      matches = matches.concat(getElementsByTagName(child, name));
    }
  }
  return matches;
}

const divs = getElementsByTagName(document.getRootNode(), "div");
console.log(divs);
