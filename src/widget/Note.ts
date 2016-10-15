module widget {
  export class Note extends Sprite {
    sound:string = "000"
    state:string = "init"
    
    constructor(){
      super();

      this.addEvts();
      // this.cacheAs = "normal"
      // this.staticCache = true;
    }

    addEvts(){
      this.stage.on(util.Evts.NOTE_MOVE, this, ()=>{
            switch (this.state) {
              case "queue":
                laya.utils.Tween.to(this, {
                  x: this.x - util.Style.staffNoteSpace
                }, util.Style.staffAnimationDelay);
                break;
              case "expect":
                laya.utils.Tween.to(this, {
                  x: util.Style.staffExpectX,
                  alpha: 1
                }, util.Style.staffAnimationDelay, null, Handler.create(this, ()=>{
                  this.stage.event(util.Evts.NOTE_MOVE_END)
                }))
                break;
              default:
                break;
            }
        })


        this.stage.on(util.Evts.NOTE_HIT, this, ()=>{
            switch (this.state) {
              case "hit":
                widget.Note.put(this);
                this.stage.event(util.Evts.NOTE_HIT_END);
                break;
              default:
                break;
            }
        })
    }

    drawChildren(){
      this.graphics.clear();
      let color =  util.Style.gray;
      this.alpha = this.state == "queue" ? 0.3 : 1
      this.graphics.fillText(this.sound[1], 0, 0, "60px Arial", color, "center")

      let scale = parseInt(this.sound[0]) - 3
      let semitone = parseInt(this.sound[2])
      let scaleNum = Math.abs(scale)
      let scaleDirection = -1 * scale / scaleNum
      let space = 15
      let startY = scaleDirection > 0 ? 60 : 0

      for (var i = 1; i <= scaleNum; i++) {
        let y = startY + space * i * scaleDirection 
        this.graphics.drawCircle(0, y, 5, util.Style.gray);        
      }

      // this.reCache();
    }


    static get(sound:string, state:string = "queue"): widget.Note {
      let s = laya.utils.Pool.getItemByClass("note", widget.Note);
      s.sound = sound;
      s.state = state;
      s.drawChildren();
      return s;
    }

    static put(note:widget.Note){
      note.state = "init"
      note.graphics.clear()
      note.removeSelf();
      laya.utils.Pool.recover("note", note);
    }
  }
}