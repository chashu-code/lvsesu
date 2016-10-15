module widget {
  export class Key extends Sprite {

    private lump: Sprite;
    private num: number;
    private lumpStartY: number;
    constructor(num:number){
      super();
      this.num = num;
      this.createChildren();
      this.addEvts();
    }

    addEvts(){
      this.on(Evt.MOUSE_DOWN, this, this.onMouseDown);
      this.on(Evt.MOUSE_UP, this, this.onMouseUp);
    }    

    onMouseDown(){
      this.stage.event(util.Evts.KEY_DOWN, [this.num]);
      // laya.utils.Tween.to(this.lump, {y: 0}, 300, Ease.quintOut, null, 0, true);
    }

    onMouseUp(){
      this.stage.event(util.Evts.KEY_UP, [this.num]);
      // laya.utils.Tween.to(this.lump, {y: this.lumpStartY}, 600, Ease.quintOut, null, 0, true);
    }

    createChildren(){
      this.size(util.Style.keyW, util.Style.keyH);
      // this.createLump();
      this.createSymbol();
      // this.graphics.drawRect(0, 0, util.Style.keyW, util.Style.keyH, null, util.Style.gray, 1);
    }

    createSymbol(){
      let s = this;
      let w = Math.round(util.Style.keyW / 3);
      let y = util.Style.keyH / 2;
      let x = w;

      let v = this.num;
      switch (v) {
        case 2:
          s.graphics.drawLine(x, y - 10, x+w, y - 10, util.Style.lightGray, 3);
          s.graphics.drawLine(x, y + 10, x+w, y + 10, util.Style.lightGray, 3);
          break;
        case 4:
          s.graphics.drawLine(x, y - 30, x+w, y - 30, util.Style.lightGray, 3);
          s.graphics.drawLine(x, y - 10, x+w, y - 10, util.Style.lightGray, 3);
          s.graphics.drawLine(x, y + 10, x+w, y + 10, util.Style.lightGray, 3);
          s.graphics.drawLine(x, y + 30, x+w, y + 30, util.Style.lightGray, 3);        
          break;
        default:
          s.graphics.drawLine(x, y, x+w, y, util.Style.lightGray,3);
          break;
      }
    }

    // createLump(){
    //   let s = new Sprite();
    //   let hUnit = 29;
    //   let w = util.Style.keyW - 1;
    //   let g = s.graphics;
    //   let y = 0;
    //   let h = 0;

    //   this.lumpStartY = util.Style.keyH - hUnit;

    //   util.Style.colorMap[this.num.toString()].forEach((color,i) => {
    //     h = hUnit * (i + 1)
    //     g.drawRect(0, y, w, h, color);
    //     y += h
    //   });
    //   this.lump = s;
    //   s.pos(0, this.lumpStartY);
    //   this.addChild(s);
    // }
  }
}