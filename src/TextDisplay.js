import * as PIXI from 'pixi.js';
import Between from 'between.js';

export default class TextDisplay extends PIXI.Container {

  constructor(props) {
    super(props);

    let text = new PIXI.Text('Hello World', {fontFamily : 'Arial', fontSize: 160, fill : 0xffffff, align : 'center'});
    this.addChild(text);

    text.x = 200;
    text.y = 200;
  }
}