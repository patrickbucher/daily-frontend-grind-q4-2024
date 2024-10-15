function asTabs(node) {
  const tabs = [];
  for (const c of node.children) {
    if (c.hasAttribute("data-tabname")) {
      tabs.push(c);
    }
  }
  const buttons = tabs.filter((n) => {
    const button = document.createElement("button");
    button.textContent = n.getAttribute("data-tabname");
    button.addEventListener("click", (event) => {
      tabs.forEach((t) => (t.style.display = "none"));
      n.style.display = "block";
    });
    node.prepend(button);
    return button;
  });
  tabs.forEach((t) => (t.style.display = "none"));
}

const tabbed = document.getElementsByClassName("tabbed");
for (const t of tabbed) {
  asTabs(t);
}
