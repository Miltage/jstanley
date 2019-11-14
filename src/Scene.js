import * as PIXI from 'pixi.js';

let texture = null;
let bg = null;

export default class Scene extends PIXI.Container {

  constructor(props) {
    super(props);

    texture = PIXI.Texture.from('jazzbar.jpg');
    bg = PIXI.Sprite.from(texture);
    this.addChild(bg);

    let cat = PIXI.Sprite.from('cat.jpg');
    this.addChild(cat);
  }

  resize() {
    console.log(bg);
    var ratio = Math.max(window.innerWidth / texture.width, window.innerHeight / texture.height);
    bg.scale.set(ratio, ratio);
  }

}