export function impedanceMatchingLSN() {
    return{hash: "#rect_wave", content: impedanceMatchingLSN_html}
}



  function CalculateLSN (Z0, ZL, XL, RL, f) {

    Z0 = document.getElementById("Z0parameter").value;
    ZL = document.getElementById("ZLresult").textContent;
    XL = document.getElementById("XLparameter").value;
    RL = document.getElementById("RLparameter").value;
    f = document.getElementById("fparameter").value;

    RL = parseFloat(RL);
    XL = parseFloat(XL);

    if (Z0 === "" || XL === "" || RL === "" || f === "" ) {
        alert("Wprowadź wszystkie parametry!");
    } else {
        ZL = `${RL} + j${XL}`;
        document.getElementById("ZLresult").innerHTML = "Z<sub>L</sub> = " + ZL;
        console.log(ZL);
    }


}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "calculateButton") {
        CalculateLSN();
    }
});



export let impedanceMatchingLSN_html =
    "<div class='container'>" +

    "  <img class='img_Calculator' src='img/MatchingNetwork.png' alt='Matching network'>" +

    "  <div class='content'>" +

    "    <h2>L-section Matching Network</h2>" +
    "    <p>Load impedance Z<sub>L</sub> = R<sub>L</sub> + jX<sub>L</sub></p>" +

    "    <div class='parameters'>" +

    "      <label>" +
    "        <span>R<sub>L</sub></span>" +
    "        <input type='number' id='RLparameter'>" +
    "        <span>Ω</span>" +
    "      </label>" +

    "      <label>" +
    "        <span>X<sub>L</sub></span>" +
    "        <input type='number' id='XLparameter'>" +
    "        <span>Ω</span>" +
    "      </label>" +

    "      <label>" +
    "        <span>Z<sub>0</sub></span>" +
    "        <input type='number' id='Z0parameter'>" +
    "        <span>Ω</span>" +
    "      </label>" +

    "      <label>" +
    "        <span>f</span>" +
    "        <input type='number' id='fparameter'>" +
    "        <span>MHz</span>" +
    "      </label>" +

    "    </div>" +

    "<div class='result'> " +
    " <label>" +
    "<span id='ZLresult'>Z<sub>L</sub>=</span>" +
    "</label>" +
    "</div>" +
    "    <button id='calculateButton' class='calculate'>Calculate</button>" +

    "    <button id='returnButton' class='return'>Return to Main Menu</button>" +

    "  </div>" +

    "</div>";


