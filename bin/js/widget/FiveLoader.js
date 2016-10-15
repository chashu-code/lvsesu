var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var FiveLoader = (function (_super) {
        __extends(FiveLoader, _super);
        function FiveLoader() {
            _super.call(this);
            this.addChildren();
            this.addEvts();
        }
        FiveLoader.prototype.addChildren = function () {
            this.w = util.Style.stageW / 3;
            this.yStart = this.w + this.w / 2;
            this.addBackground();
            this.addText();
            this.cacheAs = "bitmap";
            this.staticCache = true;
        };
        FiveLoader.prototype.addBackground = function () {
            var w = this.w;
            var y = this.yStart;
            var spaceUnit = w / 8;
            for (var i = 0; i < 5; i++) {
                var space = spaceUnit * i;
                this.graphics.drawLine(w, y + space, w * 2, y + space, util.Style.gray, 1);
            }
        };
        FiveLoader.prototype.addText = function () {
            this.txt = new Sprite();
            var s = this.txt;
            this.addChild(s);
            s.pos(this.w + this.w / 2, this.yStart + this.w / 8);
        };
        FiveLoader.prototype.addEvts = function () {
            var _this = this;
            this.stage.on(util.Evts.RES_LOAD, this, function (process) {
                var g = _this.txt.graphics;
                g.clear();
                g.fillText(process + "%", 0, 0, "50px Arial", util.Style.gray, "center");
                _this.reCache();
            });
        };
        return FiveLoader;
    }(Sprite));
    widget.FiveLoader = FiveLoader;
})(widget || (widget = {}));
