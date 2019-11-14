import * as PIXI from 'pixi.js';

export default class Scene extends PIXI.Container {

  constructor(props) {
    super(props);

    let cat = PIXI.Sprite.from('cat.jpg');
    this.addChild(cat);
  }

}