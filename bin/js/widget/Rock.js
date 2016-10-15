var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var Rock = (function (_super) {
        __extends(Rock, _super);
        function Rock() {
            _super.call(this);
            this.addChildren();
            this.addEvts();
        }
        Rock.prototype.addChildren = function () {
            var w = util.Style.stageW;
            this.size(w, util.Style.staffH);
            this.graphics.fillText("Rock", w / 2, 0, "60px Arial", util.Style.gray, "center");
        };
        Rock.prototype.addEvts = function () {
            var _this = this;
            this.stage.on(util.Evts.STAFF_END, this, function () {
                _this.visible = true;
            });
            this.on(laya.events.Event.CLICK, this, function () {
                if (!_this.visible)
                    return;
                _this.visible = false;
                _this.stage.event(util.Evts.STAFF_START);
            });
        };
        return Rock;
    }(Sprite));
    widget.Rock = Rock;
})(widget || (widget = {}));
