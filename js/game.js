
/* Set up game*/
//Consider outright using a flat array in first place to improve performance
//Flatten pieces array for easy shuffling and sampling
pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);

//Bind class to collection of pieces
pieces = pieces.map(el => new Piece(el.id, el.description, el.syms, el.rots, el.color));

//Test mode:
//Generate 3x3 board
testGame = new Game("Solo", pieces);

testBoard = new Board(3);
testBoard.fillBoard();
testGame.filterPieces(testBoard);

//Players
tester = new Player("Test", "#FF0000", 1);