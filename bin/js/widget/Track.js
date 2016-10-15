var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var Track = (function (_super) {
        __extends(Track, _super);
        function Track() {
            _super.call(this);
            this.state = "init";
            this.hits = []; // 命中音符
            this.xCurr = 0;
            this.yCurr = 0;
            this.row = 0;
            this.rowMax = util.Style.trackRowMax;
            this.trackMap = {};
            this.timer = new laya.utils.Timer();
            this.trackMap = {};
            this.row = 0;
            this.xCurr = 0;
            this.yCurr = 0;
            this.addEvts();
            this.cacheAs = "bitmap";
            this.staticCache = true;
        }
        Track.prototype.addEvts = function () {
            var _this = this;
            this.stage.on(util.Evts.STAFF_START, this, function () {
                _this.graphics.clear();
                _this.state = "ing";
                _this.xCurr = 0;
                _this.yCurr = 0;
                _this.row = 0;
                _this.timer.loop(util.Style.trackDelay, _this, _this.mark, null, true);
            });
            this.stage.on(util.Evts.STAFF_END, this, function () {
                _this.state = "end";
                _this.timer.clearAll(_this);
            });
            this.stage.on(util.Evts.STAFF_SOUND, this, function (sound) {
                var info = {
                    x: _this.xCurr,
                    y: _this.yCurr,
                    sound: sound
                };
                _this.hits.push(info);
            });
            this.stage.on(util.Evts.NOTE_HIT_END, this, function () {
                var info = _this.hits.shift();
                if (!info)
                    return;
                var k = [info.x, info.y].join(",");
                _this.addTrack(info);
                _this.trackMap[k] = true;
            });
        };
        Track.prototype.mark = function () {
            if (this.state == "end")
                return;
            var info = {
                x: this.xCurr,
                y: this.yCurr
            };
            this.xCurr += util.Style.trackH;
            if (this.xCurr >= util.Style.stageW) {
                this.xCurr = 0;
                this.yCurr += util.Style.trackH;
                this.row++;
            }
            this.addTrack(info);
            if (this.row > this.rowMax) {
                this.stage.event(util.Evts.STAFF_END);
            }
        };
        Track.prototype.addTrack = function (info) {
            var k = [info.x, info.y].join(",");
            if (this.trackMap[k])
                return; // 若已有音轨，忽略
            var color = util.Style.colorMap[info.sound] || util.Style.trackBg;
            var h = util.Style.trackH;
            this.graphics.drawLine(info.x, info.y, info.x + h, info.y, color, h);
            this.reCache();
        };
        return Track;
    }(Sprite));
    widget.Track = Track;
})(widget || (widget = {}));
