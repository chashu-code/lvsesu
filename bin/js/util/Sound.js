var util;
(function (util) {
    var Sound = (function () {
        function Sound() {
        }
        Sound.musicToSounds = function (music) {
            var arr = [];
            music.replace("|", "").match(/(\d[^\d]*)/g).forEach(function (note) {
                var n = 300;
                n += parseInt(note[0]) * 10;
                n += note.indexOf("#") > 0 ? 5 : 0;
                n -= (note.split("-").length - 1) * 100;
                n += (note.split("+").length - 1) * 100;
                arr.push(n.toString());
            });
            return arr;
        };
        return Sound;
    }());
    util.Sound = Sound;
})(util || (util = {}));
