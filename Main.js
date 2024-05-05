import Game from "./Game.js";

const myform = document.getElementById("myform");
let arrNames = [];
let arrMoney = [];
myform.addEventListener("change", function () {
  /*add number of player's input */

  document.body.innerHTML = "";

  const video = document.createElement("video");
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.id = "background-video";
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
  video.style.minWidth = "100%";
  video.style.minHeight = "100%";
  video.style.zIndex = "-1";
  video.style.filter = "blur(10px)"; // Adjust the blur amount as needed
  video.innerHTML = '<source src="vid.mp4" type="video/mp4">';
  document.body.appendChild(video);

  myform.style.border = "2px solid black";
  myform.style.margin = "10px";
  myform.style.padding = "10px";
  myform.style.background = "rgb(41, 106, 106)";
  myform.style.textAlign = "center";
  document.body.appendChild(myform);

  /* create player cards  */
  const container = document.createElement("div");

  container.id = "part2";

  const numberOfPlayer = document.getElementById("myinput");
  const numPlayer = numberOfPlayer.value;

  for (let i = 0; i < numPlayer; i++) {
    const player = document.createElement("div");

    player.style.backgroundImage = "url('player.jpg')"; // Replace 'your_background_image.jpg' with the path to your image
    player.style.backgroundSize = "cover"; // Adjust as needed
    player.style.backgroundPosition = "center"; // Adjust as needed

    player.className = `playerContainer`;
    //player.id = `player${i + 1}`;

    const playerName = document.createElement("p");
    playerName.className = "playerName";
    playerName.textContent = "Player Name  : ";
    //playerName.id = `playerName${i + 1}`;
    const playerNameInput = document.createElement("input");
    playerNameInput.id = `playerNameInput${i + 1}`;
    playerNameInput.className = "playerName";

    if (i !== 0) {
      playerNameInput.value = `Player ${i + 1}`;
    } else {
      playerNameInput.value = `Bank`;
      playerNameInput.readOnly = true;
    }

    const playerMoney = document.createElement("p");
    playerMoney.className = "playerMoney";
    playerMoney.textContent = "Player Money :";
    const playerMoneyInput = document.createElement("input");
    playerMoneyInput.id = `playerMoneyInput${i + 1}`;
    playerMoneyInput.className = `playerMoneyInput`;
    playerMoneyInput.type = "number";
    playerMoneyInput.value = `200`;

    player.appendChild(playerName);
    player.appendChild(playerNameInput);
    player.appendChild(playerMoney);
    player.appendChild(playerMoneyInput);

    container.appendChild(player);
  }

  const startBtn = document.createElement("div");
  startBtn.id = "part3";

  const button = document.createElement("button");
  button.id = "start";
  button.classList.add("button-64");
  button.setAttribute("role", "button");

  const span = document.createElement("span");
  span.classList.add("text");
  span.textContent = "START";

  button.appendChild(span);
  document.body.appendChild(container);

  //  document.body.appendChild(button);
  const part3 = document.createElement("div");
  part3.id = "part3";
  part3.style.textAlign = "center";
  part3.style.border = "2px solid black";
  part3.style.margin = "10px";
  part3.style.padding = "10px";
  part3.style.backgroundColor = "#b4991d";

  const moneyToPlayWith = document.createElement("p");
  moneyToPlayWith.className = `moneyToPlayWith`;
  moneyToPlayWith.textContent = "Enter Money to Play with : ";
  moneyToPlayWith.id = "enter";

  const moneyToPlayWithInput = document.createElement("input");
  moneyToPlayWithInput.id = `moneyToPlayWithInput`;
  moneyToPlayWithInput.value = `100`;
  document.body.appendChild(moneyToPlayWith);
  document.body.appendChild(moneyToPlayWithInput);

  part3.appendChild(moneyToPlayWith);
  part3.appendChild(moneyToPlayWithInput);
  document.body.appendChild(part3);
  document.body.appendChild(button);

  const mybtn = document.getElementById("start");
  mybtn.addEventListener("click", function () {
    for (let i = 0; i < numPlayer; i++) {
      const name = document.getElementById(`playerNameInput${i + 1}`);

      arrNames[i] = name.value;
      const money = document.getElementById(`playerMoneyInput${i + 1}`);
      arrMoney[i] = money.value;
    }
    const game = new Game();

    game.getInfo(moneyToPlayWithInput.value, arrNames, arrMoney, 0);

    game.startGame();
    game.play();
  });
});
