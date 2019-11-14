
import * as PIXI from 'pixi.js';
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

const logicalWidth = 1280;
const logicalHeight = 720;

const resize = () => {
  var scaleFactor = Math.min(
    window.innerWidth / logicalWidth,
    window.innerHeight / logicalHeight
  );
  
  scene.resize();

  app.stage.scale.set(scaleFactor);
  app.stage.y = window.innerHeight/2 - app.stage.height/2;
  app.stage.x = window.innerWidth/2 - app.stage.width/2;
};

window.addEventListener('resize', resize, false);

PIXI.Loader.shared
  .add('cat.jpg')
  .add('jazzbar.jpg')
  .load(onAssetsLoaded)

function onAssetsLoaded () {
  scene = new Scene();
  app.stage.addChild(scene);
  resize();
}