class ScreenSize {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.rect = null;
  }
}

export default (new ScreenSize);