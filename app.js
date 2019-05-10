// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    //bind first
    this.showFlashcards=this.showFlashcards.bind(this);
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement,this.showFlashcards);

    this.showResult = this.showResult.bind(this);
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,this.showResult);

    this.gameContinue = this.gameContinue.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.playAgain = this.playAgain.bind(this);
    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement,this.gameContinue,
                   this.playAgain,this.showMenu); 
  }
  showFlashcards(title){
    this.menu.hide();
    this.flashcards.show(title);    
  }
  showResult(title,rightScore,wrongScore){
    this.flashcards.hide();
    this.results.show(title,rightScore,wrongScore);
  }
  gameContinue(){
    this.results.hide();
    this.flashcards.whenContinue();        
  }
  playAgain(title){
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,this.showResult);
    this.results.hide();
    this.showFlashcards(title);
  }
  showMenu(){//app reset
    this.results.hide();
    this.menu.show();    
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,this.showResult);
  }
}
