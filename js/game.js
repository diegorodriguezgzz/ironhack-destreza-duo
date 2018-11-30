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
//Flatten pieces array for easy shuffling and sampling
pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);

//Bind class to collection of pieces
pieces = pieces.map(el => new Piece(el.id, el.description, el.syms, el.rots, el.color));

//Test mode:
//Generate 3x3 board
// testGame = new Game("Solo", pieces);

// testBoard = new Board(3);
// testBoard.fillBoard();
// testGame.filterPieces(testBoard);

// //Players
// tester = new Player("Test", "#FF0000", 1);
let mode = prompt("Which mode will you play? 1P Easy / 1P Classic / 2P", "1P Test");
testGame = new Game(mode, pieces);
testGame.beginGame();