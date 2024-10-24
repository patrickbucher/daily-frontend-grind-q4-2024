class Picture {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }

  draw(pixels) {
    let copy = this.pixels.slice();
    for (let { x, y, color } of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }
}

function updateState(state, action) {
  return { ...state, ...action };
}

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) {
    Object.assign(dom, props);
    for (let child of children) {
      if (typeof child != "string") {
        dom.appendChild(child);
      } else {
        dom.appendChild(document.createTetNode(child));
      }
    }
  }
  return dom;
}
