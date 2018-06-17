

// Defining global variables

const cards = document.querySelectorAll('.deck li');
const moveCounter = document.querySelector('.moves');
let numberOfMoves = 0;
let openCards = [];

/*
 * Defining global variables for star rating
 *   - Convert nodelist to array https://davidwalsh.name/nodelist-array
 *   - Set the limit for switching star rating
 */

const stars = Array.prototype.slice.call(document.querySelectorAll('.stars li'));
const twoStarLimit = 5;
const oneStarLimit = 8;

const timer = document.querySelector('.timer');
let elapsedSeconds = 0;
let timerId;

// Start game with initial

function startGame() {
  for (let card of cards) {
      card.className = "card";
      card.isClicked = 0;
  }
  shuffleDeck(cards);
  updateStars(3);
}

// Create a list that holds all of your cards

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

// Event listener for cards - if a card is clicked, open the card and push it to a stack called 'openCards'
cards.forEach(card => card.addEventListener('click', function (evt) {

  // If user clicked an already open card, do nothing
  if (openCards.includes(card)) {
    return;
  }

  // Increment move counter by 1
  incrementCounter();

  // Star timer on first move
  if (numberOfMoves === 1) {
    timerId = setInterval (updateTimer, 1000)
  }

  let rating = getRating(numberOfMoves);
  updateStars(rating);

  card.className = "card show open";
  openCards.push(card);

  // If the number of openCards is odd, then keep it open

  if (openCards.length %2 === 1) {
    return;
  }

  // If the number of cards is even, then pop the current, then the previously opened card from 'openCards' stack

  let currentCard=openCards.pop();
  let previousCard=openCards.pop();

  // If user clicked the same card as previously, do nothing

  if (previousCard === currentCard) {
    openCards.push(previousCard);
    return;
  }

  // If user clicked another card, increment move counter by 1


  // If the symbols match, put cards in 'match' status and push them back to 'openCards' stack

  if (previousCard.firstElementChild.className === currentCard.firstElementChild.className) {
    previousCard.className = 'card match show';
    currentCard.className = 'card match show';
    openCards.push(previousCard, currentCard);

    // Winning condition: if all cards are revealed (open), player wins the game, timer stops

    if (openCards.length === 16) {
      alert("You won!");
      clearInterval(timerId);
    }


  // If the symbols does not match, close the two cards with a little delay (so that opening the current card is visible to the player)

  } else {
    setTimeout(() => {
      previousCard.className = 'card close';
      currentCard.className = 'card close';
    }, 800);

  }

}));

function incrementCounter() {
  numberOfMoves++;
  moveCounter.innerHTML = numberOfMoves;
}

// Gewt rating based on number of moves

function getRating(moves) {
    if (moves <= twoStarLimit) {
        return 3;
    } else if (moves <= oneStarLimit){
        return 2;
    } else {
        return 1;
    }
}

// Update number of stars visible based on the rating (depending on the number of moves)
function updateStars(rating) {
    let invisible = stars.slice(rating);
    let visible = stars.slice(0, rating);

    invisible.forEach(star => star.style.visibility = "hidden");
    visible.forEach(star => star.style.visibility = "visible");
}

/*
 * Functions for updating timer
 * Padding numbers to display two digits: https://gist.github.com/endel/321925f6cafa25bbfbde
 */

function updateTimer() {
  elapsedSeconds++;
  let seconds = elapsedSeconds % 60;
  let minutes = Math.floor(elapsedSeconds / 60);
  let displayedTime = `${minutes.pad(2)}:${seconds.pad(2)}`;
  timer.innerHTML = displayedTime;
}

Number.prototype.pad = function(size) {
  var sign = Math.sign(this) === -1 ? '-' : '';
  return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
}

/* TODOs:

 * 1. Page onLoad:
 *   - shuffle cards randomly DONE
 *   - display cards DONE

 * 2. Card event Listeners DONE
 *   - hover animation SKIP
 *   - click event effects: DONE
 *      - put card to open status DONE
 *         - animation (turn) DONE
 *         - display icon DONE
 *         - change bgrd color DONE
 *
 *   - matching logic (if open card list is not empty, amtch symbols) DONE
 *     - ignore clicking the same card again DONE
 *     - ignore clicking an already open card DONE
 *     - if match: keep cards open, change bgrd color DONE
 *     - if does not match:
 *         - remove from list of open cards DONE
 *         - hide symbol, animation, default bgrd color DONE

 * 3. Move counter DONE
 *   - increase by 1 if a new card is clicked DONE

 * 4. Stars DONE
 *   -  decrease by 1 if a certain condition is met in move count DONE
 *   -  display 3 stars when game is reset DONE

 * 5. Timer DONE
 *   - start when first card is clicked (and put to open status)
 *   - stop when all cards are open and matched

 * 6. Restart button
 *   - reset gameboard (close all cards, shuffle cards)
 *   - reset timer to 00:00:00:00
 *   - reset stars to 3 full
 *   - reset move counter to 0

 * 7. Congratulations popup
 *   - define winning condition (when all cards are open and matched) DONE
 *   - render popup
 *   - display current status of:
 *      - nr of moves
 *      - time
 *      - stars
 *   - restart button (Play again)
 */
