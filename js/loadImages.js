function constructPieces(pieces) {
  //Flatten pieces array for easy shuffling and sampling
  pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);
  
  //Bind class to collection of pieces & return
  return pieces.map(el => new Piece(el.id, el.description, el.rots, el.color));
}
  
function loadGridImages(pieces) {
  let gridImgs = [];
  for (let i = 0; i < 25; i++) {
    gridImgs.push(new Image());
    gridImgs[i].id = pieces[i].id;
    gridImgs[i].src = pieces[i].boxPath;
    gridImgs[i].setAttribute("class", "svg board-slot slot--empty");
  }
  return gridImgs;
}

function loadPieceImages(pieces) {
  let pieceImgs = [];
  for (let i = 0; i < 25; i++) {
    pieceImgs.push(new Image);
    pieceImgs[i].setAttribute("id", `${pieces[i].id}-piece`);
    pieceImgs[i].src = pieces[i].path;
    pieceImgs[i].setAttribute("class", `svg piece piece--unselected piece--rot${pieces[i].position}`);
  }
  return pieceImgs;
}
//TODO: Ver si puedo mover esto y convertirlo en svg desde acá

pieces = constructPieces(pieces);
gridImgs = loadGridImages(pieces);
pieceImgs = loadPieceImages(pieces);