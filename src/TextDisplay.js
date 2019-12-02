import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

let text = null;
let index = 15;
let trigger = null;

let lines = [
  "HEY THERE",
  "YES, YOU!",
  "I'M TALKING TO\nYOU, MADAM!",
  "GUESS WHAT?!",
  "IT'S YOUR BIRTHDAY!",
  "THAT'S\nRIGHT",
  "YOURS",
  "I SAID\nYOURS!",
  "AND NO ONE ELSE'S",
  "···",
  "OKAY MAYBE\nSOMEONE ELSE'S",
  "I MEAN,\nLET'S BE REAL",
  "THERE'S PROBABLY\nOTHER PEOPLE THAT\nSHARE YOUR BIRTHDAY",
  "BUT STILL",
  "IT'S YOURS AND\nIT'S SPECIAL",
  "BECAUSE YOU'RE\nSPECIAL!",
  "HOPE YOU'RE ENJOYING SAX CAT",
  "HE LEARNT THIS WHOLE\nSONG JUST FOR YOU",
  "TOOK HIM AGES",
  "I KNOW YOU\nLIKE CATS",
  "SO HERE'S A FEW MORE!",
  "",
  "PARTY TIME!",
  "AW YISS", "", "",
  "JUST LOOK AT 'EM GO",
  "", "", "",
  "OKAY, ENOUGH OF THAT!",
  "BACK TO BUSINESS",
  "I MEAN, I LIKE DANCING\nCATS AS MUCH AS\nTHE NEXT GUY",
  "BUT THERE'S A TIME\nAND A PLACE,\nYOU KNOW?",
  "···",
  "ANYWAY",
  "IT'S YOUR BIRTHDAY WEEKEND",
  "AND THAT MEANS SPOILS",
  "SO PACK YOUR\nBAGS, GIRL",
  "'CAUSE WE'RE GOING\nTO HERMANUS!"
];

export default class TextDisplay extends PIXI.Container {

  constructor(callback) {
    super();

    trigger = callback;

    text = new PIXI.Text('Example', {
      fontFamily: 'Impact',
      fill: 0xffffff, 
      align: 'center', 
      dropShadow: true, 
      dropShadowDistance: 7, 
      dropShadowAlpha: 0.75,
      dropShadowAngle: Math.PI/2,
      dropShadowBlur: 10
    });
    text.anchor.set(0.5);
    text.visible = false;
    this.addChild(text);

    setTimeout(() => this.setText(lines[0]), 2000);
  }

  setText(line) {
    if (line.length == 0)
    {
      setTimeout(() => this.nextLine(), 1000);
      return;
    }

    text.text = line;
    text.style.fontSize = 250;
    text.visible = true;

    while (text.width < window.innerWidth * 0.8 && text.height < window.innerHeight * 0.75)
      text.style.fontSize += 10;

    while (text.width > window.innerWidth * 0.8 || text.height > window.innerHeight * 0.75)
      text.style.fontSize -= 10;

    text.x = window.innerWidth/2;
    text.y = window.innerHeight/2;

    new Between(0, 1).time(700)
      .easing(Between.Easing.Elastic.Out)
      .on('update', (value) => {
        text.scale.x = text.scale.y = value;
      })
      .on('complete', (value) => {
        setTimeout(() => this.nextLine(), 500 + line.length * 100);
      });
  }

  nextLine() {
    index++;

    if (index >= lines.length)
      return;

    trigger(index);

    this.setText(lines[index]);
  }

  resize() {
    
  }
}