module util {
  export class Style{
    static lightGray = "#eeeeee";
    static gray = "#64655D";
    static darkGray = "#2E2D39";

    static trackBg = "#eeeeee"
    

    static stageW = 720;
    static stageH = 1280;

    static noteY = 580;
    static noteX = 30;
    static keyW = 240;
    static keyH = 360;

    static staffY = 580;
    static staffX = 0;
    static staffH = 120;

    static staffNoteY = 30
    static staffExpectX = 220;
    static staffQueueX = 430
    static staffNoteSpace = (720 - 210)/ 7;

    static gameStartDelay = 500
    static staffAnimationDelay = 400
    static trackDelay = 400

    static trackH = 20
    static trackRowMax = 10 

    static pointMap:any = {
      "1": [33,72],
      "2": [82, 134],
      "3": [111,36],
      "4": [140, 83],
      "5": [184, 150],
      "6": [260, 106],
      "7": [358, 128]
    }

    static colorMap:any ={
      "1": "#168883,#18928A,#1BA59A,#62BDBB,#7ECBC6".split(","),
      "2": "#3DA226,#52AB2C,#9DD172,#B3DA94,#C8E5A7".split(","),
      "3": "#CBC90A,#E6E919,#F0EE33,#F6F060,#F5F58B".split(","),
      "4": "#DA6C08,#E5860B,#F4AF1F,#F2C537,#FBD360".split(","),
      "5": "#A3003B,#D30041,#ED2672,#EB73A0,#F0ACCA".split(","),
      "6": "#380080,#441674,#5D3788,#8A6FB0,#AA91C3".split(","),
      "7": "#0C4895,#0D50A3,#157FE4,#46ACE3,#84C9E9".split(",")
    } 

    static buildColorMap(){
      let cls = util.Style;
      let cMap = cls.colorMap;

      let k = ""
      let color = ""
      for (let r = 1; r <= 5; r++) {
        for (let n = 1; n <= 7; n++) {
          k = [r,n,"0"].join("")
          color = cMap[n.toString()][r-1];
          cMap[k] = color;
          if(n != 3){ // 加半音色
            k = [r,n,"5"].join("")
            // TODO: 中间色
            color = cMap[n.toString()][r-1];
            cMap[k] = color;            
          }
        }
      }
    }
  }
}