var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var Browser = laya.utils.Browser;
var Sprite = laya.display.Sprite;
var Texture = laya.resource.Texture;
var Tween = laya.utils.Tween;
var Ease = laya.utils.Ease;
var Evt = laya.events.Event;
var util;
(function (util) {
    var Evts = (function () {
        function Evts() {
        }
        Evts.KEY_DOWN = "KEY_DOWN";
        Evts.KEY_UP = "KEY_UP";
        Evts.KEY = "KEY";
        Evts.STAFF_START = "STAFF_START";
        Evts.STAFF_NEXT = "STAFF_NEXT";
        Evts.STAFF_SOUND = "STAFF_SOUND";
        Evts.STAFF_END = "STAFF_END";
        Evts.NOTE_MOVE = "NOTE_MOVE";
        Evts.NOTE_MOVE_END = "NOTE_MOVE_END";
        Evts.NOTE_HIT = "NOTE_HIT";
        Evts.NOTE_HIT_END = "NOTE_HIT_END";
        Evts.RES_LOAD = "RES_LOAD";
        return Evts;
    }());
    util.Evts = Evts;
})(util || (util = {}));
