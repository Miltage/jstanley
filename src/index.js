
import * as PIXI from 'pixi.js';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import {Howl, Howler} from 'howler';
import Scene from './Scene.js';

var song = new Howl({
  src: ['birthday.mp3'],
  loop: true
});

//song.play();

let scene = null;

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
  app.stage.x = rect.x;
  app.stage.y = rect.y;
  app.stage.width = rect.width;
  app.stage.height = rect.height;
};

window.addEventListener('resize', resize, false);

PIXI.Loader.shared
  .add('cat.png')
  .add('jazzbar.jpg')
  .load(onAssetsLoaded)

function onAssetsLoaded () {
  scene = new Scene();
  app.stage.addChild(scene);
  resize();
}