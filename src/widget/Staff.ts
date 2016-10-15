module widget {
  export class Staff extends Sprite {

    sounds: string[]
    state: string = "init"

    notes: widget.Note[]
    noteExpect: widget.Note 

    musicList: string[] = [
    // "1241-2-4-1241+2++4+"  // PC 测试用
    //    "353236-|353236-|555|33253|2223|5-6-321", // 打电话
    //    "1155665|4433221|5544332|5544332|1155665|4433221", // 小星星
    //    "6-3333|21217-6-|66666|535543|36653|21217-6-3-|3-117-6-|3217-5-6-", // 兰花草
    //    "6-6-17-6-|6-6-323|3353|2217-6-5-3-|6-6-17-6-|6-6-323|3353|2221|7-6-6-5-6-|763|763|56643|763|763|56643|226-|224|32212|226-|11|27-6-6-5-6-", // 小草
    //    "665653|53323|221225|53323|665653|44323|55557|66656", // 抓泥鳅
    "5665|3432|23442765|5665|3432|2345-321|11641665|3456543|11641+665|3154211" // 小小少年

    ]    

    constructor(){
      super()
      this.notes = [];
      this.sounds = []
      this.addChildren();
      this.addEvts()
    }

    addChildren(){
      this.addStaff();
    }

    addStaff(){
      let w =  util.Style.stageW
      let y =  0
      let spaceUnit = w / 24

      for (var i = 0; i < 5; i++) {
        let space = spaceUnit * i
        this.graphics.drawLine(0, y + space, w, y + space, util.Style.lightGray, 1); 
      }      
    }

    addWaitQueue(){
      let startX = util.Style.staffQueueX
      let space = util.Style.staffNoteSpace

      for (var i = 0; i < 4; i++) {
        let sound = this.sounds.shift();
        let note = widget.Note.get(sound);      
        note.pos(startX + space * i, util.Style.staffNoteY + util.Style.staffY)
        this.stage.addChild(note);

        this.notes.push(note)  
      }
    }

    stateIs(...stateChecks: string[]) :boolean {
      return stateChecks.indexOf(this.state) >= 0 
    }

    stateIsnt(...stateChecks: string[]) :boolean{
      return !this.stateIs(...stateChecks)
    }

    addEvts(){
      // 开始
      this.stage.on(util.Evts.STAFF_START, this, ()=>{
        this.state = "init"
        let i = Math.floor(Math.random() * this.musicList.length);
        this.sounds = util.Sound.musicToSounds(this.musicList[i]);
        this.addWaitQueue();      
        this.stage.event(util.Evts.STAFF_NEXT);
      })

      this.stage.on(util.Evts.STAFF_END, this, ()=>{
          this.state = "end"

          this.notes.forEach(note => {
            widget.Note.put(note)
          });

          if(this.noteExpect){
            widget.Note.put(this.noteExpect)
          }       
      })

      // 下一个
      this.stage.on(util.Evts.STAFF_NEXT, this, ()=>{
        if(this.stateIsnt("init", "sound")) return
        this.state = "move"

        if(this.sounds.length > 0){ // 添加新队列音符
          let sound = this.sounds.shift();
          let note = widget.Note.get(sound, "queue");
          note.pos(util.Style.stageW, util.Style.staffNoteY + util.Style.staffY)  // 置于 stage 右外侧
          this.stage.addChild(note);
          this.notes.push(note);
        }

        if(this.notes.length == 0){ // 播放完
          this.stage.event(util.Evts.STAFF_END);
          return;
        }

        
        this.noteExpect = this.notes.shift();
        this.noteExpect.state = "expect"

        this.stage.event(util.Evts.NOTE_MOVE);
      })

      // 移动音符结束
      this.stage.on(util.Evts.NOTE_MOVE_END, this, ()=>{
        if(this.stateIsnt("move")) return
        this.state = "expect"
      })

      // 按下键盘
      this.stage.on(util.Evts.KEY, this, (keyNum:number)=>{
        if(this.stateIsnt("expect")) return // 不在期望状态
        let sound = this.noteExpect.sound;
        if(sound[1] != keyNum.toString()) return // 不匹配

        this.state = "sound"
        this.noteExpect.state = "hit"
        this.stage.event(util.Evts.STAFF_SOUND, [sound]) // 发声
        this.stage.event(util.Evts.NOTE_HIT) // 音符命中动画
      })



      // 音符命中动画结束
      this.stage.on(util.Evts.NOTE_HIT_END, this, ()=>{
        if(this.stateIsnt("sound")) return 
        this.stage.event(util.Evts.STAFF_NEXT) // 下一个        
      })
    }
  }
}