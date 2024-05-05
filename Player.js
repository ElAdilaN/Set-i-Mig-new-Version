let aPlayer;
export default class Player {
  constructor() {
    this.name = "";
    this.money = 0;
    this.state = "active";
    this.cards = [];
    this.totalPoints = 0;
    this.wins = 0;
    this.luck = false;
  }
  createPlayer(playersArray, moneyToPlayWith, arrnames, arrMoney, wins) {
    for (let i = 0; i < arrnames.length; i++) {
      aPlayer = new Player();
      aPlayer.name = arrnames[i];
      aPlayer.moneyToPlayWith = moneyToPlayWith;
      aPlayer.money = arrMoney[i] - moneyToPlayWith;
      aPlayer.state = "active";
      aPlayer.wins = wins;

      playersArray.push(aPlayer);
    }

    return playersArray;
  }
}
