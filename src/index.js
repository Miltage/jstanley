
import * as PIXI from 'pixi.js';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import {Howl, Howler} from 'howler';

import Scene from './Scene';
import JazzScene from './JazzScene';
import TextDisplay from './TextDisplay';
import ScreenSize from './ScreenSize';

var jazz_song = new Howl({
  src: ['birthday.mp3']
});

var party_song = new Howl({
  src: ['party.mp3']
});

jazz_song.play();
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
    policy: POLICY.FullWidth, // null | ExactFit | NoBorder | FullHeight | FullWidth | ShowAll
  };

  let rect = getScaledRect(options);
  scene.x = rect.x;
  scene.y = rect.y;
  scene.width = rect.width;
  scene.height = rect.height;
  scene.resize();

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
  .add('dancefloor.jpg')
  .add('birthday.mp3')
  .add('party.mp3')
  .add('discoball.png')
  .load(onAssetsLoaded)

function onAssetsLoaded () {
  scene = new JazzScene();
  app.stage.addChild(scene);
  td = new TextDisplay((index) => {
    scene.trigger(index);

    if (index == 19) {
      jazz_song.stop();
      party_song.play();
    }
  });
  app.stage.addChild(td);
  resize();
  scene.init();

  PIXI.Ticker.shared.add(function (time) {
    scene.sortChildren();
  });
}