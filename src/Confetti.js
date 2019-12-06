import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import ScreenSize from './ScreenSize';

const colors = [0x3fc5f0, 0x6decb9, 0xffdc34, 0xfb5b5a, 0xbc4873, 0xda2d2d];

export default class Confetti extends PIXI.Container {

  constructor() {
    super();
  }

  start() {
    for (var i=0; i<60; i++)
      setTimeout(() => this.createPiece(), Math.random() * 8000);
  }

  createPiece() {
    let piece = new PIXI.Graphics();
    piece.beginFill(colors[Math.floor(Math.random() * colors.length)], 1);
    piece.drawRect(10, Math.random() * 25, 20, 12);
    this.addChild(piece);

    let x1 = Math.random() * ScreenSize.width;
    let x2 = x1 + Math.random() * ScreenSize.width * 0.6 - ScreenSize.width * 0.3;

    let dir = Math.random() > 0.5 ? -1 : 1;

    new Between(0, dir * 360).time(Math.random() * 1000 + 500)
      .easing(Between.Easing.Linear.None)
      .loop('repeat')
      .on('update', (value) => {
        piece.angle = value
      });

    new Between({ x: x1, y: -200 }, { x: x2, y: 1000}).time(4000 + Math.random() * 4000)
      .easing(Between.Easing.Linear.None)
      .on('update', (value) => {
        piece.x = value.x;
        piece.y = value.y;
      })
      .on('complete', (value) => {
        this.removeChild(piece);
        this.createPiece();
      });
  }
}