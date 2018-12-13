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

/* Set up game*/

//Consider outright using a flat array in first place to improve performance
//Test mode:
//Generate 3x3 board
// testGame = new Game("Solo", pieces);

// testBoard = new Board(3);
// testBoard.fillBoard();
// testGame.filterPieces(testBoard);

// //Players
// tester = new Player("Test", "#FF0000", 1);

//TODO: Agregar tutorial

let mode = prompt("Which mode will you play? 1P Easy / 1P Classic / 2P", "1P Easy");
testGame = new Game(mode, pieces);
testGame.beginGame();

function restart() {
  testGame.cleanInterval();
  pieces = constructPieces(makePieces()); //TODO: Check!
  gridImgs = loadGridImages(pieces);
  pieceImgs = loadPieceImages(pieces);
  gfxReset();
  mode = prompt("Which mode will you play? 1P Easy / 1P Classic / 2P", "1P Easy");
  testGame = new Game(mode, pieces);
  testGame.beginGame();
  revealPieces();
  piecesListeners(testGame);
  testGame.makeInterval();
}