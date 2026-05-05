import libprocessing from "../ffi/dist";

export function addonTemplate(p5, fn, lifecycles) {
  class LibprocessingRenderer extends p5.Renderer {
    #renderer;
    width;
    height;
    #pInst;

    states = {
      strokeColor: "black",
      fillColor: "white",
      rectMode: "center",
      colorMode: "rgb",
      colorMaxes: {
        rgb: [255, 255, 255, 255]
      }
    };

    constructor(pInst, w, h, isMainCanvas) {
      super(pInst, w, h, isMainCanvas);
      this.#renderer = new libprocessing.Renderer(pInst, w, h, isMainCanvas);
      this.width = this.#renderer.width;
      this.height = this.#renderer.height;
      this.#pInst = pInst;
    }

    _applyDefaults() {}

    _startFrame() {
      this.#renderer.frame();
      this.#renderer.startFrame();
    }

    _endFrame() {
      this.#renderer.endFrame();
    }

    background(...args) {
      const color = this.#pInst.color(...args);
      this.#renderer.background(...color._color.coords);
    }

    fill(...args) {
      // super.fill(...args);
      const color = this.#pInst.color(...args);
      this.#renderer.fill(color._color.coords);
    }

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
    rect(...args) {
      this.#renderer.rect(...args);
    }
    triangle(...args) {}
  }

  p5.renderers["libprocessing"] = LibprocessingRenderer;

  lifecycles.predraw = function () {
    // this._renderer.frame();
    // this._renderer.startFrame();
    this._renderer._startFrame();
  };

  lifecycles.postdraw = function () {
    // this._renderer.endFrame();
    this._renderer._endFrame();
  };

  // libprocessing.Renderer.prototype.states = {
  //   strokeColor: "black",
  //   fillColor: "white",
  //   rectMode: "center"
  // };
  // p5.renderers["libprocessing"] = libprocessing.Renderer;
}

if (typeof p5 !== "undefined") {
  p5.registerAddon(addonTemplate);
}
