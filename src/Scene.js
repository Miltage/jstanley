import * as PIXI from 'pixi.js';

let texture = null;
let bg = null;

export default class Scene extends PIXI.Container {

  constructor(props) {
    super(props);

    texture = PIXI.Texture.from('jazzbar.jpg');
    bg = PIXI.Sprite.from(texture);
    this.addChild(bg);

    let cat = PIXI.Sprite.from('cat.png');
    cat.x = this.width/2 - cat.width/2;
    cat.y = this.height/2 - cat.height/2;
    this.addChild(cat);
  }

  resize() {
    var ratio = Math.max(1280 / texture.width, 720 / texture.height);
    bg.scale.set(ratio, ratio);
  }

}