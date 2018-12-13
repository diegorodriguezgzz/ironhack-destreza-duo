/* Game pieces catalogue */
/* Consider allowin(g color-coded rows for a low-difficulty challenge*/
function makePieces() {
  let rowA = [
    {
      id: "1A",
      description: "Semicircle",
      rots: [0], //If current rotation is in rots, then the piece enters,
      color: "#777777",
    },
    {
      id: "2A",
      description: "Rhombus",
      rots: [0,1,2,3], //0 is for 0°, 1 for 90°, 2 for 180° and 3 for 270°,
      color: "#777777"
    },
    {
      id: "3A",
      description: "Tilde",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "4A",
      description: "Hexagon",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "5A",
      description: "Starfish",
      rots: [0],
      color: "#777777"
    },
  ];
  
  let rowB = [
    {
      id: "1B",
      description: "Five-Point-Star",
      rots: [0],
      color: "#777777"
    },
    {
      id: "2B",
      description: "Hotdog",
      rots: [0,2],
      color: "#777777"
    },
    {
      id: "3B",
      description: "Right-triangle",
      rots: [0],
      color: "#777777"
    },  
    {
      id: "4B",
      description: "Triskelion",
      rots: [0],
      color: "#777777"
    },  
    {
      id: "5B",
      description: "Rectangle",
      rots: [0,2],
      color: "#777777"
    },
  ];
  
  let rowC = [
    {
      id: "1C",
      description: "Rhombus-2",
      rots: [0,2],
      color: "#777777"
    },
    {
      id: "2C",
      description: "Arc",
      rots: [0],
      color: "#777777"
    },
    {
      id: "3C",
      description: "Circle",
      rots: [0,1,2,3],
      color: "#777777"
    },  
    {
      id: "4C",
      description: "Wide-cross",
      rots: [0,1,2,3],
      color: "#777777"
    },  
    {
      id: "5C",
      description: "Inverted-tilde",
      rots: [0, 2],
      color: "#777777"
    },
  ];
  
  let rowD = [
    {
      id: "1D",
      description: "Quarter-circle",
      rots: [0],
      color: "#777777"
    },
    {
      id: "2D",
      description: "Trapezoid",
      rots: [0],
      color: "#777777"
    },
    {
      id: "3D",
      description: "Six-point-star",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "4D",
      description: "Diamond",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "5D",
      description: "Octagon",
      rots: [0,1,2,3],
      color: "#777777"
    },
  ];
  
  let rowE = [
    {
      id: "1E",
      description: "Star-piece",
      rots: [0],
      color: "#777777"
    },
    {
      id: "2E",
      description: "Pentagon",
      rots: [0],
      color: "#777777"
    },
    {
      id: "3E",
      description: "Pill",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "4E",
      description: "X",
      rots: [0,2],
      color: "#777777"
    },  
    {
      id: "5E",
      description: "Equilateral-triangle",
      rots: [0],
      color: "#777777"
    },
  ];
  
  let pieces = [
    //5x5 grid
    rowA, rowB, rowC, rowD, rowE
  ];

  return pieces;
}

pieces = makePieces();