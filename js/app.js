


const cards = document.querySelectorAll('.deck li');

let openCards = [];

// Start game with initial

function startGame() {
  for (let card of cards) {
      card.className = "card";
      card.isClicked = 0;
  }
  shuffleDeck(cards);

}



/*
 * Create a list that holds all of your cards
 */

 const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
     "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
     "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle deck
function shuffleDeck (deck) {
    let shuffledListOfCards = shuffle(listOfCards);
    for (i = 0; i < deck.length; i++) {
        deck[i].firstElementChild.className = shuffledListOfCards[i];
    }
}

startGame();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

cards.forEach(card => card.addEventListener('click', function (evt) {
  card.className = "card show open";
  openCards.push(card);

  if (openCards.length %2 === 1) {
    return;
  }

  let currentCard=openCards.pop();
  let previousCard=openCards.pop();

  if (previousCard === currentCard) {
    openCards.push(previousCard);
    return;
  }

  if (previousCard.firstElementChild.className === currentCard.firstElementChild.className) {
    previousCard.className = 'card match show';
    currentCard.className = 'card match show';
    openCards.push(previousCard, currentCard);

  } else {
    setTimeout(() => {
      previousCard.className = 'card close';
      currentCard.className = 'card close';
    }, 800);

  }


}
));






/* TODOs:

 * 1. Page onLoad:
 *   - shuffle cards randomly DONE
 *   - display cards DONE

 * 2. Card event Listeners
 *   - hover animation
 *   - click event effects:
 *      - put card to open status DONE
 *         - animation (turn)
 *         - display icon
 *         - change bgrd color
 *
 *   - matching logic (if open card list is not empty, amtch symbols)
  *     - ignore clicking the same card again
 *      - if match:
 *         - keep cards open
 *         - change bgrd color
 *      - if does not match:
 *         - remove from list of open cards
 *         - hide symbol, animation, default bgrd color

 * 3. Move counter
 *   - increase by 1 if a new card is clicked

 * 4. Stars
 *   -  display 3 stars full
 *   -  decrease by 1 if a certain condition is met in move count

 * 5. Timer
 *   - start when first card is clicked (and put to open status)
 *   - stop when all cards are open and matched

 * 6. Congratulations popup
 *   - define winning condition (when all cards are open and matched)
 *   - render popup
 *   - display current status of:
 *      - nr of moves
 *      - time
 *      - stars
 *   - Want to play again?

 * 7. Restart button
 *   - reset gameboard (cards in closed status, reshuffled)
 *   - reset timer to 00:00:00:00
 *   - reset stars to 3 full
 */
