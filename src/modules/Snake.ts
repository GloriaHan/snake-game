class Snake{
  element: HTMLElement;
  head: HTMLElement;
  body: HTMLCollection;

  constructor(){
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.body = this.element.getElementsByTagName('div');
  }

  get X(){
    return this.head.offsetLeft;
  }

  get Y(){
    return this.head.offsetTop;
  }

  set X(value : number){  
    if(this.X === value){
    return;
    }   
    // restrict the snake goes to the opposite direction
    if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value){
      if(value > this.X){
        value = this.X - 10;
      }else{
        value = this.X + 10;
      }
    }
    if(value<0 || value > 290){
      throw new Error("Oops! Your snake hit the wall! ")
    }
    this.moveBody();
    this.head.style.left = value +'px';
    this.checkHitSelf();
  }

  set Y(value : number){
    if(this.Y === value){
      return;
    }  
    // restrict the snake goes to the opposite direction
    if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === value){
      if(value > this.Y){
        value = this.Y - 10;
      }else{
        value = this.Y + 10;
      }
    }
    if(value<0 || value > 290){
      throw new Error("Oops! Your snake hit the wall! ")
    }
    this.moveBody();
    this.head.style.top = value +'px';
    this.checkHitSelf();
  }

  addBody(){
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  moveBody(){
    for(let i=this.body.length-1; i>0; i--){
      let X = (this.body[i-1] as HTMLElement).offsetLeft;
      let Y = (this.body[i-1] as HTMLElement).offsetTop;

      (this.body[i] as HTMLElement).style.left = X + 'px';
      (this.body[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkHitSelf(){
    for(let i=1; i< this.body.length; i++){
      let bd = this.body[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        throw new Error('Oops! Your snake ate itself! ')
      }
    }
  }
}

export default Snake;