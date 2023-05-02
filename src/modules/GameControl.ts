import Food from "./Food";
import Snake from "./Snake";
import Scoreboard from "./Scoreboard";

class GameControl {
  snake: Snake;
  food: Food;
  scoreboard: Scoreboard;
  direction: string = '';
  isAlive = true;
  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scoreboard = new Scoreboard();
    this.init();
  }

  init(){
    document.addEventListener('keydown', this.keydownhandler.bind(this))
    this.run();
  }

  keydownhandler(event: KeyboardEvent){
    this.direction = event.key;
  }

  run(){
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction){
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
      break;
      case "ArrowRight":
      case "Right":
        X += 10;
      break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
      break;
    }

    this.isEatFood(X,Y)
      

    try{
      this.snake.X = X;
      this.snake.Y = Y;
    }catch(event: any){
      alert(event.message +'Game Over!');
      this.isAlive = false;
    }
  
    this.isAlive && setTimeout(this.run.bind(this), 300-(this.scoreboard.level-1)*30);
  }

  isEatFood(X:number, Y:number){
     if(X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scoreboard.scoreAdd();
      this.snake.addBody();
     }
    }
  }


export default GameControl;