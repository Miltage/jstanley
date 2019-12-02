import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import ScreenSize from './ScreenSize';

let sprite = null;

export default class DiscoBall extends PIXI.Container {

  constructor(props) {
    super(props);

    sprite = PIXI.Sprite.from('discoball.png');
    sprite.anchor.set(0.5);
    this.addChild(sprite);

    this.x = ScreenSize.width;
    this.y = ScreenSize.height/2;

    new Between(-10, 10).time(500 + Math.random() * 100)
      .easing(Between.Easing.Elastic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        this.angle = value;
      });

    new Between(1, 1.2).time(1000)
      .easing(Between.Easing.Elastic.InOut)
      .loop('bounce')
      .on('update', (value) => {
        sprite.scale.x = value;
        sprite.scale.y = value;
      })

    this.flip();
    this.visible = false;
  }

  flip() {
    this.scale.x = -this.scale.x;
    setTimeout(() => this.flip(), 1200);
  }

  drop() {
    this.visible = true;
    new Between(-400, ScreenSize.height * 0.25).time(800)
      .easing(Between.Easing.Bounce.Out)
      .on('update', (value) => {
        this.y = value;
      });
  }

  raise() {
    new Between(this.y, -400).time(800)
      .easing(Between.Easing.Bounce.In)
      .on('update', (value) => {
        this.y = value;
      })
      .on('complete', () => { this.visible = false; });
  }
}