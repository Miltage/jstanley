
import * as PIXI from 'pixi.js';
import {Howl, Howler} from 'howler';
import Scene from './Scene.js';

var song = new Howl({
  src: ['birthday.mp3'],
  loop: true
});

//song.play();

const logicalWidth = 320;
const logicalHeight = 240;
let scaleFactor = 0;
let renderer = null;
let stage = null;

const animate = () => {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  renderer.render(stage);
};

const resizeHandler = () => {
  scaleFactor = Math.floor(Math.min(
    window.innerWidth / logicalWidth,
    window.innerHeight / logicalHeight
  ));
  const newWidth = Math.ceil(logicalWidth * (window.innerWidth / logicalWidth));
  const newHeight = Math.ceil(logicalHeight * (window.innerHeight / logicalHeight));
  
  renderer.view.style.width = `${newWidth}px`;
  renderer.view.style.height = `${newHeight}px`;

  renderer.resize(newWidth, newHeight);
};

const init = () => {
  renderer = PIXI.autoDetectRenderer(logicalWidth, logicalHeight, {
    roundPixels: true,
    resolution: window.devicePixelRatio || 1
  });
  renderer.view.id = 'pixi-canvas';

  renderer.view.addEventListener('contextmenu', (e) => {
    window.wasRightClick = true;
    e.preventDefault();
  });

  PIXI.settings.ROUND_PIXELS = true;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  
  stage = new PIXI.Container();

  var scene = new Scene();
  stage.addChild(scene);
  
  document.body.appendChild(renderer.view);
  window.addEventListener('resize', resizeHandler, false);
  resizeHandler();
  
  renderer.backgroundColor = 0xdefec8;

  PIXI.Loader.shared.add("cat.jpg")
    .on("progress", loadProgressHandler)
    .load(setup);

  function loadProgressHandler(loader, resource) {
    //Display the file `url` currently being loaded
    //console.log("loading: " + resource.url);
    //Display the precentage of files currently loaded
    //console.log("progress: " + loader.progress + "%"); 
  }
}

const setup = () => {
  animate();
};

init();