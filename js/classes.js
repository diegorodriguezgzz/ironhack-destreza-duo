/* Colors:  
  Blue (board): #0023B9
  Yellow (piece): #FFC300
  Red: #FF0000
  Gray: #777777
*/

/* Game pieces catalogue */
/* Consider allowing color-coded rows for a low-difficulty challenge*/
let rowA = [
  {
    id: "1A",
    description: "Semicircle",
    syms: 1, //Symmetries determine rotation array
    rots: [0], //If current rotation is in rots, then the piece enters,
    color: "#777777"
  },
  {
    id: "2A",
    description: "Rhombus",
    syms: 4,
    rots: [0,1,2,3], //0 is for 0°, 1 for 90°, 2 for 180° and 3 for 270°,
    color: "#777777"
  },
  {
    id: "3A",
    description: "Tilde",
    syms: 1,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "4A",
    description: "Hexagon",
    syms: 3,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "5A",
    description: "Starfish",
    syms: 5,
    rots: [0],
    color: "#777777"
  },
];

let rowB = [
  {
    id: "1B",
    description: "Five-Point-Star",
    syms: 5, 
    rots: [0],
    color: "#777777"
  },
  {
    id: "2B",
    description: "Hotdog",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },
  {
    id: "3B",
    description: "Right-triangle",
    syms: 1,
    rots: [0],
    color: "#777777"
  },  
  {
    id: "4B",
    description: "Triskelion",
    syms: 3,
    rots: [0],
    color: "#777777"
  },  
  {
    id: "5B",
    description: "Rectangle",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },
];

let rowC = [
  {
    id: "1C",
    description: "Rhombus-2",
    syms: 2, 
    rots: [0,2],
    color: "#777777"
  },
  {
    id: "2C",
    description: "Arc",
    syms: 1,
    rots: [0],
    color: "#777777"
  },
  {
    id: "3C",
    description: "Circle",
    syms: 999,
    rots: [0,1,2,3],
    color: "#777777"
  },  
  {
    id: "4C",
    description: "Wide-cross",
    syms: 4,
    rots: [0,1,2,3],
    color: "#777777"
  },  
  {
    id: "5C",
    description: "Inverted-tilde",
    syms: 1,
    rots: [0],
    color: "#777777"
  },
];

let rowD = [
  {
    id: "1D",
    description: "Quarter-circle",
    syms: 1, 
    rots: [0],
    color: "#777777"
  },
  {
    id: "2D",
    description: "Trapezoid",
    syms: 3,
    rots: [0],
    color: "#777777"
  },
  {
    id: "3D",
    description: "Six-point-star",
    syms: 6,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "4D",
    description: "Diamond",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "5D",
    description: "Octagon",
    syms: 8,
    rots: [0,1,2,3],
    color: "#777777"
  },
];

let rowE = [
  {
    id: "1E",
    description: "Star-piece",
    syms: 1, 
    rots: [0],
    color: "#777777"
  },
  {
    id: "2E",
    description: "Pentagon",
    syms: 5,
    rots: [0],
    color: "#777777"
  },
  {
    id: "3E",
    description: "Pill",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "4E",
    description: "X",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "5E",
    description: "Equilateral-triangle",
    syms: 3,
    rots: [0],
    color: "#777777"
  },
];

let pieces = [
  //5x5 grid
  rowA, rowB, rowC, rowD, rowE
];

// Correr para testing:
//pieces.forEach(el => el.forEach(ie => console.log(ie.description)));

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

Piece.prototype.rotateLeft = function() {
  this.position = (this.position === 3) ? 0 : this.position + 1;
}

Piece.prototype.rotateRight = function() {
  this.position = (this.position === 0) ? 3 : this.position - 1;
}

//Consider outright using a flat array in first place to improve performance
//Flatten pieces array for easy shuffling and sampling
pieces = pieces[0].concat(pieces[1],pieces[2],pieces[3],pieces[4]);

//Bind class to collection of pieces
pieces = pieces.map(el => new Piece(el.id, el.description, el.syms, el.rots, el.color));

function Board(rows) {
  this.rows = rows; //3, 4 or 5
  this.slots = [];
  this.color = "#0023B9";
}

Board.prototype.fillBoard = function() {
  let boardSize = this.rows**2; //Board is always square
  this.slots = sample(pieces, boardSize);
}

function Player(name, color, number) {
  this.name = name;
  this.color = color;
  this.number = number;
}

function Game(mode) {
  this.mode = mode; //1P Classic, 1P Easy, 2P
}

function Chrono(time) {
  this.startTime = time;
}

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