var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var Note = (function (_super) {
        __extends(Note, _super);
        function Note() {
            _super.call(this);
            this.sound = "000";
            this.state = "init";
            this.addEvts();
            // this.cacheAs = "normal"
            // this.staticCache = true;
        }
        Note.prototype.addEvts = function () {
            var _this = this;
            this.stage.on(util.Evts.NOTE_MOVE, this, function () {
                switch (_this.state) {
                    case "queue":
                        laya.utils.Tween.to(_this, {
                            x: _this.x - util.Style.staffNoteSpace
                        }, util.Style.staffAnimationDelay);
                        break;
                    case "expect":
                        laya.utils.Tween.to(_this, {
                            x: util.Style.staffExpectX,
                            alpha: 1
                        }, util.Style.staffAnimationDelay, null, Handler.create(_this, function () {
                            _this.stage.event(util.Evts.NOTE_MOVE_END);
                        }));
                        break;
                    default:
                        break;
                }
            });
            this.stage.on(util.Evts.NOTE_HIT, this, function () {
                switch (_this.state) {
                    case "hit":
                        widget.Note.put(_this);
                        _this.stage.event(util.Evts.NOTE_HIT_END);
                        break;
                    default:
                        break;
                }
            });
        };
        Note.prototype.drawChildren = function () {
            this.graphics.clear();
            var color = util.Style.gray;
            this.alpha = this.state == "queue" ? 0.3 : 1;
            this.graphics.fillText(this.sound[1], 0, 0, "60px Arial", color, "center");
            var scale = parseInt(this.sound[0]) - 3;
            var semitone = parseInt(this.sound[2]);
            var scaleNum = Math.abs(scale);
            var scaleDirection = -1 * scale / scaleNum;
            var space = 15;
            var startY = scaleDirection > 0 ? 60 : 0;
            for (var i = 1; i <= scaleNum; i++) {
                var y = startY + space * i * scaleDirection;
                this.graphics.drawCircle(0, y, 5, util.Style.gray);
            }
            // this.reCache();
        };
        Note.get = function (sound, state) {
            if (state === void 0) { state = "queue"; }
            var s = laya.utils.Pool.getItemByClass("note", widget.Note);
            s.sound = sound;
            s.state = state;
            s.drawChildren();
            return s;
        };
        Note.put = function (note) {
            note.state = "init";
            note.graphics.clear();
            note.removeSelf();
            laya.utils.Pool.recover("note", note);
        };
        return Note;
    }(Sprite));
    widget.Note = Note;
})(widget || (widget = {}));
