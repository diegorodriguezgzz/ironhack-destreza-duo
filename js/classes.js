/* Colors:  
  Blue (board): #0023B9
  Yellow (piece): #FFC300
  Red: #FF0000
  Gray: #777777
*/

/* Constructors and 
prototype methods */

function Piece(id, description, syms, rots, color) {
  this.id = id;
  this.description = description;
  this.syms = syms;
  this.rots = rots;
  this.color = color;
  this.position = Math.floor(Math.random()*4); //Out of possible rotations
  this.x = 0; //For drawing on the board
  this.y = 0;
  this.width = 20; //For scaling
  this.height = 20;
}

//Functions are defined within prototype to save memory
//TODO: Revisit this, it seems like it doesn't make any sense anymore
Piece.prototype.select = function(player) {
  player.holds = this; //Player holds the piece
  this.color = player.color; //Piece color matches the player's color
} //Should I bind something here??

//Seems to work well
Piece.prototype.rotateLeft = function() {
  this.position = (this.position === 3) ? 0 : this.position + 1;
  selectedPiece(this);
}

//Seems to work well
Piece.prototype.rotateRight = function() {
  this.position = (this.position === 0) ? 3 : this.position - 1;
  selectedPiece(this);
}

//Seems to work well
Piece.prototype.checkRotation = function() {
  return (this.rots.indexOf(this.position) !== -1) ? true : false;
}

function Board(rows) {
  this.rows = rows; //3, 4 or 5
  this.slots = [];
  this.color = "#0023B9";
  this.selectedSlot = null;
}

//Seems to work well
Board.prototype.fillBoard = function() {
  let boardSize = this.rows**2; //Board is always square
  this.slots = sample(pieces, boardSize);
}

//TODO: complete
Board.prototype.setSlot = function(player) {
  this.selectedSlot = player.clickedSlot; //Asegurarse que funcione
}

//TODO: remove because this is a test function
Board.prototype.selectSlot = function(index) {
  this.selectedSlot = this.slots[index];
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = `The board has ${this.slots[index].description} selected`; //¿O usar textNode?
}

function Player(name, color, number) {
  this.name = name;
  this.color = color;
  this.number = number;
  this.heldPiece = null;
  this.clickedSlot = null;
}

/*This one is intertwined with the Game class...
Input: index of game's available pieces array
Effect: Sets a reference to that piece from Player
The game is a hard parameter, whereas the index will be passed
through DOM interactions */
//Seems to work well
Player.prototype.grabPiece = function(game, index) {
  this.heldPiece = game.availablePieces[index];
  selectedPiece(this.heldPiece); //For graphic display
}

//TODO: complete
Player.prototype.placePiece = function(game) {
  if (game.board.selectedSlot.id === this.heldPiece.id && //The pieces match
      this.heldPiece.checkRotation()) { //Accurately rotated
      game.checkedPieces.push(
        game.availablePieces.splice(
          game.availablePieces.indexOf(this.heldPiece), 1
          )[0] //So this returns an element and not a full array
        ) //Just move the one piece from one array to the other
      placedPiece(this.heldPiece, game)//Notify the player
      if(game.checkFinished(game.board)) {
        game.checkWinner();
      } //And check if the game is over
  }
  else if (!this.heldPiece.checkRotation()) {
    wrongRot();
  }
  else {
    wrongTone();
    wrongPiece();//Mostrar mensaje de alerta
    updateHighlights();
  }
  //TODO: Check if this is the best solution
  this.heldPiece = null; //Regresar pieza a tablero en posición original
  game.board.selectedSlot = null;
  this.clickedSlot = null;
}

//TODO: complete
Player.prototype.clickSlot = function(slot) {
  this.clickedSlot = slot;
}

function Game(mode, pieces) {
  this.mode = mode; //1P Classic, 1P Easy, 2P
  this.availablePieces = pieces;
  this.checkedPieces = [];
}

Game.prototype.buildParameters = function() {
  //TODO: Extend this with a switch statement
  this.modeParams = { //Test parameters
    time : 999, //260
    players : 1,
    rows : 3
  }
}

Game.prototype.beginGame = function() {
  this.buildParameters();
  this.board = new Board(this.modeParams.rows);
  this.board.fillBoard();
  this.players = [];
  for (let i = 1; i <= this.modeParams.players; i++) { //Make players, too
    this.players.push(createPlayer(i)); //The param is playerNumber 
  }
  this.filterPieces(this.board);
  this.timer = new Chrono(this.modeParams.time);
  this.interval = setInterval(update, 1000, this);
  gfxSetup(this);
}

//Seems to work well
Game.prototype.filterPieces = function() { //Keep only the pieces that are relevant
  this.availablePieces = this.availablePieces.filter(el => this.board.slots.indexOf(el) !== -1);
}

//TODO: Test
Game.prototype.checkFinished = function() { //Solo
  return (this.checkedPieces.length === this.board.slots.length) ? true : false;
}

//TODO: Test
Game.prototype.checkGameOver = function() {
  return (this.timer.secondsLeft <= 0) ? true : false; //Return true if time is over
}

Game.prototype.checkWinner = function() {
  if (this.players.length === 1) {
    alert("Congratulations, you won!");
  }
  else {
    //Check who, out of the available players, did best in the game
  }
}

function Chrono(time) {
  // this.startTime = time; Datetime
  this.secondsLeft = time;
}

//Function to tick
Chrono.prototype.tickDown = function() { //FIXIT: Tenía game como param
  this.secondsLeft--;
}


/* Generic utility functions */

//Fisher-Yates (FY) Shuffle
//Special thanks to Mike Bostock at https://bost.ocks.org/mike/shuffle/compare.html
function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

