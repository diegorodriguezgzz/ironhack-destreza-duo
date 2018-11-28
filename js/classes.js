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
Piece.prototype.select = function(player) {
  player.holds = this; //Player holds the piece
  this.color = player.color; //Piece color matches the player's color
} //Should I bind something here??

//Seems to work well
Piece.prototype.rotateLeft = function() {
  this.position = (this.position === 3) ? 0 : this.position + 1;
}

//Seems to work well
Piece.prototype.rotateRight = function() {
  this.position = (this.position === 0) ? 3 : this.position - 1;
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

//TO DO: complete
Board.prototype.setSlot = function(player) {
  this.selectedSlot = player.clickedSlot; //Asegurarse que funcione
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
}

//TO DO: complete
Player.prototype.placePiece = function(board, game) {
  if (board.selectedSlot.id === this.heldPiece.id && //The pieces match
      this.heldPiece.checkRotation()) { //Accurately rotated
      game.checkedPieces.push(
        game.availablePieces.splice(
          game.availablePieces.indexOf(this.heldPiece), 1
          )[0] //So this returns an element and not a full array
        ) //Just move the one piece from one array to the other
        
        //Agregar pieza a piezas acomodadas
  }
  else {
    //Mostrar mensaje de alerta
    //Tocar tono de equivocación
    //Regresar pieza a tablero en posición original
  }
}

//TO DO: complete
Player.prototype.clickSlot = function(slot) {
  this.clickedSlot = slot;
}

function Game(mode, pieces) {
  this.mode = mode; //1P Classic, 1P Easy, 2P
  this.availablePieces = pieces;
  this.checkedPieces = [];
}

//Seems to work well
Game.prototype.filterPieces = function(board) { //Keep only the pieces that are relevant
  this.availablePieces = this.availablePieces.filter(el => board.slots.indexOf(el) !== -1);
}

//TO DO: Test
Game.prototype.checkFinished = function(board) { //Solo
  return (this.checkedPieces.length === board.slots.length) ? true : false;
}

//TO DO: Test
Game.prototype.checkGameOver = function(timer) {
  return (timer.secondsLeft <= 0) ? true : false; //Return true if time is over
}

//TO DO: Build
Game.prototype.checkWinner = function() {
  //Check who, out of the available players, did best in the game
}

//TO DO: Build
function Chrono(time) {
  this.startTime = time;
  this.secondsLeft = 90;
}

//Function to tick
//Function to set seconds left

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
    newArray = array.slice(0); //First make a shallow copy of the array
    shuffle(newArray); //Then shuffle the new array
    newArray = newArray.slice(0, size); //Then only keep indexes up to size
    return newArray;
  }
  else {
    console.error("Stats error: array size must be larger than sample size");
  }
}

/* Set up game*/
//Consider outright using a flat array in first place to improve performance
//Flatten pieces array for easy shuffling and sampling
// pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);

// //Bind class to collection of pieces
// pieces = pieces.map(el => new Piece(el.id, el.description, el.syms, el.rots, el.color));


/* Expected flow:
Set pieces
Set board (random)
Set players
1P:
  *Set timer
  *Arrange pieces randomly
  *P1 selects piece from canvas
  *P1 flips piece in submenu
  *P1 selects slot in board
  *Player checks if piece fits in board
*/