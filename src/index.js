
import * as PIXI from 'pixi.js';
import {Howl, Howler} from 'howler';
import Scene from './Scene.js';

var song = new Howl({
  src: ['birthday.mp3'],
  loop: true
});

//song.play();

const app = new PIXI.Application({ resizeTo: window });

let scene = new Scene();

app.stage.addChild(scene);

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

  app.stage.scale.set(scaleFactor);
  scene.resize();
};

window.addEventListener('resize', resize, false);
resize();