export default class Card {
  constructor(suit, value, pointValue) {
    this.suit = suit;
    this.value = value;
    this.pointValue = pointValue;
    this.statePushed = false;
  }
}
