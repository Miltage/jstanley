import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import ScreenSize from './ScreenSize';

let sprite;
let playing = true;

export default class SaxCat extends PIXI.Container {

  constructor(props) {
    super(props);

    sprite = PIXI.Sprite.from('saxcat.png');
    sprite.anchor.set(0.5);
    sprite.scale.x = sprite.scale.y = 1.2;
    this.zIndex = 9000;
    this.addChild(sprite);

    new Between(-20, 20).time(580)
      .easing(Between.Easing.Cubic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        this.angle = value
      });

    setTimeout(() => this.move(true), 7200);

    this.visible = false;
  }

  move(center) {
    var pos = { 
      x: this.x + Math.random() * 600 - 300, 
      y: this.y + Math.random() * 200 - 100,
      scale: 0.6 + Math.random() * 0.4
    };

    if (pos.x < ScreenSize.width * 0.1 || pos.x > ScreenSize.width * 0.9 || center) pos.x = ScreenSize.width/2;
    if (pos.y < ScreenSize.height * 0.3 || pos.y > ScreenSize.height * 0.7 || center) pos.y = ScreenSize.height/2;

    // https://github.com/sasha240100/between.js
    new Between({ x: this.x, y: this.y, scale: sprite.scale.x }, pos).time(center ? 2500 : 1000)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        this.x = value.x;
        this.y = value.y;
        sprite.scale.x = sprite.scale.y = value.scale;
      })
      .on('complete', (value) => {
        if (playing)
          this.move();
      });

    this.visible = true;
  }

  leave() {
    playing = false;
    let angle = Math.random() * Math.PI;
    var d = 1400;
    var pos = { x: ScreenSize.width/2 + Math.cos(angle) * d, y: ScreenSize.height/2 + Math.sin(angle) * d };

    new Between({ x: this.x, y: this.y }, pos).time(1000)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        this.x = value.x;
        this.y = value.y;
        this.zIndex = value.y;
      })
      .on('complete', (value) => {
        this.visible = false;
      });
  }
}