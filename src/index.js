
import * as PIXI from 'pixi.js';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import {Howl, Howler} from 'howler';

import Scene from './Scene';
import JazzScene from './JazzScene';
import TextDisplay from './TextDisplay';
import ScreenSize from './ScreenSize';

var song = new Howl({
  src: ['birthday.mp3'],
  loop: true
});

//song.play();
var context = new AudioContext();
context.resume();

let scene = null;
let td = null;

const app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);

const logicalWidth = 1024;
const logicalHeight = 680;

const resize = () => {

  let options = {
    container: new Size(window.innerWidth, window.innerHeight),
    target: new Size(logicalWidth, logicalHeight),
    policy: POLICY.NoBorder, // null | ExactFit | NoBorder | FullHeight | FullWidth | ShowAll
  };

  let rect = getScaledRect(options);
  scene.x = rect.x;
  scene.y = rect.y;
  scene.width = rect.width;
  scene.height = rect.height;

  ScreenSize.width = rect.width / scene.scale.x;
  ScreenSize.height = rect.height / scene.scale.y;
};

window.addEventListener('resize', resize, false);

PIXI.Loader.shared
  .add('saxcat.png')
  .add('jazzbar.jpg')
  .add('dancing_cat1.png')
  .add('dancing_cat2.png')
  .add('dancing_cat3.png')
  .load(onAssetsLoaded)

function onAssetsLoaded () {
  scene = new JazzScene();
  app.stage.addChild(scene);
  td = new TextDisplay();
  app.stage.addChild(td);
  resize();
  scene.init();
}