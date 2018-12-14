/* Set up game*/
let mode = prompt("Which mode will you play? 1P Easy / 1P Classic / 2P", "1P Easy");
currentGame = new Game(mode, pieces);
currentGame.beginGame();

function restart() {
  currentGame.cleanInterval();
  pieces = constructPieces(makePieces());
  gridImgs = loadGridImages(pieces);
  pieceImgs = loadPieceImages(pieces);
  gfxReset();
  mode = prompt("Which mode will you play? 1P Easy / 1P Classic / 2P", "1P Easy");
  currentGame = new Game(mode, pieces);
  currentGame.beginGame();
  revealPieces();
  piecesListeners(currentGame);
  currentGame.makeInterval();
}