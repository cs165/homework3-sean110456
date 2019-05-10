// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,showCardsCallback) {
    this.containerElement = containerElement;
    this.showCardsCallback = showCardsCallback;
    //bind eventListner
    this.clickChoice = this.clickChoice.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    //choices button
    for(let fd of FLASHCARD_DECKS){
      let choice = document.createElement('div');
      choice.textContent = fd.title;
      document.getElementById('choices').appendChild(choice);
      choice.addEventListener('click',this.clickChoice);
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  clickChoice(event){
    this.showCardsCallback(event.target.textContent);
  }
}
