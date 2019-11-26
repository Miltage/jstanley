import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

let text = null;
let index = 0;

let lines = [
  "HEY THERE",
  "YES, YOU!",
  "I'M TALKING TO\nYOU, MADAM!",
  "GUESS WHAT?!",
  "IT'S YOUR BIRTHDAY!",
  "THAT'S\nRIGHT",
  "YOURS",
  "I SAID\nYOURS!",
  "AND NO ONE ELSES",
  "···",
  "OKAY MAYBE\nSOMEONE ELSES",
  "I MEAN,\nLET'S BE REAL",
  "THERE'S PROBABLY\nOTHER PEOPLE THAT\nSHARE YOUR BIRTHDAY",
  "BUT STILL",
  "IT'S YOURS AND\nIT'S SPECIAL",
  "BECAUSE YOU'RE\nSPECIAL!"
];

export default class TextDisplay extends PIXI.Container {

  constructor(props) {
    super(props);

    text = new PIXI.Text('Example', {
      fontFamily: 'Impact',
      fill: 0xffffff, 
      align: 'center', 
      dropShadow: true, 
      dropShadowDistance: 10, 
      dropShadowAlpha: 0.9,
      dropShadowAngle: Math.PI/2,
      dropShadowBlur: 20
    });
    text.anchor.set(0.5);
    text.visible = false;
    this.addChild(text);

    setTimeout(() => this.setText(lines[0]), 2000);
  }

  setText(line) {
    text.text = line;
    text.style.fontSize = 250;
    text.visible = true;

    while (text.width < window.innerWidth * 0.8 && text.height < window.innerHeight * 0.75)
      text.style.fontSize += 10;

    while (text.width > window.innerWidth * 0.8 || text.height > window.innerHeight * 0.75)
      text.style.fontSize -= 10;

    text.x = window.innerWidth/2;
    text.y = window.innerHeight/2;

    new Between(0, 1).time(500)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        text.scale.x = text.scale.y = value;
      })
      .on('complete', (value) => {
        setTimeout(() => this.nextLine(), 1200 + line.length * 140);
      });
  }

  nextLine() {
    index++;

    if (index >= lines.length)
      return;

    this.setText(lines[index]);
  }
}