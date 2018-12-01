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
  this.path = `assets/${this.id}-${this.description}.svg`; //Ej src: "assets/1A-Semicircle.svg"
  this.boxPath = `assets/${this.id}-${this.description}-box.svg`;
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
Board.prototype.selectSlot = function(svgid) {
  let ids = this.slots.map(el => el.id);
  this.selectedSlot = this.slots[ids.indexOf(svgid)];
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = `The board has ${this.selectedSlot.description} selected`; //¿O usar textNode?
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
Player.prototype.grabPiece = function(game, pieceid) {
  this.heldPiece = game.availablePieces.filter(el => el.id === pieceid)[0];
  selectedPiece(this.heldPiece); //For graphic display
  gridListeners(game);
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
      placedPiece(this.heldPiece, game);//Notify the player
      console.log(`${this.heldPiece.id}`)
      let pieceDiv = document.getElementById(`${this.heldPiece.id}-piece`);
      pieceDiv.parentNode.outerHTML=""; //Delete the element
      piecesListeners(game);
      if(game.checkFinished(game.board)) {
        game.checkWinner();
      } //And check if the game is over
  }
  else if (!this.heldPiece.checkRotation()) {
    wrongRot();
  }
  else {//Mostrar mensaje de alerta
    wrongTone();
    wrongPiece();
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
  this.listenersSet = false;
}

Game.prototype.buildParameters = function() {
  switch (this.mode) { //TODO: Verificar si sequence se queda
    case "1P Easy":
      this.modeParams = { 
        time : 60, 
        players : 1,
        rows : 3,
        sequence : [5]
      }
      break;
    case "1P Classic":
      this.modeParams = { 
        time : 90, 
        players : 1,
        rows : 5,
        sequence : [5]
      }
      break;    
    case "1P Test":
      this.modeParams = { //Test parameters
        time : 120, //260
        players : 1,
        rows : 5,
        sequence : [5]
      }
      break;
    case "2P":
      this.modeParams = { 
        time : 60, 
        players : 2,
        rows : 3,
        sequence : [3,4,5]
      }
      break;
    default:
      this.modeParams = {
        time : 90, 
        players : 1,
        rows : 5,
        sequence : [5]
      }
      break;
  }
}

Game.prototype.beginGame = function() {
  this.buildParameters();
  this.board = new Board(this.modeParams.rows);
  prepContainers(this); //DOM Manipulation
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

Game.prototype.checkFinished = function() { //Solo
  return (this.checkedPieces.length === this.board.slots.length) ? true : false;
}

Game.prototype.checkGameOver = function() {
  return (this.timer.secondsLeft <= 0) ? true : false; //Return true if time is over
}

Game.prototype.checkWinner = function() {
  if (this.players.length === 1) {
    alert("Congratulations, you won!");
    clearInterval(this.interval);
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
Chrono.prototype.tickDown = function() {
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

//Super special thanks to Drew Baker and Henrik Albrechtsson 
//https://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996
function imgToSvg() { //TODO: Use event listener to handle loading properly
  $('img[src$=".svg"]').each(function () {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

     $.get(imgURL, function (data) {
       // Get the SVG tag, ignore the rest
       var $svg = jQuery(data).find('svg');

       // Remove any invalid XML tags
       $svg = $svg.removeAttr('xmlns:a');

       // Loop through IMG attributes and apply on SVG
       $.each(attributes, function () {
         $svg.attr(this.name, this.value);
       });

       // Replace IMG with SVG
       $img.replaceWith($svg);
     }, 'xml');
   });
}

/* Game-specific functions */
function prepContainers(game) {
  //Declare variables
  let col;
  let piecesNode = document.getElementById("availablePieces");
  let boardNode = document.getElementById("board");
  //Set up pieces and board
  for (let i = 0; i < game.board.rows; i++) {
    col = document.createElement("div");
    boardCol = document.createElement("div");
    col.setAttribute("class", "col");
    boardCol.setAttribute("class", "col"); 
    piecesNode.appendChild(col);
    boardNode.appendChild(boardCol);
  }
}

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
  let colLength = game.board.rows;
  let cells = game.availablePieces.length;
  let cols = Math.ceil(cells / colLength);
  let remainder = (cells % colLength === 0) ? colLength : cells % colLength;
  let svgs = pieceImgs.filter(el => game.availablePieces.map(ie => ie.id).indexOf(el.id.slice(0,2))!== -1);
  let cellNode;
  //Iterate over cols
  for (let i = 0; i < cols; i++) {
    //Iterate over cells
    piecesNode.children[i].innerHTML = "";
    for (let j = 0; j < ((i === cols-1) ? remainder : colLength); j++) {
      cellNode = document.createElement("div");
      cellNode.setAttribute("class", "piece--available");
      let svg = svgs[svgs.map(el => el.id.slice(0,2))
        .indexOf(game.availablePieces[j*colLength+i].id)];
      cellNode.appendChild(svg);
      piecesNode.children[i].appendChild(cellNode);
    }
  }
}

function fillGrid(game) {
  let boardNode = document.getElementById("board");
  let colLength = game.board.rows;
  let cellNode;
  let boardImgs = gridImgs.filter(el => game.board.slots.map(ie => ie.id).indexOf(el.id)!== -1);
  //Iterate over cols
  for (let j = 0; j < boardNode.children.length; j++) {
    //Iterate over cells
    for (let i = 0; i < colLength; i++) {
      cellNode = document.createElement("div");
      cellNode.setAttribute("class", "slot slot--empty");
      cellNode.appendChild(boardImgs[boardImgs.map(el => el.id)
        .indexOf(game.board.slots[j*colLength+i].id)]);
      boardNode.children[j].appendChild(cellNode);
    }
  }
  imgToSvg();
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
  keyboardListeners();
  dehighlightPieces();
  highlightPiece(piece);
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = `You selected ${piece.description},
                         it's currently in position ${piece.position}`; //¿O usar textNode?
}

function highlightPiece(piece) {
  let id = piece.id;
  let node = document.getElementById(`${id}-piece`);
  node.setAttribute("class", "svg piece piece--selected");
}

//Just choose one piece
function dehighlightPieces() {
  let piecesCollection = document.getElementById("availablePieces");
  for (let i = 0; i < piecesCollection.children.length; i++) {
    for (let j = 0; j < piecesCollection.children[i].children.length; j++) {
      piecesCollection.children[i].children[j].children[0].setAttribute("class", "svg piece piece--unselected");
    }
  }
}

function placedPiece(piece, game) {
  let notifNode = document.getElementById("testNotif");
  let board = document.getElementById("board");
  let slot = game.board.slots.indexOf(piece);
  let rowLength = Math.sqrt(game.board.slots.length);
  let col = Math.floor(slot/rowLength);
  let row = slot % rowLength;
  notifNode.innerHTML = `You placed ${piece.description},
                         it's currently in board slot ${game.board.slots.indexOf(piece)}`;
  //This strikes through the piece and sets font to gray
  let fullPiece = document.getElementById(piece.id);
  fullPiece.setAttribute("class", "svg board-slot slot--full");
  //board.children[col].children[row].children[0].setAttribute("class", "svg board-slot slot--full"); //Refer to test.css
  //node.setAttribute("class", "svg board-slot slot--full");
}

//TODO: Upgrade this
function wrongPiece() {
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = "Wrong piece!!"; //¿O usar textNode?
  dehighlightPieces();
}

//TODO: Upgrade this
function wrongRot() {
  let notifNode = document.getElementById("testNotif");
  notifNode.innerHTML = "It didn't quite fit in..."; //¿O usar textNode?
  dehighlightPieces();
}

//TODO: Build this
function wrongTone() {
  //Play audio with wrong tone
}

function gameOver() {
  alert("¡Destreza!"); //TODO: Sustituir por animación chida
}

function testListeners() {
  let rlButton = document.getElementById("rotLeft");
  let rrButton = document.getElementById("rotRight");
  let stButton = document.getElementById("start");

  rlButton.onclick = function() {
    testGame.players[0].heldPiece.rotateLeft();
  }

  rrButton.onclick = function() {
    testGame.players[0].heldPiece.rotateRight();
  }

  stButton.onclick = function() {
    start();
  }
}

function piecesListeners(game) { //TODO: Actualizar esto
  /* Set up listeners for selected piece*/
  let pieces = document.getElementById("availablePieces");
  let size = game.availablePieces.length;
  let colLength = Math.sqrt(size);
  for (let i = 0; i < colLength; i++) {
    for (let j = 0; j < pieces.children[i].children.length; j++) { //¿Ya?
      let node = pieces.children[i].children[j];
      node.onclick = function() {
        let pieceid = node.children[0].id.slice(0,2);
        game.players[0].grabPiece(game, pieceid); //¿Cómo agarrar el player?
      }
    }
  }
}

function gridListeners(game) {
    let board = document.getElementById("board");
    size = game.board.slots.length;
    rowLength = Math.sqrt(size);
    for (let i = 0; i < rowLength; i++) {
      for (let j = 0; j < rowLength; j++) {
        let node = board.children[i].children[j].children[0];
        let svgid = node.id;
        node.onclick = function() {
          testGame.board.selectSlot(svgid);
          testGame.players[0].placePiece(testGame);
        }
      }
    }
  this.listenersSet = true;
}

function keyboardListeners() { //Quizás actualizar esto
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: //left TODO: Refactor to avoid dependency on test
        testGame.players[0].heldPiece.rotateLeft()
        break;
      case 39: //right
        testGame.players[0].heldPiece.rotateRight()
        break;
    }
  }
}

function start() {
  piecesListeners(testGame);
}