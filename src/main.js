import libprocessing from "p5.libprocessing.js-ffi";

export function addonTemplate(p5, fn, lifecycles) {
  // console.log(libprocessing.plus100(10));
  // libprocessing.background();

  // class LibprocessingRenderer {
  //   width;
  //   height;

  //   states = {
  //     strokeColor: "black",
  //     fillColor: "white",
  //     rectMode: "center",
  //   };

  //   constructor(pInst, w, h, isMainCanvas) {
  //     this.width = w;
  //     this.height = h;
  //     console.log("create");
  //     // libprocessing.createCanvas(w, h);
  //   }

  //   _applyDefaults() {}

  //   background(...args) {
  //     console.log(args);
  //   }
  //   remove() {}
  //   pixelDensity(val) {}
  //   push() {}
  //   pop() {}
  //   resetMatrix() {}

  //   arc(x, y, w, h, start, stop, mode) {}
  //   ellipse(args) {}
  //   line(x1, y1, x2, y2) {}
  //   point(x, y) {}
  //   quad(x1, y1, x2, y2, x3, y3, x4, y4) {}
  //   rect(...args) {}
  //   triangle(...args) {}
  // }

  // // p5.renderers["libprocessing"] = LibprocessingRenderer;

  lifecycles.predraw = function () {
    this._renderer.frame();
    this._renderer.startFrame();
  };

  lifecycles.postdraw = function () {
    this._renderer.endFrame();
  };

  libprocessing.Renderer.prototype.states = {
    strokeColor: "black",
    fillColor: "white",
    rectMode: "center",
  };
  p5.renderers["libprocessing"] = libprocessing.Renderer;
}

if (typeof p5 !== "undefined") {
  p5.registerAddon(addonTemplate);
}
