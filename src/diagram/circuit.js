function openCircuitPane() {
  document.getElementById("circuit").style.width = "100%";
}

function closeCircuitPane() {
  document.getElementById("circuit").style.width = "0%";
}

function getTestCircuit(i) {
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

    case 4:
      return {
        cols: [
          ["H"],
          ["•", "X"],
          [1, "Z"],
          [1, "•", "X"],
          ["H"],
          [1, "H"],
          ["X", "•"],
          [1, "H"],
        ],
      };

    case 5:
      return {
        cols: [["H"], [1, "H"], [1, 1, "H"], [1, 1, 1, "H"]],
      };

    case 6:
      return {
        cols: [
          ["H"],
          [1, "H"],
          [1, 1, "H"],
          [1, 1, 1, "H"],
          [1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, "H"],
        ],
      };

    case 7:
      return {
        cols: [
          ["H"],
          [1, "H"],
          [1, 1, "H"],
          [1, 1, 1, "H"],
          [1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, "H"],
        ],
      };

    case 8:
      return {
        cols: [
          ["H"],
          [1, "H"],
          [1, 1, "H"],
          [1, 1, 1, "H"],
          [1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, "H"],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, "H"],
        ],
      };

    default: {
    }
  }
}
