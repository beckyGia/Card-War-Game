const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// Deals with a pile of cards
// export is used to export values from one JS module to another.  default means it is the preselected option
export default class Deck {
  // we are setting a default of freshDeck() meaning 52 cards
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  // since we are going to be using this.cards.length alot, it makes sense to set a getter. Remember getter methods are used to access the properties of an object.  In this case, we are getting the length property of the cards object
  get numberOfCards() {
    return this.cards.length;
  }

  // removes the first card of the deck
  pop() {
    return this.cards.shift();
  }

  // adds a card to the bottom of the deck
  push(card) {
    this.cards.push(card);
  }

  // this method sorts our cards
  shuffle() {
    //can't use the following because some cards would appear more frequently than others also because sort wants to put it in some sort of order:
    // this.cards.sort((a, b) => Math.random() - .5)

    // We are going from the back of the deck of cards to the front, and we are constantly taking whatever card we are currently on and flipping it with another card that comes earlier in the deck that we haven't gotten too yet.
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      // this will provide us a new index that we haven't accessed yet.  so if i is 30, then the index will be between 0 and 30, the ones we haven't accessed yet.
      const newIndex = Math.floor(Math.random() * (i + 1));

      //flip the value at the old index with the current index.  We first set the value of the card at the new index we calculated into a new variable called oldValue.  We then place the value of the card at the current index we are at to now be the new value at the new calculated index and then we place the value of the oldValue variable we created to be the new value at this current index
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

// Deal with the different type of cards
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  }

  getDraw() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
  }
}

// Creates a brand deck of 52 cards
function freshDeck() {
  //The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. Example:
  // const arr1 = [1, 2, [3], [4, 5], 6, []];
  // const flattened = arr1.flatMap(num => num);
  //console.log(flattened);
  // expected output: Array [1, 2, 3, 4, 5, 6]
  return SUITS.flatMap((suit) => {
    // the flat map allows you to get [Card, Card, Card.....] instead of if you just use regular map you would get [Array(13), Array(13), Array(13), Array(13)].  essentially flatMap turns the 4 arrays of 13 and turns them into one array of 52
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
