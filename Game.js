/* 
alert(`${this.torn} difference ${i}`);
i = (i + 1) % this.playersArray.length;

while (this.playersArray[i].state !== "active ") {
  i = (i + 1) % this.playersArray.length;
}
this.checkButtons(i);

alert("torn is " + i);

this.jugada(i, this.deck);
} */

import Card from "./Card.js";
import Deck from "./Deck.js";
import Player from "./Player.js";

export default class Game {
  constructor() {
    this.torn = 0;
    this.deck = new Deck();
    this.playersArray = [];
    this.moneyToWin = 0;
    this.moneyToPlayWith = 0;
    this.numberOfPlayers = 0;
    this.newCard = new Card();
  }

  getInfo(moneyToPlayWith, arrNames, arrMoney, wins) {
    this.numberOfPlayers = arrNames.length;
    const playerObj = new Player();
    this.playersArray = playerObj.createPlayer(
      this.playersArray,
      moneyToPlayWith,
      arrNames,
      arrMoney,
      wins
    );
    this.createPlayerContainers();
  }

  createPlayerContainers() {
    document.body.innerHTML = "";
    const playersContainer = document.createElement("div");
    playersContainer.id = "container";

    //*Styling for the container
    document.body.appendChild(playersContainer);

    //**Creating players area
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const playerContainer = document.createElement("div");
      playerContainer.className = `playerContainerGame`;
      playerContainer.id = `playerContainerGame-${i + 1}`;

      const playerInfo = document.createElement("div");
      playerInfo.className = "playerInfo";
      playerInfo.id = `playerInfo-${i + 1}`;

      const playerName = document.createElement("div");
      playerName.className = "playerNameGame";
      playerName.id = `playerName-${i + 1}`;
      playerName.textContent = "Player : " + this.playersArray[i].name;

      const playerMoney = document.createElement("div");
      playerMoney.className = "playerMoney";
      playerMoney.id = `playerMoney-${i + 1}`;
      playerMoney.textContent = "Player Money : " + this.playersArray[i].money;

      const playerPoints = document.createElement("div");
      playerPoints.className = "playerPoints";
      playerPoints.id = `playerPoints-${i + 1}`;
      playerPoints.textContent = "Total points : 0 .";

      const playerWins = document.createElement("div");
      playerWins.className = "playerWins";
      playerWins.id = `playerWins-${i + 1}`;
      playerWins.textContent = "Total Wins : 0 .";

      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerMoney);
      playerInfo.appendChild(playerPoints);
      playerInfo.appendChild(playerWins);

      playerContainer.appendChild(playerInfo);

      const btnDemand = document.createElement("button");
      btnDemand.id = `btn1-${i + 1}`;
      btnDemand.className = `buttonGame`;
      btnDemand.disabled = true;
      btnDemand.textContent = " SI Demand";

      playerContainer.appendChild(btnDemand);

      const btnNoDemand = document.createElement("button");
      btnNoDemand.id = `btn2-${i + 1}`;
      btnNoDemand.className = `buttonGame`;
      btnNoDemand.disabled = true;
      btnNoDemand.textContent = "Skip Demand";

      playerContainer.appendChild(btnNoDemand);

      const playerCard = document.createElement("div");
      playerCard.className = `playerCard`;
      playerCard.id = `player-Cards-${i + 1}`;
      playerCard.innerHTML = " <p>Cards</p> <br>";

      playerContainer.appendChild(playerCard);

      playersContainer.appendChild(playerContainer);

