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