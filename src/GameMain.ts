// 程序入口
module game {
   export class Main{

       keyNum:number = 0;
       bg:Sprite

        constructor()
        {
            Laya.init(util.Style.stageW, util.Style.stageH, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            
            Laya.stage.scaleMode = "showall";
            Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
            Laya.stage.bgColor = "#ffffff";

            util.Style.buildColorMap();

            // Laya.Stat.show();            

            this.loadRes(()=>{
                this.addChildren();
                this.addEvts();         
            })
        }

        loadRes(handler:()=>void){

            let loaderUI = new widget.FiveLoader();
            Laya.stage.addChild(loaderUI);

            let urls = []

            // urls.push({url: "bg/7.png", type: Loader.IMAGE})
            for (var i = 1; i < 8; i++) {
                for (var r = 2; r < 5; r++) {
                    urls.push({url: ["sounds/",r, i, 0, ".mp3"].join(""), type: Loader.SOUND});
                    // if(i != 3 && i != 7){
                    //     urls.push({url:["sounds/",r, i, 5, ".mp3"].join(""), type: Loader.SOUND});
                    // }
                }
            }
            Laya.loader.maxLoader = 5;
            Laya.loader.load(
                urls,
                Handler.create(this, ()=>{
                    loaderUI.destroy(true);
                    handler();
                }),
                Handler.create(this, (process:number)=>{
                    Laya.stage.event(util.Evts.RES_LOAD, [Math.floor(process * 100)])
                }, null, false),
                null, 1, true
            );
        }



        onKeyDown(num:number){
            this.keyNum |= num;
            Laya.stage.event(util.Evts.KEY, [this.keyNum]);
        }

        onKeyUp(num:number){
            this.keyNum ^= num;
        }        

        addEvts(){
            let stage = Laya.stage;
            stage.on(util.Evts.KEY_DOWN, this, this.onKeyDown);
            stage.on(util.Evts.KEY_UP, this, this.onKeyUp);

            stage.on(util.Evts.STAFF_SOUND, this, (sound:string)=>{
                let url = ["sounds/", sound, ".mp3"].join("")
                laya.media.SoundManager.playSound(url);
            })
        }


        addChildren(){
            this.bg = new Sprite();
            this.bg.size(util.Style.stageW, util.Style.stageH);
            Laya.stage.addChild(this.bg);

            this.addKeys(); // 按键
            this.addKeyLine(); // 按键分割线
            this.addStaff(); // 五线谱
            this.addTrack(); // 音轨
            this.addRock(); // rock btn
            
            this.bg.cacheAs = "bitmap"
            this.bg.staticCache = true 

        }

        addRock(){
          let rock = new widget.Rock();
          rock.pos(0, util.Style.staffNoteY + util.Style.staffY);
          Laya.stage.addChild(rock);               
        }

        addTrack(){
            let s = new widget.Track();
            s.pos(0, 0)
            Laya.stage.addChild(s);
        }

        addStaff(){
            let s = new widget.Staff();
            s.pos(util.Style.staffX, util.Style.staffY);
            this.bg.addChild(s);
        }

        addKeys(){
            let y = util.Style.stageH - util.Style.keyH - 60;
            let w = util.Style.keyW;

            [1,2,4].forEach((num,i) => {
                let k = new widget.Key(num);
                k.pos(w * i ,y);
                this.bg.addChild(k);
            });
        }

        addKeyLine(){
            let s = this.bg;
            let w = util.Style.keyW;
            let x1 = w;
            let y1 = util.Style.stageH - util.Style.keyH;
            let y2 = util.Style.stageH - 60;

            for (var i = 0; i < 2; i++) {
                let x = x1 + w * i
                s.graphics.drawLine(x, y1, x, y2, util.Style.lightGray, 1);
            }
        }
    }
}

new game.Main();