      btnDemand.addEventListener("click", () => {
        this.newCard = this.deck.cards.pop();
        this.playersArray[i].cards.push(this.newCard);
        this.playersArray[i].totalPoints += this.newCard.pointValue;

        this.updatePlayerCards(
          i,
          this.newCard,
          this.playersArray[i].totalPoints
        );
        if (this.playersArray[i].totalPoints > 7.5) {
          this.playersArray[i].state = "no-active";

          Swal.fire({
            position: "top-end",
            icon: "error",
            title:
              this.playersArray[i].name + " is eliminated, has depassed 7.5 ",
            showConfirmButton: false,
            timer: 1500,
          });

          /*  alert(
            this.playersArray[i].name + " is eliminated, has depassed 7.5 "
          ); */
          i = (i + 1) % this.playersArray.length;
          // this.checkButtons(i + 1);
          this.jugada(i, this.deck);
        }
      });
    }
  }

  startGame() {
    this.deck.createCards();
    this.deck.shuffleArray();
    this.moneyToWin = this.numberOfPlayers * this.moneyToPlayWith;
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.newCard = this.deck.cards.pop();
      this.playersArray[i].cards.push(this.newCard);
      this.playersArray[i].totalPoints += this.newCard.pointValue;
      this.updatePlayerCards(i, this.newCard, this.playersArray[i].totalPoints);
    }
  }

  checkButtons(torn) {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const mybtn1 = document.getElementById(`btn1-${i + 1}`);
      const mybtn2 = document.getElementById(`btn2-${i + 1}`);
      mybtn1.disabled = true;
      mybtn2.disabled = true;
      mybtn1.style.backgroundColor = "white";
      mybtn1.style.color = "grey";
      mybtn2.style.backgroundColor = "white";
      mybtn2.style.color = "grey";
    }

    const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
    const mybtn2 = document.getElementById(`btn2-${torn + 1}`);
    if (torn !== 0) {
      mybtn1.disabled = false;
      mybtn2.disabled = false;
      mybtn1.style.backgroundColor = "red";
      mybtn2.style.backgroundColor = "red";
      mybtn1.style.color = "black";
      mybtn2.style.color = "black";
      mybtn1.style.backgroundColor = "red";
      mybtn2.style.backgroundColor = "red";
    }
  }

  play() {
    this.torn = 0;
    this.checkButtons(this.torn);
    this.jugada(this.torn, this.deck);
  }

  jugada(torn, mydeck) {
    let currentDeck = mydeck;
    let currentPlayer = this.playersArray[torn];

    const activePlayers = this.playersArray.filter(
      (player) => player.state === "active"
    );

    //check if there is more than one player
    if (activePlayers.length > 1) {
      //check if it's not the bank torn

      if (torn !== 0) {
        //check if the current player is active
        if (currentPlayer.state === "active") {
          //enable buttons

          this.checkButtons(torn);

          const mybtn2 = document.getElementById(`btn2-${torn + 1}`);

          mybtn2.addEventListener("click", () => {
            torn = (torn + 1) % this.playersArray.length;
            this.jugada(torn, currentDeck);
          });
          //if it's not active
        } else {
          
          const myinfo = document.getElementById(`playerInfo-${torn + 1}`);
          if (myinfo) {
            myinfo.style.filter = "blur(10px)";
          } else {
            console.error("Element with ID playerInfo-" + torn + " not found.");
          }

          torn = (torn + 1) % this.playersArray.length;
          this.jugada(torn, currentDeck);
        }
        //if it's bank torn
      } else {
        if (currentPlayer.state === "active") {
          for (let i = 0; i < 2; i++) {
            if (currentPlayer.luck === true) {
              this.playersArray[0].luck = false;
              if (currentPlayer.totalPoints + this.newCard.pointValue <= 7.5) {
                currentPlayer.cards.push(this.newCard);
                this.newCard.statePushed = true;

                currentPlayer.totalPoints += this.newCard.pointValue;

                this.updatePlayerCards(
                  torn,
                  this.newCard,
                  currentPlayer.totalPoints
                );
                this.newCard = this.deck.cards.pop();
              }
            } else {
              this.playersArray[0].luck = true;
              if (this.playersArray[0].totalPoints <= 6) {
                this.newCard = this.deck.cards.pop();
                this.playersArray[i].cards.push(this.newCard);
                this.playersArray[i].totalPoints += this.newCard.pointValue;

                this.updatePlayerCards(
                  0,
                  this.newCard,
                  this.playersArray[0].totalPoints
                );
                this.newCard = this.deck.cards.pop();
              }
              if (this.playersArray[0].totalPoints > 7.5) {
                this.playersArray[0].state = "no-active";

                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title:
                    this.playersArray[0].name +
                    " is eliminated, has depassed 7.5 ",
                  showConfirmButton: false,
                  timer: 1500,
                });

                /* alert(
                  this.playersArray[0].name +
                    " is eliminated, has depassed 7.5 "
                ); */
                break;
              }
            }
          }
        }


        torn = (torn + 1) % this.playersArray.length;
        this.jugada(torn, currentDeck);
      }
      //if there is just one player
    } else {
      let winner = this.playersArray.find(
        (player) => player.state === "active"
      );
      winner.money += this.moneyToPlayWith * this.playersArray.length;
      const buttons = document.querySelectorAll("button");

      // Iterate through each button and disable it
      buttons.forEach((button) => {
        button.disabled = true;
        button.style.backgroundColor = "green";
        button.style.color = "white";
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `The Winner Is ${winner.name}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  }

  /*  updateMoney(arr, money) {
    for (let i = 0; i < arr.length; i++) {
      const mymoney = document.getElementById(`playerMoney-${i + 1}`);

      if (arr[i].state === "active") {
        arr[i].money += money * arr.length;
      } else {
        arr[i].money -= money;
      }
      alert(`player ${arr[i].name} money is ${arr[i].money} `);
      mymoney.textContent = "Player Money : " + arr[i].money;
    }
  } */

  updatePlayerCards(torn, card, totalpts) {
    const mypoints = document.getElementById(`playerPoints-${torn + 1}`);
    const mycards = document.getElementById(`player-Cards-${torn + 1}`);

    if (totalpts > 7.5) {
      const loser = document.getElementById(`playerContainerGame-${torn + 1}`);
      loser.style.backgroundColor = "black";
      loser.style.color = "yellow";

      for (let i = 0; i < torn; i++) {
        const mybtn1 = document.getElementById(`btn1-${i + 1}`);
        const mybtn2 = document.getElementById(`btn2-${i + 1}`);
        mybtn1.disabled = true;
        mybtn2.disabled = true;
        mybtn1.style.backgroundColor = "white";
        mybtn2.style.backgroundColor = "white";
      }

      const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
      const mybtn2 = document.getElementById(`btn2-${torn + 1}`);
      if (torn !== 0) {
        mybtn1.disabled = false;
        mybtn2.disabled = false;
        mybtn1.style.backgroundColor = "red";
        mybtn2.style.backgroundColor = "red";
      }
      mybtn1.style.backgroundColor = "red";
      mybtn2.style.backgroundColor = "red";
    }
    const cardImage = document.createElement("img");
    cardImage.className = "img";
    cardImage.src = `images/${card.value}${card.suit}.PNG`;
    cardImage.alt = "Card Image";
    cardImage.style.width = "100px"; // Adjust width as needed
    cardImage.style.height = "150px"; // Adjust height as needed
    cardImage.style.borderRadius = "10px"; // Adjust border radius as needed
    cardImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Adjust shadow as needed
    cardImage.style.margin = "5px"; // Adjust margin as needed
    cardImage.style.transition = "transform 0.3s ease"; // Apply transition effect

    // Add hover effect to the card image
    cardImage.addEventListener("mouseover", () => {
      cardImage.style.transform = "translateY(-5px)";
      cardImage.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    });

    cardImage.addEventListener("mouseleave", () => {
      cardImage.style.transform = "translateY(0)";
      cardImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });

    mycards.appendChild(cardImage);

    mycards.appendChild(cardImage);

    mypoints.textContent = "Total points : " + totalpts;
  }
} /*
import Card from "./Card.js";
import Deck from "./Deck.js";
import Player from "./Player.js";

export default class Game {
  constructor() {
    this.torn = 0;
    this.deck = new Deck();
    this.playersArray = [];
    this.moneyToWin = 0;
    this.moneyToPlayWith = 0;
    this.numberOfPlayers = 0;
    this.newCard = new Card();
  }
  getInfo(moneyToPlayWith, arrNames, arrMoney, wins) {
    this.numberOfPlayers = arrNames.length;
    const playerObj = new Player();
    this.playersArray = playerObj.createPlayer(
      this.playersArray,
      moneyToPlayWith,
      arrNames,
      arrMoney,
      wins
    );
    this.createPlayerContainers();
  }

  createPlayerContainers() {
    document.body.innerHTML = "";
    const playersContainer = document.createElement("div");
    playersContainer.id = "container";

    //*Styling for the container
    document.body.appendChild(playersContainer);

    //**Creating players area
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const playerContainer = document.createElement("div");
      playerContainer.className = `playerContainerGame`;
      playerContainer.id = `playerContainerGame-${i + 1}`;

      const playerInfo = document.createElement("div");
      playerInfo.className = "playerInfo";
      playerInfo.id = `playerInfo-${i + 1}`;

      const playerName = document.createElement("div");
      playerName.className = "playerNameGame";
      playerName.id = `playerName-${i + 1}`;
      playerName.textContent = "Player : " + this.playersArray[i].name;

      const playerMoney = document.createElement("div");
      playerMoney.className = "playerMoney";
      playerMoney.id = `playerMoney-${i + 1}`;
      playerMoney.textContent = "Player Money : " + this.playersArray[i].money;

      const playerPoints = document.createElement("div");
      playerPoints.className = "playerPoints";
      playerPoints.id = `playerPoints-${i + 1}`;
      playerPoints.textContent = "Total points : 0 .";

      const playerWins = document.createElement("div");
      playerWins.className = "playerWins";
      playerWins.id = `playerWins-${i + 1}`;
      playerWins.textContent = "Total Wins : 0 .";

      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerMoney);
      playerInfo.appendChild(playerPoints);
      playerInfo.appendChild(playerWins);

      playerContainer.appendChild(playerInfo);

      const btnDemand = document.createElement("button");
      btnDemand.id = `btn1-${i + 1}`;
      btnDemand.className = `buttonGame`;
      btnDemand.disabled = true;
      btnDemand.textContent = " SI Demand";

      playerContainer.appendChild(btnDemand);

      const btnNoDemand = document.createElement("button");
      btnNoDemand.id = `btn2-${i + 1}`;
      btnNoDemand.className = `buttonGame`;
      btnNoDemand.disabled = true;
      btnNoDemand.textContent = "Skip Demand";

      playerContainer.appendChild(btnNoDemand);

      const playerCard = document.createElement("div");
      playerCard.className = `playerCard`;
      playerCard.id = `player-Cards-${i + 1}`;
      playerCard.innerHTML = " <p>Cards</p> <br>";

      playerContainer.appendChild(playerCard);

      playersContainer.appendChild(playerContainer);

      btnDemand.addEventListener("click", () => {
        this.newCard = this.deck.cards.pop();
        this.playersArray[i].cards.push(this.newCard);
        this.playersArray[i].totalPoints += this.newCard.pointValue;
        this.torn = i;
        this.updatePlayerCards(
          i,
          this.newCard,
          this.playersArray[i].totalPoints
        );
        if (this.playersArray[i].totalPoints > 7.5) {
          this.playersArray[i].state = "no-active";
          alert(`${this.torn} old `);

          this.torn = (this.torn + 1) % this.playersArray.length;

          alert(`${this.torn} new `);
          this.checkButtons(this.torn);
          alert(
            this.playersArray[i].name + " is eliminated, has depassed 7.5 "
          );

          this.jugada(this.torn, this.deck);
        }
      });
    }
  }

  startGame() {
    this.deck.createCards();
    this.deck.shuffleArray();
    this.moneyToWin = this.numberOfPlayers * this.moneyToPlayWith;
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.newCard = this.deck.cards.pop();
      this.playersArray[i].cards.push(this.newCard);
      this.playersArray[i].totalPoints += this.newCard.pointValue;
      this.updatePlayerCards(i, this.newCard, this.playersArray[i].totalPoints);
    }
  }

  checkButtons(torn) {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      const mybtn1 = document.getElementById(`btn1-${i + 1}`);
      const mybtn2 = document.getElementById(`btn2-${i + 1}`);
      mybtn1.disabled = true;
      mybtn2.disabled = true;
      mybtn1.style.backgroundColor = "white";
      mybtn2.style.backgroundColor = "white";
    }

    const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
    const mybtn2 = document.getElementById(`btn2-${torn + 1}`);
    if (torn !== 0 && currentPlayer.state !== "active") {
      mybtn1.disabled = false;
      mybtn2.disabled = false;
      mybtn1.style.backgroundColor = "red";
      mybtn2.style.backgroundColor = "red";
    } else {
      
      this.checkButtons(torn + 1);
    }
    mybtn1.style.backgroundColor = "red";
    mybtn2.style.backgroundColor = "red";
  }

  play() {
    this.torn = 0;
    this.checkButtons(this.torn);
    this.jugada(this.torn, this.deck);
  }
  jugada(torn, mydeck) {
    let currentDeck = mydeck;
    let currentPlayer = this.playersArray[torn];

    const activePlayers = this.playersArray.filter(
      (player) => player.state === "active"
    );

    //check if there is more than one player
    if (activePlayers.length > 1) {
      //check if it's not the bank torn

      if (torn !== 0) {
        //check if the current player is active
        if (currentPlayer.state === "active") {
          //enable buttons

          this.checkButtons(torn);

          const mybtn2 = document.getElementById(`btn2-${torn + 1}`);

          mybtn2.addEventListener("click", () => {
            torn = (torn + 1) % this.playersArray.length;
            this.jugada(torn, currentDeck);
          });
          //if it's not active
        } else {
          // torn = (torn + 1) % this.playersArray.length;
          this.jugada(torn, currentDeck);
        }
        //if it's bank torn
      } else {
        if (currentPlayer.state === "active") {
          for (let i = 0; i < 2; i++) {
            if (currentPlayer.luck === true) {
              this.playersArray[0].luck = false;
              if (currentPlayer.totalPoints + this.newCard.pointValue <= 7.5) {
                currentPlayer.cards.push(this.newCard);
                this.newCard.statePushed = true;

                currentPlayer.totalPoints += this.newCard.pointValue;

                this.updatePlayerCards(
                  torn,
                  this.newCard,
                  currentPlayer.totalPoints
                );
                this.newCard = this.deck.cards.pop();
              }
            } else {
              this.playersArray[0].luck = true;
              if (this.playersArray[0].totalPoints <= 6) {
                this.newCard = this.deck.cards.pop();
                this.playersArray[i].cards.push(this.newCard);
                this.playersArray[i].totalPoints += this.newCard.pointValue;

                this.updatePlayerCards(
                  0,
                  this.newCard,
                  this.playersArray[0].totalPoints
                );
                this.newCard = this.deck.cards.pop();
              }
              if (this.playersArray[0].totalPoints > 7.5) {
                this.playersArray[0].state = "no-active";
                alert(
                  this.playersArray[0].name +
                    " is eliminated, has depassed 7.5 "
                );
                break;
              }
            }
          }
        }
        torn = (torn + 1) % this.playersArray.length;
        this.jugada(torn, currentDeck);
      }
      //if there is just one player
    } else {
      let winner = this.playersArray.find(
        (player) => player.state === "active"
      );
      let allButtons = document.getElementsByTagNameNS("button");
      allButtons.disabled = true;
      alert(`The Winner Is ${winner.name}`);
    }
  }

  updateMoney(arr, money) {
    for (let i = 0; i < arr.length; i++) {
      const mymoney = document.getElementById(`playerMoney-${i + 1}`);

      if (arr[i].state === "active") {
        arr[i].money += money - this.moneyToPlayWith;
      } else {
        arr[i].money -= money / arr.length;
      }
      mymoney.textContent = "Player Money : " + arr[i].money;
    }
  }

  updatePlayerCards(torn, card, totalpts) {
    const mypoints = document.getElementById(`playerPoints-${torn + 1}`);
    const mycards = document.getElementById(`player-Cards-${torn + 1}`);

    if (totalpts > 7.5) {
      const loser = document.getElementById(`playerContainerGame-${torn + 1}`);
      const loserinfo = document.getElementById(`playerInfo-${torn + 1}`);
      loser.style.backgroundColor = "black";
      loserinfo.style.backgroundColor = "white";

      for (let i = 0; i < torn; i++) {
        const mybtn1 = document.getElementById(`btn1-${i + 1}`);
        const mybtn2 = document.getElementById(`btn2-${i + 1}`);
        mybtn1.disabled = true;
        mybtn2.disabled = true;
        mybtn1.style.backgroundColor = "white";
        mybtn2.style.backgroundColor = "white";
      }

      const mybtn1 = document.getElementById(`btn1-${torn + 1}`);
      const mybtn2 = document.getElementById(`btn2-${torn + 1}`);
      if (torn !== 0) {
        mybtn1.disabled = false;
        mybtn2.disabled = false;
        mybtn1.style.backgroundColor = "red";
        mybtn2.style.backgroundColor = "red";
      }
      mybtn1.style.backgroundColor = "red";
      mybtn2.style.backgroundColor = "red";
    }
    const cardImage = document.createElement("img");
    cardImage.className = "img";
    cardImage.src = `images/${card.value}${card.suit}.PNG`;
    cardImage.alt = "Card Image";
    cardImage.style.width = "100px"; // Adjust width as needed
    cardImage.style.height = "150px"; // Adjust height as needed
    cardImage.style.borderRadius = "10px"; // Adjust border radius as needed
    cardImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Adjust shadow as needed
    cardImage.style.margin = "5px"; // Adjust margin as needed
    cardImage.style.transition = "transform 0.3s ease"; // Apply transition effect

    // Add hover effect to the card image
    cardImage.addEventListener("mouseover", () => {
      cardImage.style.transform = "translateY(-5px)";
      cardImage.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    });

    cardImage.addEventListener("mouseleave", () => {
      cardImage.style.transform = "translateY(0)";
      cardImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });

    mycards.appendChild(cardImage);

    mycards.appendChild(cardImage);

    mypoints.textContent = "Total points : " + totalpts;
  }
}
*/
