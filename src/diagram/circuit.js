function getCircuit(i) {
  // TODO
  switch (i) {
    case 1:
      return {
        cols: [["H"], [1, "H"], ["•", "X"], ["H"], [1, "H"]],
      };
    case 2:
      return {
        cols: [["H"], ["•", "X"], ["H"], [1, "H"]],
      };
    case 3:
      return {
        cols: [
          ["H"],
          ["•", "X"],
          [1, "Z"],
          ["H"],
          [1, "H"],
          ["X", "•"],
          [1, "H"],
        ],
      };
    default: {
    }
  }
}
