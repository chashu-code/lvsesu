import Stage = Laya.Stage;
import WebGL = Laya.WebGL;
import Handler = laya.utils.Handler;
import Loader = laya.net.Loader;
import Browser = laya.utils.Browser;
import Sprite = laya.display.Sprite;
import Texture = laya.resource.Texture;
import Tween = laya.utils.Tween;
import Ease = laya.utils.Ease;
import Evt = laya.events.Event;

module util {
  export class Evts {
    static KEY_DOWN = "KEY_DOWN"
    static KEY_UP = "KEY_UP"
    static KEY = "KEY"

    static STAFF_START = "STAFF_START"
    static STAFF_NEXT = "STAFF_NEXT"
    static STAFF_SOUND = "STAFF_SOUND"
    static STAFF_END = "STAFF_END"

    static NOTE_MOVE = "NOTE_MOVE"
    static NOTE_MOVE_END = "NOTE_MOVE_END"
    static NOTE_HIT = "NOTE_HIT"
    static NOTE_HIT_END = "NOTE_HIT_END"

    static RES_LOAD = "RES_LOAD"
  }
}