var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget;
(function (widget) {
    var Staff = (function (_super) {
        __extends(Staff, _super);
        function Staff() {
            _super.call(this);
            this.state = "init";
            this.musicList = [
                // "1241-2-4-1241+2++4+"  // PC 测试用
                //    "353236-|353236-|555|33253|2223|5-6-321", // 打电话
                //    "1155665|4433221|5544332|5544332|1155665|4433221", // 小星星
                //    "6-3333|21217-6-|66666|535543|36653|21217-6-3-|3-117-6-|3217-5-6-", // 兰花草
                //    "6-6-17-6-|6-6-323|3353|2217-6-5-3-|6-6-17-6-|6-6-323|3353|2221|7-6-6-5-6-|763|763|56643|763|763|56643|226-|224|32212|226-|11|27-6-6-5-6-", // 小草
                //    "665653|53323|221225|53323|665653|44323|55557|66656", // 抓泥鳅
                "5665|3432|23442765|5665|3432|2345-321|11641665|3456543|11641+665|3154211" // 小小少年
            ];
            this.notes = [];
            this.sounds = [];
            this.addChildren();
            this.addEvts();
        }
        Staff.prototype.addChildren = function () {
            this.addStaff();
        };
        Staff.prototype.addStaff = function () {
            var w = util.Style.stageW;
            var y = 0;
            var spaceUnit = w / 24;
            for (var i = 0; i < 5; i++) {
                var space = spaceUnit * i;
                this.graphics.drawLine(0, y + space, w, y + space, util.Style.lightGray, 1);
            }
        };
        Staff.prototype.addWaitQueue = function () {
            var startX = util.Style.staffQueueX;
            var space = util.Style.staffNoteSpace;
            for (var i = 0; i < 4; i++) {
                var sound = this.sounds.shift();
                var note = widget.Note.get(sound);
                note.pos(startX + space * i, util.Style.staffNoteY + util.Style.staffY);
                this.stage.addChild(note);
                this.notes.push(note);
            }
        };
        Staff.prototype.stateIs = function () {
            var stateChecks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                stateChecks[_i - 0] = arguments[_i];
            }
            return stateChecks.indexOf(this.state) >= 0;
        };
        Staff.prototype.stateIsnt = function () {
            var stateChecks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                stateChecks[_i - 0] = arguments[_i];
            }
            return !this.stateIs.apply(this, stateChecks);
        };
        Staff.prototype.addEvts = function () {
            var _this = this;
            // 开始
            this.stage.on(util.Evts.STAFF_START, this, function () {
                _this.state = "init";
                var i = Math.floor(Math.random() * _this.musicList.length);
                _this.sounds = util.Sound.musicToSounds(_this.musicList[i]);
                _this.addWaitQueue();
                _this.stage.event(util.Evts.STAFF_NEXT);
            });
            this.stage.on(util.Evts.STAFF_END, this, function () {
                _this.state = "end";
                _this.notes.forEach(function (note) {
                    widget.Note.put(note);
                });
                if (_this.noteExpect) {
                    widget.Note.put(_this.noteExpect);
                }
            });
            // 下一个
            this.stage.on(util.Evts.STAFF_NEXT, this, function () {
                if (_this.stateIsnt("init", "sound"))
                    return;
                _this.state = "move";
                if (_this.sounds.length > 0) {
                    var sound = _this.sounds.shift();
                    var note = widget.Note.get(sound, "queue");
                    note.pos(util.Style.stageW, util.Style.staffNoteY + util.Style.staffY); // 置于 stage 右外侧
                    _this.stage.addChild(note);
                    _this.notes.push(note);
                }
                if (_this.notes.length == 0) {
                    _this.stage.event(util.Evts.STAFF_END);
                    return;
                }
                _this.noteExpect = _this.notes.shift();
                _this.noteExpect.state = "expect";
                _this.stage.event(util.Evts.NOTE_MOVE);
            });
            // 移动音符结束
            this.stage.on(util.Evts.NOTE_MOVE_END, this, function () {
                if (_this.stateIsnt("move"))
                    return;
                _this.state = "expect";
            });
            // 按下键盘
            this.stage.on(util.Evts.KEY, this, function (keyNum) {
                if (_this.stateIsnt("expect"))
                    return; // 不在期望状态
                var sound = _this.noteExpect.sound;
                if (sound[1] != keyNum.toString())
                    return; // 不匹配
                _this.state = "sound";
                _this.noteExpect.state = "hit";
                _this.stage.event(util.Evts.STAFF_SOUND, [sound]); // 发声
                _this.stage.event(util.Evts.NOTE_HIT); // 音符命中动画
            });
            // 音符命中动画结束
            this.stage.on(util.Evts.NOTE_HIT_END, this, function () {
                if (_this.stateIsnt("sound"))
                    return;
                _this.stage.event(util.Evts.STAFF_NEXT); // 下一个        
            });
        };
        return Staff;
    }(Sprite));
    widget.Staff = Staff;
})(widget || (widget = {}));
