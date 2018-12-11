/* Game-specific functions */

function prepContainers(game) { //TODO: Make random positions for pieces
  //Declare variables
  let boardNode = document.getElementById("board");
  //Set up pieces and board
  for (let i = 0; i < game.board.rows; i++) {
    boardCol = document.createElement("div");
    boardCol.setAttribute("class", "col"); 
    boardNode.appendChild(boardCol);
  }
}

function setAvailablePieces(game) {
  let piecesNode = document.getElementById("pieces-container");
  let slackLeft = 80; //Pixels before maxima, for random positioning
  let slackTop = 20;
  let ofLeft = piecesNode.offsetLeft;
  let ofTop = piecesNode.offsetTop;
  let maxLeft = ofLeft + piecesNode.offsetWidth - slackLeft;
  let maxTop = ofTop + piecesNode.offsetHeight - slackTop;
  let cells = game.availablePieces.length;
  let svgs = pieceImgs.filter(el => game.availablePieces.map(ie => ie.id).indexOf(el.id.slice(0,2))!== -1);
  let cellNode;
  //Iterate over cells
  for (let i = 0; i < cells; i++) {
    cellNode = document.createElement("div");
    cellNode.setAttribute("class", "piece--available piece--hidden");
    //Find the right image
    let svg = svgs[svgs.map(el => 
      el.id
        .slice(0,2))
        .indexOf(game.availablePieces[i].id)];
    cellNode.appendChild(svg);
    //Place the div randomly
    let left = Math.floor(Math.random()*(maxLeft - ofLeft)) + ofLeft; //In percentages
    let top = Math.floor(Math.random()*(maxTop - ofTop)) + ofTop;
    cellNode.style.position = "absolute";
    cellNode.style.left = `${left}px`;
    cellNode.style.top = `${top}px`;
    //Generate random positions and program with help from CSS
    piecesNode.appendChild(cellNode);
  }
}

function resetAvailablePieces(game) {
  let boardNode = document.getElementById("board");
  let piecesCollection = document.getElementById("pieces-container");
  let pieceNode;
  //Color all slots to defaults
  for (let i = 0; i < boardNode.children.length; i++) {
    for (let j = 0; j < boardNode.children[i].children.length; j++) {
      if (boardNode.children[i].children[j].children[0].classList.contains("slot--full")) {
        boardNode.children[i].children[j].children[0].setAttribute("class", "board-slot slot--empty");
        //and place substitute svgs in that position
        let id = boardNode.children[i].children[j].children[0].id;
        let svg;
        for (let k = 0; k < piecesCollection.children; k++) { //TODO: Fix this!!!
          if (piecesCollection.children[k].id === id) {
            svg = piecesCollection.children[k];
            svg.style.display = "block";
            svg.style.position = "absolute";
            svg.style.top = boardNode.children[i].children[j].offsetTop;
            svg.style.left = boardNode.children[i].children[j].offsetLeft;
            svg.children[0].style.display = "block";
            svg.children[0].style.position = "absolute";
            svg.children[0].style.top = boardNode.children[i].children[j].offsetTop;
            svg.children[0].style.left = boardNode.children[i].children[j].offsetLeft;
          }
        }
        //In color and original rot
        //subImg.setAttribute("class", `svg piece piece--selected piece--rot0`);
        //pieceNode = document.createElement("img")
      }
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
    let id = piecesCollection.children[i].children[0].getAttribute("id").slice(0, 2);
    if (game.availablePieces.map(el => el.id).indexOf(id) !== -1) {
      /*let rotation = game
        .availablePieces
        .filter(el => el.id === id)[0]
        .position;
      piecesCollection
        .children[i]
        .children[0]
        .setAttribute("class", `svg piece piece--unselected piece--rot${rotation}`);*/
      piecesCollection
        .children[i]
        .children[0]
        .classList
        .remove("piece--selected");
      piecesCollection
        .children[i]
        .children[0]
        .classList
        .add("piece--unselected");
    }
  }
}

function revealPieces() {
  let piecesCollection = document.getElementById("pieces-container");
  for (let i = 0; i < piecesCollection.children.length; i++) {
    piecesCollection
      .children[i]
      .classList
      .remove("piece--hidden")
  }
}

function placedPiece(piece, game) {
  let fullPiece = document.getElementById(piece.id);
  fullPiece.setAttribute("class", "svg board-slot slot--full");
}

//TODO: Upgrade this
function wrongPiece(game) {
  dehighlightPieces(game);
}

//TODO: Upgrade this or replace
function wrongRot(game) {
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
  let graphTimer = document.getElementsByClassName("timer");
  for (let  i = 0; i < graphTimer.length; i++) {
    graphTimer[i].textContent = game.timer.secondsLeft;
  }
}

function changeButton() {
  let optionsContainer = document.getElementsByClassName("options-container");
  let timerContainer = document.getElementById("timer-container--mobile");
  for (let i = 0; i < optionsContainer.length; i++) {
    startButton = document.getElementsByClassName("btn-start")[0]; //TODO: ¿Jala?
    restartButton = document.createElement("button");
    restartButton.setAttribute("id",
    (i === 0) ? "restart" : "restart--mobile");
    restartButton.setAttribute("class", "btn-restart");
    restartButton.textContent = "Restart Game";
    restartButton.onclick = restart;
    startButton.outerHTML = "";
    if (i === 0) {
      optionsContainer[i].appendChild(restartButton);
    }
    else {
      optionsContainer[i].insertBefore(restartButton, timerContainer);
    }
  }
}

function testListeners(game) {
  let rlButton = document.getElementById("btn--rotate-left");
  let rrButton = document.getElementById("btn--rotate-right");
  let rrMobileButton = document.getElementById("btn--rotate-mobile");
  let stButton = document.getElementById("start");
  let stMobileButton = document.getElementById("start--mobile");

  rlButton.onclick = function() {
    game.players[0].heldPiece.rotateLeft(game);
  }

  rrButton.onclick = function() {
    game.players[0].heldPiece.rotateRight(game);
  }

  rrMobileButton.onclick = function() {
    game.players[0].heldPiece.rotateRight(game);
  }

  if (stButton !== null) {
    stButton.onclick = function() {
      start(game);
      changeButton();
    }
  }

  if (stMobileButton !== null) {
    stMobileButton.onclick = function() {
      start(game);
      changeButton();
    }
  }
}

function piecesListeners(game) { //TODO: Actualizar esto
  /* Set up listeners for selected piece*/
  let pieces = document.getElementById("pieces-container");
  for (let i = 0; i < pieces.children.length; i++) { //¿Ya?
    let node = pieces.children[i];
    node.onclick = function () {
      let pieceid = node.children[0].id.slice(0, 2);
      game.players[0].grabPiece(game, pieceid); //¿Cómo agarrar el player?
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
          if (game.players[0].heldPiece != null) {
            game.players[0].placePiece(game);
          }
        }
      }
    }
  this.listenersSet = true;
}

function keyboardListeners(game) { //Quizás actualizar esto
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37: //left
        if (game.players[0].heldPiece != null) game.players[0].heldPiece.rotateLeft(game)
        break;
      case 39: //right
        if (game.players[0].heldPiece != null) game.players[0].heldPiece.rotateRight(game)
        break;
      case 81: //Q
        if (game.players[0].heldPiece != null) game.players[0].heldPiece.rotateLeft(game)
        break;
      case 69: //E
        if (game.players[0].heldPiece != null) game.players[0].heldPiece.rotateRight(game)
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