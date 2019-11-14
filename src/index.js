
import * as PIXI from 'pixi.js';
import {Howl, Howler} from 'howler';

var sound = new Howl({
  src: ['birthday.mp3']
});

sound.play();