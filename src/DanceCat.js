import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import ScreenSize from './ScreenSize';

let sprite = null;

export default class TextDisplay extends PIXI.Container {

  constructor(props) {
    super(props);

    sprite = PIXI.Sprite.from(props.file + '.png');
    sprite.anchor.set(0.5);
    sprite.scale.x = sprite.scale.y = 1.2;
    this.addChild(sprite);

    new Between(-10, 10).time(500 + Math.random() * 100)
      .easing(Between.Easing.Elastic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        this.angle = value;
      });

    setTimeout(() => this.move(true), 1);
    setTimeout(() => this.flip(), 2000);

    this.visible = true;
  }

  move(center) {
    var pos = { 
      x: this.x + Math.random() * 600 - 300, 
      y: this.y + Math.random() * 200 - 100,
      scale: 0.8 + Math.random() * 0.5
    };

    if (pos.x < ScreenSize.width * 0.1 || pos.x > ScreenSize.width * 0.9 || center) pos.x = ScreenSize.width/2;
    if (pos.y < ScreenSize.height * 0.1 || pos.y > ScreenSize.height * 0.9 || center) pos.y = ScreenSize.height/2;

    // https://github.com/sasha240100/between.js
    new Between({ x: this.x, y: this.y, scale: sprite.scale.x }, pos).time(center ? 4000 : 1000)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        this.x = value.x;
        this.y = value.y;
        sprite.scale.x = sprite.scale.y = value.scale;
      })
      .on('complete', (value) => {
        this.move();
      });

    this.visible = true;
  }

  flip() {
    new Between(this.scale.x, -this.scale.x).time(300)
      .easing(Between.Easing.Bounce.Out)
      .on('update', (value) => {
        this.scale.x = value;
      })
      .on('complete', (value) => {
        setTimeout(() => this.flip(), 2000 + Math.random() * 1000);
      });
  }
}