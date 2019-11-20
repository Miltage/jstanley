import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import Scene from './Scene.js';

let cat = null;

export default class JazzScene extends Scene {

  constructor(props) {
    super(props);

    let texture = PIXI.Texture.from('jazzbar.jpg');
    let bg = PIXI.Sprite.from(texture);
    this.addChild(bg);

    cat = PIXI.Sprite.from('cat.png');
    cat.anchor.set(0.5);
    cat.x = this.width/2;
    cat.y = this.height/2;
    cat.scale.x = cat.scale.y = 1.2;
    this.addChild(cat);

    this.moveCat();

    new Between(-20, 20).time(600)
      .easing(Between.Easing.Cubic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        cat.angle = value
      });
  }

  moveCat() {
    var pos = { 
      x: cat.x + Math.random() * 600 - 300, 
      y: cat.y + Math.random() * 200 - 100,
      scale: 0.8 + Math.random() * 0.6
    };

    if (pos.x < this.width * 0.1 || pos.x > this.width * 0.9) pos.x = cat.x;
    if (pos.y < this.height * 0.3 || pos.y > this.height * 0.7) pos.y = cat.y;

    // https://github.com/sasha240100/between.js
    new Between({ x: cat.x, y: cat.y, scale: cat.scale.x }, pos).time(1000)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        cat.x = value.x;
        cat.y = value.y;
        cat.scale.x = cat.scale.y = value.scale;
      })
      .on('complete', (value) => {
        this.moveCat();
      });
  }

}