import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import ScreenSize from './ScreenSize';

let sprite;
let dancing = true;

export default class DanceCat extends PIXI.Container {

  constructor(props) {
    super(props);

    sprite = PIXI.Sprite.from(props.file + '.png');
    sprite.anchor.set(0.5);
    sprite.scale.x = sprite.scale.y = 1.2;
    this.addChild(sprite);

    let angle = Math.random() * Math.PI;
    this.x = ScreenSize.width/2 + Math.cos(angle) * 1400;
    this.y = ScreenSize.height/2 + Math.sin(angle) * 1400;

    new Between(-10, 10).time(500 + Math.random() * 100)
      .easing(Between.Easing.Elastic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        this.angle = value;
      });

    this.move(true);
    setTimeout(() => this.flip(), 2000);

    this.visible = true;
  }

  move(center) {
    var pos = { 
      x: this.x + Math.random() * 600 - 300, 
      y: this.y + Math.random() * 200 - 100,
      scale: 0.8 + Math.random() * 0.5
    };

    let angle = Math.random() * Math.PI;
    let dist = 50 + Math.random() * 200;
    if (pos.x < ScreenSize.width * 0.1 || pos.x > ScreenSize.width * 0.9 || center) pos.x = ScreenSize.width/2 + Math.cos(angle) * dist;
    if (pos.y < ScreenSize.height * 0.1 || pos.y > ScreenSize.height * 0.9 || center) pos.y = ScreenSize.height/2 + Math.sin(angle) * dist;

    // https://github.com/sasha240100/between.js
    new Between({ x: this.x, y: this.y, scale: sprite.scale.x }, pos).time(center ? 2000 : 1000)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        this.x = value.x;
        this.y = value.y;
        this.zIndex = value.y;
        sprite.scale.x = sprite.scale.y = value.scale;
      })
      .on('complete', (value) => {
        if (dancing)
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

  leave() {
    dancing = false;
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