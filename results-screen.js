// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement,continueCallback,againCallback,showMenuCallback) {
    this.containerElement = containerElement;
    this.continueCallback = continueCallback;
    this.showMenuCallback = showMenuCallback;
    this.againCallback = againCallback;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.toContinue = this.toContinue.bind(this);
    this.toMenu = this.toMenu.bind(this);
    this.continueBtn = null;
    this.menuBtn = null;
    this.title = '';
  }
  show(title,numberCorrect, numberWrong) {
    this.title = title;
    this.containerElement.classList.remove('inactive');
    const percent = document.querySelector('.percent');
    const correct = document.querySelector('#results .correct');
    const incorrect = document.querySelector('#results .incorrect');
    let p = numberCorrect/(numberCorrect+numberWrong) * 100;
    percent.textContent = Math.round(p);
    correct.textContent = numberCorrect;
    incorrect.textContent = numberWrong;    
    this.continueBtn = document.querySelector('.continue');
    this.menuBtn = document.querySelector('.to-menu');
    if(p === 100){  
      this.continueBtn.textContent = 'Start over?';
      this.continueBtn.addEventListener('pointerup',this.startAgain);
    }
    else{
      this.continueBtn.textContent = 'Continue';
      this.continueBtn.addEventListener('pointerup',this.toContinue);
    }
    this.menuBtn.addEventListener('pointerup',this.toMenu);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  toContinue(){
    this.continueBtn.removeEventListener('pointerup',this.toContinue);
    this.continueCallback();
  }
  startAgain(){
    this.continueBtn.removeEventListener('pointerup',this.startAgain);
    this.againCallback(this.title);
  }
  toMenu(){
    this.menuBtn.removeEventListener('pointerup',this.toMenu);
    this.showMenuCallback();
  }
}
