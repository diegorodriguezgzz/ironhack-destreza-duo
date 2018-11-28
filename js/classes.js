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
    description: "Star",
    syms: 5, 
    rots: [0],
    color: "#777777"
  },
  {
    id: "2B",
    description: "Triskelion",
    syms: 3,
    rots: [0],
    color: "#777777"
  },
  {
    id: "3B",
    description: "Diamond",
    syms: 2,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "4B",
    description: "Hexagon",
    syms: 3,
    rots: [0,2],
    color: "#777777"
  },  
  {
    id: "5B",
    description: "Hotdog",
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
    description: "Equilateral-triangle",
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
    description: "Right-triangle",
    syms: 1,
    rots: [0],
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
    description: "Trapezoid",
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
};

//Functions are defined within prototype to save memory
Piece.prototype.select = function(player) {
  player.holds = this; //Player holds the piece
  this.color = player.color; //Piece color matches the player's color
}; //Should I bind something here??

function Player(name, color) {
  this.name = name;
  this.color = color;
};

function Game(mode) {
  this.mode = mode; //1P Classic, 1P Easy, 2P
};

function Chrono(time) {
  this.startTime = time;
};