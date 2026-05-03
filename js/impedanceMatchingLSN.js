import { sqrt } from "mathjs";

export function impedanceMatchingLSN() {
    return { hash: "#rect_wave", content: impedanceMatchingLSN_html }
}

function formatUnits(val, unit) {
    if (val < 1e-9) return (val * 1e12).toFixed(2) + " p" + unit;
    if (val < 1e-6) return (val * 1e9).toFixed(2) + " n" + unit;
    if (val < 1e-3) return (val * 1e6).toFixed(2) + " u" + unit;
    return val.toFixed(2) + " " + unit;
}

function CalculateLSN() {
    const Z0 = parseFloat(document.getElementById("Z0parameter").value);
    const RL = parseFloat(document.getElementById("RLparameter").value);
    const XL = parseFloat(document.getElementById("XLparameter").value);
    const fMHz = parseFloat(document.getElementById("fparameter").value);

    if (isNaN(Z0) || isNaN(RL) || isNaN(XL) || isNaN(fMHz)) {
        alert("Wprowadź wszystkie parametry!");
        return;
    }

    document.getElementById("ZLresult").innerHTML = `Z<sub>L</sub> = ${RL} + j${XL} Ω`;

    const f = fMHz * 1e6;
    const omega = 2 * Math.PI * f;
    const rL = RL / Z0;
    const xL = XL / Z0;

    let wyniki = [];

    if (RL < Z0) {

        const b_val = Math.sqrt((1 - rL) / rL);
        const x_val = Math.sqrt(rL * (1 - rL));

        const pary = [
            { b: b_val, x: x_val - xL },
            { b: -b_val, x: -x_val - xL }
        ];

        pary.forEach((p, i) => {
            let B = p.b / Z0;
            let X = p.x * Z0;
            wyniki.push(interpretujElementy(p.b, p.x, B, X, omega, `Opcja ${i+1} (RL < Z0)`));
        });
    } else {

        const mianownik = Math.pow(rL, 2) + Math.pow(xL, 2);
        const pierwiastek = Math.sqrt(rL * (Math.pow(rL, 2) + Math.pow(xL, 2) - rL));

        const b1 = (xL + pierwiastek) / mianownik;
        const b2 = (xL - pierwiastek) / mianownik;

        const pary = [
            { b: b1, x: (b1 * xL + rL - 1) / (b1 * rL) },
            { b: b2, x: (b2 * xL + rL - 1) / (b2 * rL) }
        ];

        pary.forEach((p, i) => {
            let B = p.b / Z0;
            let X = p.x * Z0;
            wyniki.push(interpretujElementy(p.b, p.x, B, X, omega, `Opcja ${i+1} (RL > Z0)`));
        });
    }

    wyswietlWyniki(wyniki);
}

function interpretujElementy(b_norm, x_norm, B, X, omega, opis) {
    let el = {
        opis: opis,
        b_norm: b_norm,
        x_norm: x_norm,
        B_real: B,
        X_real: X,
        szeregowy: {},
        rownolegly: {}
    };

    if (X > 0) {
        el.szeregowy = { typ: "Cewka (L)", wartosc: X / omega };
    } else {
        el.szeregowy = { typ: "Kondensator (C)", wartosc: -1 / (X * omega) };
    }

    if (B > 0) {
        el.rownolegly = { typ: "Kondensator (C)", wartosc: B / omega };
    } else {
        el.rownolegly = { typ: "Cewka (L)", wartosc: -1 / (B * omega) };
    }
    return el;
}

function wyswietlWyniki(wyniki) {
    const resDiv = document.getElementById("finalResults");
    resDiv.innerHTML = "";

    wyniki.forEach((w) => {
        resDiv.innerHTML += `
            <div>
                <strong style>${w.opis}</strong><br>
                <div style=>
                    <code>b = ${w.b_norm.toFixed(4)} | x = ${w.x_norm.toFixed(4)}</code><br>
                    <code>B = ${w.B_real.toFixed(6)} S | X = ${w.X_real.toFixed(2)} Ω</code>
                </div>
                ${w.szeregowy.typ} = <strong>${formatUnits(w.szeregowy.wartosc, w.szeregowy.typ.includes("L") ? "H" : "F")}</strong><br>
                ${w.rownolegly.typ} = <strong>${formatUnits(w.rownolegly.wartosc, w.rownolegly.typ.includes("L") ? "H" : "F")}</strong>
            </div>`;
    });
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "calculateButton") {
        CalculateLSN();
    }
});

export let impedanceMatchingLSN_html =
    "<div class='container'>" +
    "  <div class='content'>" +
    "    <h2 data-key='titleLSN'>L-section Matching Network</h2>" +
    "    <div class='parameters'>" +
    "      <label><span>R<sub>L</sub> [Ω]</span><input type='number' id='RLparameter'></label>" +
    "      <label><span>X<sub>L</sub> [Ω]</span><input type='number' id='XLparameter'></label>" +
    "      <label><span>Z<sub>0</sub> [Ω]</span><input type='number' id='Z0parameter'></label>" +
    "      <label><span>f [MHz]</span><input type='number' id='fparameter'></label>" +
    "    </div>" +
    "    <div class='result'></div>" +
    "    <button id='calculateButton' class='calculate' data-key='buttonClc'>Calculate</button>" +
    "    <div id='finalResults'></div>" +
    "    <button id='returnButton' class='return' data-key='buttonRtn'>Return to Main Menu</button>" +
    "  </div>" +
    "</div>";