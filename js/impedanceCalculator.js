export function impedance_calculator() {
    return{hash: "#rect_wave", content: impedanceCalculator_html}
}

export let impedanceCalculator_html =
    "<div class='container'>" +

    "  <img class='img_Calculator' src='img/LoadImpedance.png' alt='Impedance diagram'>" +

    "  <div class='content'>" +

    "    <h2>Impedance Calculator</h2>" +
    "    <p>Generator — Load</p>" +

    "    <div class='parameters'>" +

    "      <label>" +
    "        <span>λ (lambda)</span>" +
    "        <input type='number'>" +
    "        <span>mm</span>" +
    "      </label>" +

    "      <label>" +
    "        <span>SWR</span>" +
    "        <input type='number'>" +
    "      </label>" +

    "      <label>" +
    "        <span>d</span>" +
    "        <input type='number'>" +
    "        <span>mm</span>" +
    "      </label>" +

    "    </div>" +

    "    <p>Distance between Load and minimum of wave distribution</p>" +

    "    <div class='direction'>" +
    "      <label><input type='checkbox'> Current wave</label>" +
    "      <label><input type='checkbox'> Voltage wave</label>" +
    "    </div>" +

    "    <button>Calculate</button>" +

    "    <div class='result'>" +
    "      wynik " +
    "    </div>" +

    "    <button id='returnButton' class='return'>Return to Main Menu</button>" +

    "  </div>" +

    "</div>";