// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement,showResultCallback) {
    this.containerElement = containerElement;
    this.cardList=[];
    this.currentCard = 0;
    this.showResultCallback = showResultCallback;
    this.rightScore = 0;
    this.wrongScore = 0;
    
    this.updateScore = this.updateScore.bind(this);
    this.show = this.show.bind(this);
    this.showNextCard = this.showNextCard.bind(this);
    this.addToWrongList = this.addToWrongList.bind(this);
    this.whenContinue = this.whenContinue.bind(this);
    this.hide = this.hide.bind(this);
    this.correct = document.querySelector('#main .correct');
    this.incorrect = document.querySelector('#main .incorrect');
    this.title = '';
    this.wrongList = [];    
  }
  updateScore(right,wrong){
    this.rightScore+=right;
    this.wrongScore+=wrong;
    this.correct.textContent = this.rightScore;
    this.incorrect.textContent = this.wrongScore;
  }

  show(title) {    
    this.title = title;
    this.wrongList = [];    
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    for(let fd of FLASHCARD_DECKS){
      if(title === fd.title){
        let tfd = fd.words;
        for(let wd in tfd){        
          const card = new Flashcard(flashcardContainer,wd,tfd[wd],
                       this.addToWrongList,this.updateScore,this.showNextCard);
          this.cardList.push(card);
        }
        //show first card
        this.cardList[0].showCard();
        break;
      }
    }
  }
  showNextCard(){
    this.currentCard++;
    if(this.currentCard === this.cardList.length){
      this.showResultCallback(this.title,this.rightScore, this.wrongScore);
      return;
    }
    this.cardList[this.currentCard].showCard();
  }
  addToWrongList(){
    this.wrongList.push(this.cardList[this.currentCard]);
  }
  whenContinue(){
    this.containerElement.classList.remove('inactive');
    if(this.wrongList.length === 0){
      console.log('bug');
      this.rightScore = 0;
    }
    else{
      this.cardList.splice(0,this.cardList.length);
      for(let w of this.wrongList){
        this.cardList.push(w);
      }
    }
    this.wrongList = [];
    this.wrongScore = 0;
    this.updateScore(0,0);
    this.currentCard = 0;    
    this.cardList[0].showCard();
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }  
}
