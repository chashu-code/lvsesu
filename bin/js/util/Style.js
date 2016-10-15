var util;
(function (util) {
    var Style = (function () {
        function Style() {
        }
        Style.buildColorMap = function () {
            var cls = util.Style;
            var cMap = cls.colorMap;
            var k = "";
            var color = "";
            for (var r = 1; r <= 5; r++) {
                for (var n = 1; n <= 7; n++) {
                    k = [r, n, "0"].join("");
                    color = cMap[n.toString()][r - 1];
                    cMap[k] = color;
                    if (n != 3) {
                        k = [r, n, "5"].join("");
                        // TODO: 中间色
                        color = cMap[n.toString()][r - 1];
                        cMap[k] = color;
                    }
                }
            }
        };
        Style.lightGray = "#eeeeee";
        Style.gray = "#64655D";
        Style.darkGray = "#2E2D39";
        Style.trackBg = "#eeeeee";
        Style.stageW = 720;
        Style.stageH = 1280;
        Style.noteY = 580;
        Style.noteX = 30;
        Style.keyW = 240;
        Style.keyH = 360;
        Style.staffY = 580;
        Style.staffX = 0;
        Style.staffH = 120;
        Style.staffNoteY = 30;
        Style.staffExpectX = 220;
        Style.staffQueueX = 430;
        Style.staffNoteSpace = (720 - 210) / 7;
        Style.gameStartDelay = 500;
        Style.staffAnimationDelay = 400;
        Style.trackDelay = 400;
        Style.trackH = 20;
        Style.trackRowMax = 10;
        Style.pointMap = {
            "1": [33, 72],
            "2": [82, 134],
            "3": [111, 36],
            "4": [140, 83],
            "5": [184, 150],
            "6": [260, 106],
            "7": [358, 128]
        };
        Style.colorMap = {
            "1": "#168883,#18928A,#1BA59A,#62BDBB,#7ECBC6".split(","),
            "2": "#3DA226,#52AB2C,#9DD172,#B3DA94,#C8E5A7".split(","),
            "3": "#CBC90A,#E6E919,#F0EE33,#F6F060,#F5F58B".split(","),
            "4": "#DA6C08,#E5860B,#F4AF1F,#F2C537,#FBD360".split(","),
            "5": "#A3003B,#D30041,#ED2672,#EB73A0,#F0ACCA".split(","),
            "6": "#380080,#441674,#5D3788,#8A6FB0,#AA91C3".split(","),
            "7": "#0C4895,#0D50A3,#157FE4,#46ACE3,#84C9E9".split(",")
        };
        return Style;
    }());
    util.Style = Style;
})(util || (util = {}));
