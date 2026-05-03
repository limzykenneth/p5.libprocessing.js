import p5 from 'https://cdn.jsdelivr.net/npm/p5@2.0.3/lib/p5.esm.js';
import { addonTemplate } from '../../../dist/addonTemplate.esm.js'

p5.registerAddon(addonTemplate);

const sketch = function(p) {
  p.setup = function() {
    p.createCanvas(400, 400, 'custom-renderer');
  };

  p.draw = function() {
    p.background(200);
  };
};

new p5(sketch);