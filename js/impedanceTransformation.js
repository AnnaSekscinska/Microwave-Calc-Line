export function impedance_transformation() {
    return{hash: "#rect_wave", content: impedanceTransformation_html}
}

function impedanceTransformationCalculator(lam, RLZ, XLZ, distance){

    lam = parseFloat(document.getElementById("lam_parameter").value);
    RLZ = parseFloat(document.getElementById("RLZ0_parameter").value);
    XLZ = parseFloat(document.getElementById("XLZ0_parameter").value);
    distance = parseFloat(document.getElementById("distance_parameter").value);


    const towardsGenerator = document.getElementById("TowardsGenerator_check").checked;

    if (isNaN(lam) || isNaN(RLZ) || isNaN(XLZ) || isNaN(distance)) {
        alert("Wprowadź wszystkie wartości!");
    }

    const betaD = (2 * Math.PI * distance) / lam;
    let t = Math.tan(betaD);

    if (!towardsGenerator) {
        t = -t;
    }

    const numReal = RLZ;
    const numImag = XLZ + t;

    const denReal = 1 - (XLZ * t);
    const denImag = RLZ * t;

    const denMagSq = Math.pow(denReal, 2) + Math.pow(denImag, 2);

    const rL_prime = (numReal * denReal + numImag * denImag) / denMagSq;
    const xL_prime = (numImag * denReal - numReal * denImag) / denMagSq;

    const sign = xL_prime >= 0 ? "+" : "";
    document.getElementById("results").innerHTML =
        `normalized Z_L' = R_L' + jX_L' = <br><b>${rL_prime.toFixed(15)}${sign}${xL_prime.toFixed(15)}i</b>`;

}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "impedanceTransformation_calcBtn") {
        impedanceTransformationCalculator();
    }
});

document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && (e.target.closest('.direction') || e.target.closest('.parameters'))) {
        const parent = e.target.closest('.direction') || e.target.closest('.parameters');
        const checkboxes = parent.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(cb => {
            if (cb !== e.target) cb.checked = false;
        });
    }
});

    export let impedanceTransformation_html = "<div class=\"container\">\n" +
        "<img class='img_Calculator' src='img/ImpedanceTransformation .png'/>\n" +
        "<div class=\"content\">\n" +
        "  <h2 data-key='titleImpTrans'>Impedance transformation</h2><br>" +
        "  <p data-key='paragraphImpTrans'>Generator — Load</p><br>" +
        "<br>" +
        "  <div class=\"parameters\"><br>" +
        "    <label>λ = <input type=\"number\" id='lam_parameter'> mm</label><br>" +
        "    <label>R_L/Z  = <input type=\"number\" id='RLZ0_parameter'></label><br>" +
        "    <label>X_L/Z = <input type=\"number\" id='XLZ0_parameter'></label><br>" +
        "    <label>" +
        "        <span data-key='parameterImpTrans'>Distance of transformation =</span>" +
        "        <input type='number' id='distance_parameter'>" +
        "        <span data-key='unit_mm'>mm</span>" +
        "    </label><br>" +
        "  </div>\n" +
        "\n" +
        "  <div class=\"direction\">\n" +
        "    <label><input type='checkbox' id='TowardsGenerator_check'> <span data-key='checkboxImpTrans1'>Towards generator</span></label><br>" +
        "    <label><input type='checkbox' id='TowardsLoad_check'> <span data-key='checkboxImpTrans2'>Towards load</span></label><br>" +
        "  </div>\n" +
        "\n" +
        "  <button id='impedanceTransformation_calcBtn' data-key='buttonClc'>Calculate</button>\n" +
        "\n" +
        "  <div class=\"result\" id='results'>\n" +
        " <span id='TG_result'> " +
        " </span>" +
        " <span id='TL_result'> " +
        " </span>" +
        "  </div>\n" +
        "\n" +
        "  <button id=\"returnButton\" class=\"return\" data-key='buttonRtn'>Return to Main Menu</button>\n" +
        "</div>\n" +
        "</div>\n"

