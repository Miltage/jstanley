import * as PIXI from 'pixi.js';

import Scene from './Scene';
import SaxCat from './SaxCat';

let saxcat = null;

export default class JazzScene extends Scene {

  constructor(props) {
    super(props);

    let texture = PIXI.Texture.from('jazzbar.jpg');
    let bg = PIXI.Sprite.from(texture);
    this.addChild(bg);

    let saxcat = new SaxCat();
    saxcat.x = this.width * 2;
    saxcat.y = this.height/2;
    this.addChild(saxcat);
  }

}