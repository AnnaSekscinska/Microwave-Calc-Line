import { sqrt } from "mathjs";

export function impedanceMatchingLSN() {
    return { hash: "#lsn_matching", content: impedanceMatchingLSN_html };
}

function formatUnits(val, unit) {
    if (val < 1e-9) return (val * 1e12).toFixed(2) + " p" + unit;
    if (val < 1e-6) return (val * 1e9).toFixed(2) + " n" + unit;
    if (val < 1e-3) return (val * 1e6).toFixed(2) + " u" + unit;
    return val.toFixed(5) + " " + unit;
}

function CalculateLSN() {
    let Z0 = parseFloat(document.getElementById("Z0parameter").value);
    let RL = parseFloat(document.getElementById("RLparameter").value);
    let XL = parseFloat(document.getElementById("XLparameter").value);
    let fMHz = parseFloat(document.getElementById("fparameter").value);

    if (isNaN(Z0) || isNaN(RL) || isNaN(XL) || isNaN(fMHz)) {
        alert("Wprowadź wszystkie wartości!");
        return;
    }

    const f = fMHz * 1e6;
    const omega = 2 * Math.PI * f;

    const rL = RL / Z0;
    const xL = XL / Z0;

    let resultHTML = "";

    function pokazWynik(b, x, nr) {
        let B = b / Z0;
        let X = x * Z0;

        let szeregowyTyp, szeregowyVal;
        let rownoleglyTyp, rownoleglyVal;

        if (X > 0) {
            szeregowyTyp = "Cewka";
            szeregowyVal = X / omega;
        } else {
            szeregowyTyp = "Kondensator";
            szeregowyVal = -1 / (X * omega);
        }

        if (B > 0) {
            rownoleglyTyp = "Kondensator";
            rownoleglyVal = B / omega;
        } else {
            rownoleglyTyp = "Cewka";
            rownoleglyVal = -1 / (B * omega);
        }

        resultHTML += `
            <strong>#${nr}</strong><br>
            b=${b.toFixed(3)}, x=${x.toFixed(3)}<br>
            ${szeregowyTyp}: ${formatUnits(szeregowyVal, szeregowyTyp === "Cewka" ? "H" : "F")} |
            ${rownoleglyTyp}: ${formatUnits(rownoleglyVal, rownoleglyTyp === "Cewka" ? "H" : "F")}<br><br>
`;
    }

    if (RL < Z0) {
        const b = sqrt((1 - rL) / rL);
        const x = sqrt(rL * (1 - rL));

        pokazWynik(b, x - xL, 1);
        pokazWynik(-b, -x - xL, 2);

    } else {
        const mianownik = rL * rL + xL * xL;
        const pierwiastek = sqrt(rL * (rL * rL + xL * xL - rL));

        const b1 = (xL + pierwiastek) / mianownik;
        const b2 = (xL - pierwiastek) / mianownik;

        const x1 = (b1 * xL + rL - 1) / (b1 * rL);
        const x2 = (b2 * xL + rL - 1) / (b2 * rL);

        pokazWynik(b1, x1, 1);
        pokazWynik(b2, x2, 2);
    }

    document.getElementById("lsnOutput").innerHTML = resultHTML;
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "calculateButton_lsn") {
        CalculateLSN();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const calcBtn = document.getElementById("calculateButton_lsn");
        if (calcBtn) {
            CalculateLSN();
        }
    }
});

export let impedanceMatchingLSN_html =
    "<div class='container'>" +
    "<img class='img_Calculator' src='img/imgLMSN.png'/>" +

    "<div class='content'>" +
    "<h2>L-section Matching Network</h2>" +

    "<div class='parameters'>" +
    "<label><span>R<sub>L</sub> = </span><input type='number' id='RLparameter'> Ω</label>" +
    "<label><span>X<sub>L</sub> = </span><input type='number' id='XLparameter'> Ω</label>" +
    "<label><span>Z<sub>0</sub> = </span> <input type='number' id='Z0parameter'> Ω</label>" +
    "<label><span>f = </span> <input type='number' id='fparameter'> MHz</label>" +
    "</div>" +

    "<div class='container-button'>" +
    "<button id='calculateButton_lsn'>Calculate</button>" +
    "</div>" +

    "<div class='fcmn_results'>" +
    "<span id='lsnOutput'></span>" +
    "</div>" +

    "<button id='returnButton' class='return'>Return to Main Menu</button>" +
    "</div>" +
    "</div>";