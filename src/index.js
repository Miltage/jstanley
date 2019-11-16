
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

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const logicalWidth = 1024;
const logicalHeight = 680;

const resize = () => {

  let options = {
    // window, canvas or any other thing
    container: new Size(window.innerWidth, window.innerHeight),
    // some dependent size. image, figure etc.
    target: new Size(logicalWidth, logicalHeight),
    // policy is optional. default is null
    policy: POLICY.ShowAll, // null | ExactFit | NoBorder | FullHeight | FullWidth | ShowAll
  };

  // calculate new rectangle
  let rect = getScaledRect(options);

  // apply calculated rectangle
  // horizontal center inside a window
  app.stage.x = rect.x;
  // vertical center inside a window
  app.stage.y = rect.y;
  // new scaled width
  app.stage.width = rect.width;
  // new scaled height
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