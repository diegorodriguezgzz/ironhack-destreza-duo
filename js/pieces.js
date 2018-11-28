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