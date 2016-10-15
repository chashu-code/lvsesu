module util {
  export class Sound {
    static musicToSounds(music:string):string[]{
      let arr = []
      music.replace("|","").match(/(\d[^\d]*)/g).forEach((note)=>{
        let n = 300;
        n +=  parseInt(note[0]) * 10
        n +=  note.indexOf("#") > 0 ? 5 : 0
        n -=  (note.split("-").length - 1) * 100
        n +=  (note.split("+").length - 1) * 100
        arr.push(n.toString()) 
      })
      return arr
    }
  }
}