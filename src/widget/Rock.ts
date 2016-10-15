module widget {
 export class Rock extends Sprite {
   constructor(){
     super()

     this.addChildren()
     this.addEvts()
   }

   addChildren(){
     let w = util.Style.stageW
     this.size(w, util.Style.staffH)
     this.graphics.fillText("Rock", w/2, 0, "60px Arial", util.Style.gray, "center")
   }

   addEvts(){
     this.stage.on(util.Evts.STAFF_END, this, ()=>{
       this.visible = true
     })
     this.on(laya.events.Event.CLICK, this, ()=>{
       if(!this.visible) return 
       this.visible = false 
       this.stage.event(util.Evts.STAFF_START);
     })
   }
 } 
}