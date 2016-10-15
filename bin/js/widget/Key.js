var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var Key = (function (_super) {
        __extends(Key, _super);
        function Key(num) {
            _super.call(this);
            this.num = num;
            this.createChildren();
            this.addEvts();
        }
        Key.prototype.addEvts = function () {
            this.on(Evt.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Evt.MOUSE_UP, this, this.onMouseUp);
        };
        Key.prototype.onMouseDown = function () {
            this.stage.event(util.Evts.KEY_DOWN, [this.num]);
            // laya.utils.Tween.to(this.lump, {y: 0}, 300, Ease.quintOut, null, 0, true);
        };
        Key.prototype.onMouseUp = function () {
            this.stage.event(util.Evts.KEY_UP, [this.num]);
            // laya.utils.Tween.to(this.lump, {y: this.lumpStartY}, 600, Ease.quintOut, null, 0, true);
        };
        Key.prototype.createChildren = function () {
            this.size(util.Style.keyW, util.Style.keyH);
            // this.createLump();
            this.createSymbol();
            // this.graphics.drawRect(0, 0, util.Style.keyW, util.Style.keyH, null, util.Style.gray, 1);
        };
        Key.prototype.createSymbol = function () {
            var s = this;
            var w = Math.round(util.Style.keyW / 3);
            var y = util.Style.keyH / 2;
            var x = w;
            var v = this.num;
            switch (v) {
                case 2:
                    s.graphics.drawLine(x, y - 10, x + w, y - 10, util.Style.lightGray, 3);
                    s.graphics.drawLine(x, y + 10, x + w, y + 10, util.Style.lightGray, 3);
                    break;
                case 4:
                    s.graphics.drawLine(x, y - 30, x + w, y - 30, util.Style.lightGray, 3);
                    s.graphics.drawLine(x, y - 10, x + w, y - 10, util.Style.lightGray, 3);
                    s.graphics.drawLine(x, y + 10, x + w, y + 10, util.Style.lightGray, 3);
                    s.graphics.drawLine(x, y + 30, x + w, y + 30, util.Style.lightGray, 3);
                    break;
                default:
                    s.graphics.drawLine(x, y, x + w, y, util.Style.lightGray, 3);
                    break;
            }
        };
        return Key;
    }(Sprite));
    widget.Key = Key;
})(widget || (widget = {}));
