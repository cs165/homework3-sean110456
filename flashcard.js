// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText,addToWrongCallback,updateScoreCallback,nextCardCallback) {
    this.containerElement = containerElement;
    this.addToWrongCallback = addToWrongCallback;
    this.updateScoreCallback = updateScoreCallback;
    this.nextCardCallback = nextCardCallback;
    //initialize
    this.updateScoreCallback(0,0);

    this._flipCard = this._flipCard.bind(this);
    this.showCard = this.showCard.bind(this);
    //for drag
    this.originX = null;
    this.originY = null;
    this.startDrag = this.startDrag.bind(this);
    this.duringDrag = this.duringDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.dragFlag = 0;
    this.rightFlag = 0;
    this.wrongFlag = 0;

    this.body = document.querySelector('body');

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');
    cardContainer.classList.add('inactive');
    cardContainer.addEventListener('pointerdown',this.startDrag);
    cardContainer.addEventListener('pointermove',this.duringDrag);
    cardContainer.addEventListener('pointerup',this.endDrag);
    cardContainer.addEventListener('pointercancel',this.endDrag);

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  showCard(){
    this.flashcardElement.classList.remove('inactive');
  }

  startDrag(event){
    event.preventDefault();
    event.stopPropagation();
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.rightFlag = 0;
    this.wrongFlag = 0;
    event.target.setPointerCapture(event.pointerId);
    this.flashcardElement.style.cssText='transition-duration: 0.0s';
  }
  duringDrag(event){
    if(this.originX){
      this.dragFlag = 1;
      const currX = event.clientX;
      const currY = event.clientY;
      const deltaX = currX-this.originX;
      const deltaY = currY-this.originY;
      const tCard = event.currentTarget;
      tCard.style.transform = 'translateX('+deltaX+'px)'+
                              'translateY('+deltaY+'px)'+
                              'rotate('+0.2*deltaX+'deg)';
      if(deltaX>=150 && this.rightFlag === 0){
        this.body.style.backgroundColor = '#97b7b7';
        this.updateScoreCallback(1,0);
        this.rightFlag = 1;
      }
      else if(deltaX <=-150 && this.wrongFlag === 0){
        this.body.style.backgroundColor = '#97b7b7';
        this.updateScoreCallback(0,1);
        this.wrongFlag = 1;
      }
      else if(deltaX<150 && deltaX>-150){
        this.body.style.backgroundColor = '#d0e6df';
        if(this.rightFlag === 1){
          this.updateScoreCallback(-1,0);
          this.rightFlag = 0;
        }
        if(this.wrongFlag === 1){
          this.updateScoreCallback(0,-1);
          this.wrongFlag = 0;
        }
      }
    }
  }
  endDrag(event){
    if(!this.originX){
      return;
    }
    const deltaX = event.clientX - this.originX;
    this.originX = null;
    if(this.dragFlag === 1){
      this.flashcardElement.classList.toggle('show-word');
      this.dragFlag = 0;
    }
    if(Math.abs(deltaX) < 150){
      this.flashcardElement.style.cssText='transition-duration: 0.6s';
      event.currentTarget.style.transform ='';
      return;
    }
    else{
      if(deltaX < -150){
        this.addToWrongCallback();
      }
      event.currentTarget.style.transform ='';
      this.flashcardElement.classList.add('inactive');
      this.body.style.backgroundColor = '#d0e6df';
      this.nextCardCallback();
    }
  }
}
