module widget {
  export class FiveLoader extends Sprite {
    yStart: number 
    w: number
    txt: Sprite 

    constructor(){
      super();

      this.addChildren();
      this.addEvts();
    }

    addChildren(){
      this.w = util.Style.stageW / 3;
      this.yStart = this.w + this.w/2;
      this.addBackground();
      this.addText();
      this.cacheAs = "bitmap"
      this.staticCache = true
    }

    addBackground(){
      let w =  this.w
      let y =  this.yStart
      let spaceUnit = w / 8

      for (var i = 0; i < 5; i++) {
        let space = spaceUnit * i
        this.graphics.drawLine(w, y + space, w*2, y + space, util.Style.gray, 1); 
      }
    }

    addText(){
      this.txt = new Sprite();
      let s = this.txt;
      this.addChild(s);
      s.pos(this.w + this.w/2, this.yStart + this.w/8)
    }

    addEvts(){
      this.stage.on(util.Evts.RES_LOAD, this, (process)=>{
        let g = this.txt.graphics;
        g.clear();
        g.fillText(process + "%", 0, 0, "50px Arial", util.Style.gray, "center");
        this.reCache();
      })
    }
  }
}