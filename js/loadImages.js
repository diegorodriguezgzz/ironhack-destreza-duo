//Flatten pieces array for easy shuffling and sampling
pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);

//Bind class to collection of pieces
pieces = pieces.map(el => new Piece(el.id, el.description, el.syms, el.rots, el.color));

let gridImgs = [];
for (let i = 0; i < 25; i++) {
  gridImgs.push(new Image());
  gridImgs[i].id = pieces[i].id;
  gridImgs[i].src = pieces[i].boxPath;
  gridImgs[i].setAttribute("class", "svg board-slot slot--empty");
}

let pieceImgs = [];
for (let i = 0; i < 25; i++) {
  pieceImgs.push(new Image);
  pieceImgs[i].src = pieces[i].path;
}