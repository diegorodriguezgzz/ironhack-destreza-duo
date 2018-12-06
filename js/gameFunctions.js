/* Game-specific functions */

function prepContainers(game) { //TODO: Make random positions for pieces
  //Declare variables
  let col;
  let piecesNode = document.getElementById("pieces-container");
  let boardNode = document.getElementById("board");
  //Set up pieces and board
  for (let i = 0; i < game.board.rows; i++) {
    col = document.createElement("div");
    boardCol = document.createElement("div");
    col.setAttribute("class", "col piece-column");
    boardCol.setAttribute("class", "col"); 
    piecesNode.appendChild(col);
    boardNode.appendChild(boardCol);
  }
}

function setAvailablePieces(game) {
  let piecesNode = document.getElementById("pieces-container");
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
      cellNode.setAttribute("class", "piece--available piece--hidden");
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
  let boardImgs = gridImgs.filter(el => game.board.slots.map(ie => ie.id).indexOf(el.id)!== -1);
  let cellNode;
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

//Called in Game.beginGame to fill players array
function createPlayer(playerNumber) {
  let nameTmp = `Which is player #${playerNumber}'s name?`;
  let colorTmp = `Which is player #${playerNumber}'s color? (Hex: #RRGGBB)`;
  let name = prompt(nameTmp, `Player ${playerNumber}`);
  let color = prompt(colorTmp, (playerNumber === 1) ? "#FFC300" : "#FF0000");
  return new Player(name, color, playerNumber);
}

function selectedPiece(game, piece) {
  keyboardListeners(game);
  dehighlightPieces(game);
  highlightPiece(piece);
}

function highlightPiece(piece) {
  let id = piece.id;
  let rotation = piece.position;
  let node = document.getElementById(`${id}-piece`);
  node.setAttribute("class", `svg piece piece--selected piece--rot${rotation}`);
}

//Just choose one piece
function dehighlightPieces(game) {
  let piecesCollection = document.getElementById("pieces-container");
  for (let i = 0; i < piecesCollection.children.length; i++) {
    for (let j = 0; j < piecesCollection.children[i].children.length; j++) {
      let id = piecesCollection.children[i].children[j].children[0].getAttribute("id").slice(0,2);
      let rotation = game.availablePieces.filter(el => el.id === id)[0].position;
      piecesCollection.children[i].children[j].children[0].setAttribute("class", 
      `svg piece piece--unselected piece--rot${rotation}`);
    }
  }
}

function revealPieces() {
  let piecesCollection = document.getElementById("pieces-container");
  for (let i = 0; i < piecesCollection.children.length; i++) {
    for (let j = 0; j < piecesCollection.children[i].children.length; j++) {
      piecesCollection
      .children[i]
      .children[j]
      .classList
      .remove("piece--hidden")
    }
  }
}

function placedPiece(piece, game) {
  let notifNode = document.getElementById("notification");
  notifNode.textContent = `You placed ${piece.description},
                         it's currently in board slot ${game.board.slots.indexOf(piece)}`;
  let fullPiece = document.getElementById(piece.id);
  fullPiece.setAttribute("class", "svg board-slot slot--full");
}

//TODO: Upgrade this
function wrongPiece(game) {
  let notifNode = document.getElementById("notification");
  notifNode.textContent = "Wrong piece!!"; //¿O usar textNode?
  dehighlightPieces(game);
}

//TODO: Upgrade this
function wrongRot(game) {
  let notifNode = document.getElementById("notification");
  notifNode.textContent = "It didn't quite fit in..."; //¿O usar textNode?
  dehighlightPieces(game);
}

function bing() {
  //Play audio with tone of approval
  ping.play();
}

function wrongTone() {
  //Play audio with wrong tone
  deny.play();
}

function gameOver() {
  expl.play();
  alert("¡Destreza!"); //TODO: Sustituir por animación chida
}

function youWin() {
  success.play();
  alert("Congratulations, you won!");
}

function gfxSetup(game) {
  setAvailablePieces(game);
  fillGrid(game);
  testListeners(game);
}

function gfxReset() {
  let piecesContainer = document.getElementById("pieces-container");
  let boardNode = document.getElementById("board");
  piecesContainer.innerHTML = "";
  boardNode.innerHTML = "";
}

function start(game) {
  piecesListeners(game);
  game.makeInterval(); //TODO: Refactor
  revealPieces();
}

function update(game) {
  game.timer.tickDown();
  gfxUpdate(game);
  if (game.checkGameOver()) {
    game.cleanInterval();
    gameOver();
  }
}

function gfxUpdate(game) {
  let graphTimer = document.getElementById("timer");
  graphTimer.textContent = game.timer.secondsLeft;
}

function changeButton() {
  optionsContainer = document.getElementById("options-container");
  startButton = document.getElementById("start");
  restartButton = document.createElement("button");
  restartButton.setAttribute("id", "restart");
  restartButton.setAttribute("class", "btn-restart");
  restartButton.textContent = "Restart";
  restartButton.onclick = restart;
  startButton.outerHTML = "";
  optionsContainer.appendChild(restartButton);
}

function testListeners(game) {
  let rlButton = document.getElementById("btn--rotate-left");
  let rrButton = document.getElementById("btn--rotate-right");
  let stButton = document.getElementById("start");

  rlButton.onclick = function() {
    game.players[0].heldPiece.rotateLeft(game);
  }

  rrButton.onclick = function() {
    game.players[0].heldPiece.rotateRight(game);
  }

  if (stButton !== null) {
    stButton.onclick = function() {
      start(game);
      changeButton();
    }
  }
}

function piecesListeners(game) { //TODO: Actualizar esto
  /* Set up listeners for selected piece*/
  let pieces = document.getElementById("pieces-container");
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
          game.board.selectSlot(svgid);
          game.players[0].placePiece(game);
        }
      }
    }
  this.listenersSet = true;
}

function keyboardListeners(game) { //Quizás actualizar esto
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: //left TODO: Refactor to avoid dependency on test
        game.players[0].heldPiece.rotateLeft(game)
        break;
      case 39: //right
        game.players[0].heldPiece.rotateRight(game)
        break;
      case 81: //Q
        game.players[0].heldPiece.rotateLeft(game)
        break;
      case 69: //E
        game.players[0].heldPiece.rotateRight(game)
        break;
    }
  }
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
function imgToSvg() {
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