// The below code is essentially saying we are getting the Deck class from the deck.js
import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, stop;

// inRound means that the card is currently flipped (shown) because we are in the middle of a round
let inRound;

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  //essentially if inRound is true (meaning we are in the middle of a round), then we want to clean it up.  else if inRound is false, then we want to flip a card
  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  // finding the midpoint to divide the deck of cards into 2
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  // To get the top card from the deck (.pop() is a method in the deck class NOT the pop array method)
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  // this is ensure when you flip a card, the deck count actually reflects how many cards are still left in the deck
  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Player Win!";
    // The winner which is player takes their card and the computers card and places it at the bottom of the deck
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Computer Win!";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "Draw";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!!";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
