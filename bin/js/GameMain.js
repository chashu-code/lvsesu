// 程序入口
var game;
(function (game) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.keyNum = 0;
            Laya.init(util.Style.stageW, util.Style.stageH, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
            Laya.stage.bgColor = "#ffffff";
            util.Style.buildColorMap();
            // Laya.Stat.show();            
            this.loadRes(function () {
                _this.addChildren();
                _this.addEvts();
            });
        }
        Main.prototype.loadRes = function (handler) {
            var loaderUI = new widget.FiveLoader();
            Laya.stage.addChild(loaderUI);
            var urls = [];
            // urls.push({url: "bg/7.png", type: Loader.IMAGE})
            for (var i = 1; i < 8; i++) {
                for (var r = 2; r < 5; r++) {
                    urls.push({ url: ["sounds/", r, i, 0, ".mp3"].join(""), type: Loader.SOUND });
                }
            }
            Laya.loader.maxLoader = 5;
            Laya.loader.load(urls, Handler.create(this, function () {
                loaderUI.destroy(true);
                handler();
            }), Handler.create(this, function (process) {
                Laya.stage.event(util.Evts.RES_LOAD, [Math.floor(process * 100)]);
            }, null, false), null, 1, true);
        };
        Main.prototype.onKeyDown = function (num) {
            this.keyNum |= num;
            Laya.stage.event(util.Evts.KEY, [this.keyNum]);
        };
        Main.prototype.onKeyUp = function (num) {
            this.keyNum ^= num;
        };
        Main.prototype.addEvts = function () {
            var stage = Laya.stage;
            stage.on(util.Evts.KEY_DOWN, this, this.onKeyDown);
            stage.on(util.Evts.KEY_UP, this, this.onKeyUp);
            stage.on(util.Evts.STAFF_SOUND, this, function (sound) {
                var url = ["sounds/", sound, ".mp3"].join("");
                laya.media.SoundManager.playSound(url);
            });
        };
        Main.prototype.addChildren = function () {
            this.bg = new Sprite();
            this.bg.size(util.Style.stageW, util.Style.stageH);
            Laya.stage.addChild(this.bg);
            this.addKeys(); // 按键
            this.addKeyLine(); // 按键分割线
            this.addStaff(); // 五线谱
            this.addTrack(); // 音轨
            this.addRock(); // rock btn
            this.bg.cacheAs = "bitmap";
            this.bg.staticCache = true;
        };
        Main.prototype.addRock = function () {
            var rock = new widget.Rock();
            rock.pos(0, util.Style.staffNoteY + util.Style.staffY);
            Laya.stage.addChild(rock);
        };
        Main.prototype.addTrack = function () {
            var s = new widget.Track();
            s.pos(0, 0);
            Laya.stage.addChild(s);
        };
        Main.prototype.addStaff = function () {
            var s = new widget.Staff();
            s.pos(util.Style.staffX, util.Style.staffY);
            this.bg.addChild(s);
        };
        Main.prototype.addKeys = function () {
            var _this = this;
            var y = util.Style.stageH - util.Style.keyH - 60;
            var w = util.Style.keyW;
            [1, 2, 4].forEach(function (num, i) {
                var k = new widget.Key(num);
                k.pos(w * i, y);
                _this.bg.addChild(k);
            });
        };
        Main.prototype.addKeyLine = function () {
            var s = this.bg;
            var w = util.Style.keyW;
            var x1 = w;
            var y1 = util.Style.stageH - util.Style.keyH;
            var y2 = util.Style.stageH - 60;
            for (var i = 0; i < 2; i++) {
                var x = x1 + w * i;
                s.graphics.drawLine(x, y1, x, y2, util.Style.lightGray, 1);
            }
        };
        return Main;
    }());
    game.Main = Main;
})(game || (game = {}));
new game.Main();
