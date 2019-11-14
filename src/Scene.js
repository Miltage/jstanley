import * as PIXI from 'pixi.js';

let bg = null;

export default class Scene extends PIXI.Container {

  constructor(props) {
    super(props);

    bg = PIXI.Sprite.from('jazzbar.jpg');
    this.addChild(bg);

    let cat = PIXI.Sprite.from('cat.jpg');
    this.addChild(cat);
  }

  resize() {
    var ratio = window.innerWidth / bg.width;
    console.log(bg.width);
    bg.scale.set(1, 1);
    console.log(ratio);
  }

}