module widget {
  export class Track extends Sprite {
    state: string = "init"
    hits: string[] = [] // 命中音符

    xCurr: number = 0
    yCurr: number = 0

    row: number = 0
    rowMax: number = util.Style.trackRowMax

    timer: laya.utils.Timer

    trackMap: any = {}

    constructor(){
      super()
      this.timer = new laya.utils.Timer();
      this.trackMap = {}
      this.row = 0
      this.xCurr = 0
      this.yCurr = 0
      this.addEvts();
      this.cacheAs = "bitmap"
      this.staticCache = true      
    }

    addEvts(){
      this.stage.on(util.Evts.STAFF_START, this, ()=>{
        this.graphics.clear();
        this.state = "ing"
        this.xCurr = 0
        this.yCurr = 0
        this.row = 0
        this.timer.loop(util.Style.trackDelay, this, this.mark, null, true);
      })

      this.stage.on(util.Evts.STAFF_END, this, ()=>{
        this.state = "end"
        this.timer.clearAll(this);
      })

      this.stage.on(util.Evts.STAFF_SOUND, this, (sound:string)=>{
        let info:any = {
          x: this.xCurr,
          y: this.yCurr,
          sound: sound
        }
        this.hits.push(info);
      })

      this.stage.on(util.Evts.NOTE_HIT_END, this, ()=>{
        let info:any = this.hits.shift();
        if(!info) return;
        let k = [info.x,info.y].join(",")
        this.addTrack(info);
        this.trackMap[k] = true;
      })
    }

    mark(){
      if(this.state == "end") return;

      let info = {
        x: this.xCurr,
        y: this.yCurr
      }
      this.xCurr += util.Style.trackH;
      if(this.xCurr >= util.Style.stageW){
        this.xCurr = 0;
        this.yCurr += util.Style.trackH;
        this.row++;
      }

      this.addTrack(info);

      if(this.row > this.rowMax){
        this.stage.event(util.Evts.STAFF_END)
      }
    }

    addTrack(info:any){
      let k = [info.x,info.y].join(",")
      if(this.trackMap[k]) return // 若已有音轨，忽略
      let color = util.Style.colorMap[info.sound] || util.Style.trackBg
      let h = util.Style.trackH
      this.graphics.drawLine(
        info.x, info.y, 
        info.x + h, info.y,
        color, h
      )

      this.reCache();
    }
  }
}