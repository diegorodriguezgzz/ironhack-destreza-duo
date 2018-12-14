/* Colors:  
  Blue (button): #0023B9
  Blue (piece border): #00051b
  Blue (board): #000b3b
  Yellow (piece): #FFC300
  Red: #FF0000
  Gray: #777777
*/

/* Constructors and 
prototype methods */

function Piece(id, description, rots, color) {
  this.id = id;
  this.description = description;
  this.rots = rots;
  this.color = color;
  this.path = `assets/${this.id}-${this.description}.svg`; //Ej src: "assets/1A-Semicircle.svg"
  this.boxPath = `assets/${this.id}-${this.description}-box.svg`;
  this.position = Math.floor(Math.random()*4); //Out of possible rotations
}

//Functions are defined within prototype to save memory

Piece.prototype.rotateLeft = function(game) {
  this.position = (this.position === 3) ? 0 : this.position + 1;
  selectedPiece(game, this);
}

Piece.prototype.rotateRight = function(game) {
  this.position = (this.position === 0) ? 3 : this.position - 1;
  selectedPiece(game, this);
}

Piece.prototype.checkRotation = function() {
  return (this.rots.indexOf(this.position) !== -1) ? true : false;
}

function Board(rows) {
  this.rows = rows; //3, 4 or 5
  this.slots = [];
  this.color = "#0023B9";
  this.selectedSlot = null;
}

Board.prototype.fillBoard = function() {
  let boardSize = this.rows**2; //Board is always square
  this.slots = sample(pieces, boardSize);
}

Board.prototype.selectSlot = function(svgid) {
  let ids = this.slots.map(el => el.id);
  this.selectedSlot = this.slots[ids.indexOf(svgid)];
}

function Player(name, color, number) {
  this.name = name;
  this.color = color;
  this.number = number;
  this.heldPiece = null;
  this.clickedSlot = null;
  this.timeCollection = [];
}

/*This one is intertwined with the Game class...
Input: index of game's available pieces array
Effect: Sets a reference to that piece from Player
The game is a hard parameter, whereas the index will be passed
through DOM interactions */
Player.prototype.grabPiece = function(game, pieceid) {
  this.heldPiece = game.availablePieces.filter(el => el.id === pieceid)[0];
  selectedPiece(game, this.heldPiece); //For graphic display
  gridListeners(game);
}

Player.prototype.placePiece = function(game) {
  if (game.board.selectedSlot.id === this.heldPiece.id && //The pieces match
      this.heldPiece.checkRotation()) { //Accurately rotated
      game.checkedPieces.push(
        game.availablePieces.splice(
          game.availablePieces.indexOf(this.heldPiece), 1
          )[0] //So this returns an element and not a full array
        ) //Just move the one piece from one array to the other
      placedPiece(this.heldPiece, game);//Notify the player
      let pieceDiv = document.getElementById(`${this.heldPiece.id}-piece`);
      pieceDiv.style.display = "none";
      piecesListeners(game);
      if(game.checkFinished(game.board)) {
        game.checkWinner(game.timer);
      } //And check if the game is over
      else {
        bing();
      }
  }
  else if (game.board.selectedSlot.id === this.heldPiece.id && //Just wrong rotation
    !this.heldPiece.checkRotation()) {
    wrongTone();
    wrongRot(game);
  }
  else {
    wrongTone();
    wrongPiece(game);
    dehighlightPieces(game);
  }
  
  this.heldPiece = null; //Return piece to board in original position
  game.board.selectedSlot = null;
  this.clickedSlot = null;
}

function Game(mode, pieces) {
  this.mode = mode; //1P Classic, 1P Easy, 2P
  this.availablePieces = pieces;
  this.checkedPieces = [];
  this.listenersSet = false;
}

Game.prototype.buildParameters = function() {
  switch (this.mode) {
    case "1P Easy":
      this.modeParams = { 
        time : 40, 
        players : 1,
        rows : 3,
        sequence : [5]
      }
      break;
    case "1P Classic":
      this.modeParams = { 
        time : 60, 
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
    case "Practice":
      this.modeParams = {
        time : 3600, 
        players : 1,
        rows : 5,
        sequence : [5]
      }
      break;

    default:
      this.modeParams = {
        time : 40, 
        players : 1,
        rows : 3,
        sequence : [3]
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
  gfxSetup(this);
}

Game.prototype.makeInterval = function() {
  this.interval = setInterval(update, 1000, this);
}

Game.prototype.cleanInterval = function() {
  clearInterval(this.interval);
}


Game.prototype.filterPieces = function() { //Keep only the pieces that are relevant
  this.availablePieces = this.availablePieces.filter(el => this.board.slots.indexOf(el) !== -1);
  this.originalPieces = this.availablePieces.slice(0, this.availablePieces.length);
}

Game.prototype.checkFinished = function() { //Solo
  return (this.checkedPieces.length === this.board.slots.length) ? true : false;
}

Game.prototype.checkGameOver = function() {
  return (this.timer.secondsLeft <= 0) ? true : false; //Return true if time is over
}

Game.prototype.checkWinner = function(chron) {
  if (this.players.length === 1) {
    this.players[0].timeCollection.push(chron.secondsLeft);
    this.cleanInterval();
    youWin();
  }
  else {
    //Check who, out of the available players, did best in the game
    //Also check if the game is finished, and rule on who did best
  }
}

function Chrono(time) {
  this.secondsLeft = time;
}

//Function to tick
Chrono.prototype.tickDown = function() {
  this.secondsLeft--;
}