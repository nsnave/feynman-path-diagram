/**
 * Processes data returned from a GET request to the server.
 */

async function makeRequest(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function handleNodes(amplitudes, states_per_layer, nodePosition) {
  // Creates a list of coordinates where each node should go
  let layers = amplitudes.length;
  let nodes = [];
  for (let i = 0; i < layers; i++) {
    let amps = amplitudes[i];
    states_per_layer[i].forEach((state) => {
      nodes.push(newNode(nodePosition(i, state), amps[state]));
    });
  }

  // Adds nodes to canvas
  addElements(nodes);
}

function handleLines(circuit, data, states_per_layer, nodePosition) {
  let qubits = data.qubits;
  let layers = data.amplitudes.length;

  let getBit = (x, qubit) => ((x & (1 << (qubits - qubit - 1))) > 0 ? 1 : 0);
  let flipBit = (x, qubit) => x ^ (1 << (qubits - qubit - 1));

  let scalMulComplex = (a, [x, y]) => [a * x, a * y];
  let sqrComplex = ([x, y]) => [x * x - y * y, 2 * x * y];

  let isZero = (entry) => entry[0] == 0 && entry[1] == 0;
  let isOne = (entry) => entry[0] == 1 && entry[1] == 0;
  let isIden = (gate) => {
    return (
      isOne(gate[0][0]) &&
      isZero(gate[0][1]) &&
      isZero(gate[1][0]) &&
      isOne(gate[1][1])
    );
  };

  let lines = [];
  // For each layer...
  for (let i = 0; i < layers - 1; i++) {
    console.log("Layer: " + i);
    let states = states_per_layer[i];
    let gates = circuit[i];
    let amps = data.amplitudes[i];

    // Checks if this layer is controlled and if so, by which qubits
    let controlled = 0;
    let anticontrolled = 0;
    gates.forEach((gate_str) => {
      controlled <<= 1;
      anticontrolled <<= 1;

      if (gate_str === "•") {
        controlled |= 1;
      } else if (gate_str === "◦") {
        controlled |= 1;
      }
    });

    let padding = qubits - gates.length;
    controlled <<= padding;
    anticontrolled <<= padding;
    console.log("Controlled: " + controlled);

    // For each gate in the layer...
    gates.forEach((gate_str, index) => {
      console.log("Gate: " + gate_str + "  " + index);
      let gate = getGate(gate_str);
      if (isIden(gate)) return;

      // Calculate the effect of the gate on each state
      states.forEach((state) => {
        // The current state of the individual qubit being acted on
        let input = getBit(state, index);

        console.log(state + "  " + input);

        // Handles creating the line between input and output
        let handleOutput = (output) => {
          let weight = gate[output][input];
          if (!isZero(weight)) {
            let next = output == input ? state : flipBit(state, index);
            console.log(next);
            lines.push(
              newLine(
                nodePosition(i, state),
                nodePosition(i + 1, next),
                scalMulComplex(
                  (weight[0] < 0 ? -1 : 1) * (weight[0] * weight[0]),
                  sqrComplex(amps[state])
                )
              )
            );
          }
        };

        // If there's a control but not all controls are active, don't change state
        if (
          (controlled && (controlled & state) != controlled) ||
          (anticontrolled && (anticontrolled & ~state) != anticontrolled)
        ) {
          console.log("here");
          lines.push(
            newLine(
              nodePosition(i, state),
              nodePosition(i + 1, state),
              sqrComplex(amps[state])
            )
          );
        } else {
          // Handles each possible output case
          handleOutput(0);
          handleOutput(1);
        }
      });
    });
  }

  addElements(lines);
}

async function processData() {
  const test = 4;
  const circuit = getCircuit(test);
  const data = await makeRequest(
    "http://localhost:8000/t" + test + "_diagram.json"
  );

  let qubits = data.qubits;
  let layers = data.amplitudes.length;

  // Calculates which states are present in each layer
  // Also changes the keys in data.amplitudes from strings to ints
  let states_per_layer = [];
  let amplitudes = [];
  data.amplitudes.forEach((layer) => {
    let states = [];
    let amps = {};
    Object.keys(layer).forEach((key) => {
      let int_key = parseInt(key, 2);
      states.push(int_key);
      amps[int_key] = layer[key];
    });
    states_per_layer.push(states);
    amplitudes.push(amps);
  });
  data.amplitudes = amplitudes;

  // Creates a function to calculate where nodes should go on the canvas
  let layer_spacing = window.innerWidth / (layers + 1);
  let qubit_spacing = window.innerHeight / ((1 << qubits) + 1);

  let nodePosition = (layer, qubit) => {
    let x = layer_spacing * (layer + 1);
    let y = qubit_spacing * (qubit + 1);
    return { x: x, y: y };
  };

  handleLines(circuit.cols, data, states_per_layer, nodePosition);
  handleNodes(data.amplitudes, states_per_layer, nodePosition);
}

processData();
