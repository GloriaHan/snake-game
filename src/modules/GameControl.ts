import Food from "./Food";
import Snake from "./Snake";
import Scoreboard from "./Scoreboard";


class GameControl {
  snake: Snake;
  food: Food;
  scoreboard: Scoreboard;
  direction: string = '';
  alertBox: HTMLElement;
  isAlive = true;
  isPaused = false;

  constructor(){
    this.snake = new Snake();
    this.food = new Food();
    this.scoreboard = new Scoreboard();
    this.init();
    this.alertBox = document.getElementById('alert-box')!;

  }

  init(){
    document.addEventListener('keydown', this.keydownhandler.bind(this))
    const startBtn = document.getElementById('start')!;
    const pauseBtn = document.getElementById('pause')!;
    const btnUp = document.getElementById('btn-up')!;
    const btnDown = document.getElementById('btn-down')!;
    const btnLeft = document.getElementById('btn-left')!;
    const btnRight = document.getElementById('btn-right')!;
  

    btnUp.addEventListener('click', () => {
      this.direction = 'Up';
    });

    btnDown.addEventListener('click', () => {
      this.direction = 'Down';
    });

    btnLeft.addEventListener('click', () => {
      this.direction = 'Left';
    });

    btnRight.addEventListener('click', () => {
      this.direction = 'Right';
    });

    startBtn.addEventListener('click', () => {
      this.resetGame();
    });
  
    pauseBtn.addEventListener('click', () => {
      this.togglePause();
    });

    this.run();
  }

  keydownhandler(event: KeyboardEvent){
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
    this.direction = event.key;
  }

  resetGame(){
    const activeEl = document.activeElement as HTMLElement;
    this.snake = new Snake();
    this.food = new Food();
    this.scoreboard.resetScore();
    this.snake.reset();
    this.direction = '';
    this.isAlive = true;
    this.alertBox.style.visibility = 'hidden';
    this.init();
    //  remove the focus from start button
    activeEl && activeEl.blur();
    console.log('start')
  }


  run(){
    if (!this.isPaused){
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
        const alertContent = this.alertBox.querySelector('.alert-content')!;
        alertContent.textContent = `${event.message} Game Over!`;
        this.alertBox.style.visibility = 'visible';
        this.isAlive = false;
      }
        
      this.isAlive && setTimeout(this.run.bind(this), 300-(this.scoreboard.level-1)*30);
    }else{
      setTimeout(this.run.bind(this), 100);
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pause')!;
    if (this.isPaused) {
      pauseBtn.textContent = "PLAY";
      pauseBtn.style.backgroundColor = '#e4a93b';
    } else {
      pauseBtn.textContent = "PAUSE";
      pauseBtn.style.backgroundColor = '#96b9b1';
    }
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