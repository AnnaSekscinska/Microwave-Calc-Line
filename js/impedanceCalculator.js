export function impedance_calculator() {
    return{hash: "#rect_wave", content: impedanceCalculator_html}
}

function add(a, b) {
    return { re: a.re + b.re, im: a.im + b.im };
}

function sub(a, b) {
    return { re: a.re - b.re, im: a.im - b.im };
}

function div(a, b) {
    const denom = b.re * b.re + b.im * b.im;

    return {
        re: (a.re * b.re + a.im * b.im) / denom,
        im: (a.im * b.re - a.re * b.im) / denom
    };
}

function loadImpedanceCalculator() {

    const lambda = parseFloat(document.getElementById("lambda_parameter").value);
    const swr = parseFloat(document.getElementById("swr_parameter").value);
    const d = parseFloat(document.getElementById("d_parameter").value);


    if (isNaN(lambda) || isNaN(swr) || isNaN(d)) {
        alert("Wprowadź wszystkie wartości!");
        return;
    }

    if (swr < 1) {
        alert("SWR musi być ≥ 1");
        return;
    }

    const wsp_odbicia = (swr - 1) / (swr + 1);
    const beta = (2 * Math.PI) / lambda;

    let faza_wsp_odb;

    if (document.getElementById("current_wave").checked) {

        faza_wsp_odb = 2 * beta * d;
    }
    else if (document.getElementById("voltage_wave").checked) {

        faza_wsp_odb = 2 * beta * d - Math.PI;
    }
    else {
        alert("Wybierz typ fali!");
        return;
    }

    const gamma = {
        re: wsp_odbicia * Math.cos(faza_wsp_odb),
        im: wsp_odbicia * Math.sin(faza_wsp_odb)
    };

    const one = { re: 1, im: 0 };

    const zl = div(
        add(one, gamma),
        sub(one, gamma)
    );

    const sign = zl.im >= 0 ? "+" : "-";

    document.getElementById("zl_result").innerHTML =
        `z<sub>L</sub> = ${zl.re.toFixed(4)} ${sign} ${Math.abs(zl.im).toFixed(4)}j`;
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "loadImpedance_calculate") {
        loadImpedanceCalculator();
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



export let impedanceCalculator_html =
    "<div class='container'>" +

    "  <img class='img_Calculator' src='img/LoadImpedance.png' alt='Impedance diagram'>" +

    "  <div class='content'>" +

    "    <h2>Impedance Calculator</h2>" +
    "    <p>Generator — Load</p>" +

    "    <div class='parameters'>" +

    "      <label>" +
    "        <span>λ (lambda)</span>" +
    "        <input type='number' id='lambda_parameter'>" +
    "        <span>mm</span>" +
    "      </label>" +

    "      <label>" +
    "        <span>SWR</span>" +
    "        <input type='number' id='swr_parameter'>" +
    "      </label>" +

    "      <label>" +
    "        <span>d</span>" +
    "        <input type='number' id='d_parameter'>" +
    "        <span>mm</span>" +
    "      </label>" +

    "    </div>" +

    "    <p>Distance between Load and minimum of wave distribution</p>" +

    "    <div class='direction'>" +
    "      <label><input type='checkbox' id='current_wave'> Current wave</label>" +
    "      <label><input type='checkbox' id='voltage_wave'> Voltage wave</label>" +
    "    </div>" +

    "    <button id='loadImpedance_calculate'>Calculate</button>" +

    "    <div class='result'>" +
    "       <span id='zl_result'>" +
    "       </span>" +
    "    </div>" +

    "    <button id='returnButton' class='return'>Return to Main Menu</button>" +

    "  </div>" +

    "</div>";