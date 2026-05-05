import p5 from "p5/node";
import { addonTemplate } from "../../dist/p5.libprocessing.mjs";

p5.registerAddon(addonTemplate);

const sketch = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400, "libprocessing");
  };

  p.draw = function () {
    p.background(255, 255, 0);
    p.rect(10, 10, 100, 100);
    p.fill(0, 0, 255);
    p.rect(p.frameCount % p.width, p.frameCount % p.height, 100, 100);
  };
};

new p5(sketch);
