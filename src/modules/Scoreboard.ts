
class Scoreboard{
  score = 0;
  level = 1;
  scoreEle : HTMLElement;
  levelELe : HTMLElement;
  maxLevel : number;
  uplevel : number;

  constructor(maxLevel: number = 10, uplevel: number = 5){
    this.scoreEle = document.getElementById('score')!;
    this.levelELe = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.uplevel = uplevel;
  }

  scoreAdd(){
    this.scoreEle.innerHTML = ++this.score + '';
    if(this.score % this.uplevel === 0){
      this.levelUp();
    }
  }

  levelUp(){
    if (this.level < this.maxLevel){
      this.levelELe.innerHTML = ++this.level + '';
    }
  }
}

export default Scoreboard;