//Sampling w/o replacement, building on the FY Shuffle
function sample(array, size) {
  if (array.length >= size) {
    let newArray = array.slice(0); //First make a shallow copy of the array
    shuffle(newArray); //Then shuffle the new array
    newArray = newArray.slice(0, size); //Then only keep indexes up to size
    return newArray;
  }
  else {
    console.error("Stats error: array size must be larger than sample size");
  }
}

/* Game-specific functions */

function gfxSetup(game) {
  setAvailablePieces(game);
  fillGrid(game);
  testListeners();
}

function update(game) {
  game.timer.tickDown();
  gfxUpdate(game);
  if (game.checkGameOver()) {
    clearInterval(game.interval);
    gameOver();
  }
}

function setAvailablePieces(game) {
  let piecesNode = document.getElementById("availablePieces");
  let cells = game.availablePieces.length;
  let colLength = Math.sqrt(cells);
  let cellNode;
  //Iterate over cols
  for (let j = 0; j < piecesNode.children.length; j++) {
    //Iterate over cells
    for (let i = 0; i < colLength; i++) {
      cellNode = document.createElement("div");
      cellNode.setAttribute("class", "piece piece--available")
      cellNode.innerHTML = `${j*colLength+i}. ${game.availablePieces[j*colLength+i].description}`;
      piecesNode.children[j].appendChild(cellNode);
    }
  }
  //piecesNode.innerHTML = game.availablePieces.map((el, i) => ` ${i}. ${el.description}`); //¿Jala?
}

function fillGrid(game) {
  let boardNode = document.getElementById("board");
  let cells = game.board.slots.length;
  let colLength = Math.sqrt(cells);
  let cellNode;
  //Iterate over cols
  for (let j = 0; j < boardNode.children.length; j++) {
    //Iterate over cells
    for (let i = 0; i < colLength; i++) {
      cellNode = document.createElement("div");
      cellNode.setAttribute("class", "slot slot--empty")
      cellNode.innerHTML = `${j*colLength+i}. ${game.board.slots[j*colLength+i].description}`;
      boardNode.children[j].appendChild(cellNode);
    }
  }
}

function gfxUpdate(game) {
  let graphTimer = document.getElementById("testTimer");
  graphTimer.innerHTML = game.timer.secondsLeft; //¿O usar textNode?
}

//Called in Game.beginGame to fill players array
function createPlayer(playerNumber) {
  let nameTmp = `Which is player #${playerNumber}'s name?`;
  let colorTmp = `Which is player #${playerNumber}'s color? (Hex: #RRGGBB)`;
  let name = prompt(nameTmp, `Player ${playerNumber}`);
  let color = prompt(colorTmp, (playerNumber === 1) ? "#FFC300" : "#FF0000");
  return new Player(name, color, playerNumber);
}

function selectedPiece(piece) {
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = `You selected ${piece.description},
                         it's currently in position ${piece.position}`; //¿O usar textNode?
}

function placedPiece(piece, game) {
  let piecesNode = document.getElementById("availablePieces");
  let notifNode = document.getElementById("testNotif");
  let board = document.getElementById("board");
  let slot = game.board.slots.indexOf(piece);
  let rowLength = Math.sqrt(game.board.slots.length);
  let col = Math.floor(slot/rowLength);
  let row = slot % rowLength;
  notifNode.innerHTML = `You placed ${piece.description},
                         it's currently in board slot ${game.board.slots.indexOf(piece)}`; //¿O usar textNode?
  //piecesNode.innerHTML = game.availablePieces.map((el, i) => ` ${i}. ${el.description}`); //¿Jala?
  //This strikes through the piece and sets font to gray
  board.children[col].children[row].setAttribute("class", "slot--full"); //Refer to test.css
}

//TODO: Upgrade this
function wrongPiece() {
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = "Wrong piece!!"; //¿O usar textNode?
}

//TODO: Upgrade this
function wrongRot() {
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = "It didn't quite fit in..."; //¿O usar textNode?
}

//TODO: Build this
function wrongTone() {
  //Play audio with wrong tone
}

//TODO: Build this
function updateHighlights() {

}

function gameOver() {
  alert("¡Destreza!"); //TODO: Sustituir por animación chida
}

function testListeners() {
  let rlButton = document.getElementById("rotLeft");
  let rrButton = document.getElementById("rotRight");
  let plButton = document.getElementById("placePiece");

  rlButton.onclick = function() {
    testGame.players[0].heldPiece.rotateLeft();
  }

  rrButton.onclick = function() {
    testGame.players[0].heldPiece.rotateRight();
  }

  plButton.onclick = function() {
    testGame.players[0].placePiece(testGame);
  }
  
  //TODO: Cambiar esto porque las piezas se van sacando y deja undefineds
  /* Set up listeners for selected piece*/
  let pieces = document.getElementById("availablePieces");
  let size = testGame.availablePieces.length;
  let rowLength = Math.sqrt(size); //TODO: Change rowLength to colLength for consistency
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      let node = pieces.children[i].children[j];
      node.onclick = function() {
        let ind = parseInt(node.innerHTML.split(".")[0]);
        testGame.players[0].grabPiece(testGame, ind);
      }
    }
  }

  /*Set up listeners for selected slot */
  let board = document.getElementById("board");
  size = testGame.board.slots.length;
  rowLength = Math.sqrt(size);
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < rowLength; j++) {
      let node = board.children[i].children[j];
      node.onclick = function() {
        let ind = parseInt(node.innerHTML.split(".")[0]);
        testGame.board.selectSlot(ind);
      }
    }
  }
}