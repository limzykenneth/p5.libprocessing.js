export function addonTemplate(p5, fn, lifecycles) {
  class LibprocessingRenderer extends p5.Renderer {
    constructor(pInst, w, h, isMainCanvas) {
      super(pInst, w, h, isMainCanvas);
    }

    background(...args) {}
    remove() {}
    pixelDensity(val) {}
    push() {}
    pop() {}
    resetMatrix() {}

    arc(x, y, w, h, start, stop, mode) {}
    ellipse(args) {}
    line(x1, y1, x2, y2) {}
    point(x, y) {}
    quad(x1, y1, x2, y2, x3, y3, x4, y4) {}
    rect(...args) {}
    triangle(...args) {}
  }

  p5.renderers["libprocessing"] = LibprocessingRenderer;
}

if (typeof p5 !== "undefined") {
  p5.registerAddon(addonTemplate);
}
