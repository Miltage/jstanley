import * as PIXI from 'pixi.js';
import Between from 'between.js';
import Easing from 'easing-functions';

import Scene from './Scene';
import SaxCat from './SaxCat';
import DanceCat from './DanceCat';
import DiscoBall from './DiscoBall';
import ScreenSize from './ScreenSize';

let saxcat;
let jazzbar;
let club;
let discoball;
let dance_cat1, dance_cat2, dance_cat3;

export default class JazzScene extends Scene {

  constructor(props) {
    super(props);

    jazzbar = PIXI.Sprite.from(PIXI.Texture.from('jazzbar.jpg'));
    this.addChild(jazzbar);

    club = PIXI.Sprite.from(PIXI.Texture.from('dancefloor.jpg'));
    club.visible = false;
    this.addChild(club);

    discoball = new DiscoBall();
    this.addChild(discoball);
  }

  init() {
    saxcat = new SaxCat();
    saxcat.x = this.width * 4;
    saxcat.y = this.height/2;
    this.addChild(saxcat);

    discoball.x = ScreenSize.width/2;
  }

  resize() {
    discoball.x = ScreenSize.width/2;
  }

  trigger(index) {
    if (index == 20) {
      dance_cat1 = new DanceCat({ file: "dancing_cat1" });
      dance_cat2 = new DanceCat({ file: "dancing_cat2" });
      dance_cat3 = new DanceCat({ file: "dancing_cat3" });
      this.addChild(dance_cat1);
      this.addChild(dance_cat2);
      this.addChild(dance_cat3);
    }
    else if (index == 21) {
      this.transition(jazzbar, club, () => {});
    }
    else if (index == 22) {
      discoball.drop();
    }
    else if (index == 30) {
      dance_cat1.leave();
      dance_cat2.leave();
      dance_cat3.leave();
      saxcat.leave();
      discoball.raise();
    }
  }

  transition(frame1, frame2, callback) {
    let time = 500;
    new Between(1, 0).time(time)
      .easing(Between.Easing.Cubic.InOut)
      .on('update', (value) => {
        frame1.alpha = value;
      })
      .on('complete', (value) => {
        frame1.visible = false;
        frame2.visible = true;
        new Between(0, 1).time(time)
          .easing(Between.Easing.Cubic.InOut)
          .on('update', (value) => {
            frame2.alpha = value;
          })
          .on('complete', callback);
      });
  }

}