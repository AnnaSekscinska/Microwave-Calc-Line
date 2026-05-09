export function VSWRCalculation() {
    return {hash: "#VSWRCalculation", content: VSWRCalculation_html}
}


document.addEventListener('change', function(e) {
    if (e.target && e.target.name === 'paramType') {
        const container = document.getElementById('dynamicInputs');
        const selection = e.target.value;
        let inputs = "";

        switch(selection) {
            case 'vswr':   inputs = 'VSWR: <input type="number" id="v1"> arg(G)°: <input type="number" id="v2">'; break;
            case 'absG':   inputs = '|G|: <input type="number" id="v1"> arg(G)°: <input type="number" id="v2">'; break;
            case 'reImG':  inputs = 'Re(G): <input type="number" id="v1"> Im(G): <input type="number" id="v2">'; break;
            case 'rxNorm': inputs = 'r: <input type="number" id="v1"> x: <input type="number" id="v2">'; break;
            case 'gbNorm': inputs = 'g: <input type="number" id="v1"> b: <input type="number" id="v2">'; break;
            case 'RXReal': inputs = 'R [Ω]: <input type="number" id="v1"> X [Ω]: <input type="number" id="v2">'; break;
            case 'GBReal': inputs = 'G [S]: <input type="number" id="v1"> B [S]: <input type="number" id="v2">'; break;
        }
        container.innerHTML = inputs;
    }
});


function fmt(n) {
    if (typeof n !== 'number' || isNaN(n)) return n;
    if (!isFinite(n)) return "+infinity";
    return parseFloat(n.toFixed(5));
}

function VSWRCalculation_calculator() {
    const Z0 = parseFloat(document.getElementById('Z0_element').value);
    const selected = document.querySelector('input[name="paramType"]:checked');
    if (!selected) return;

    const val1 = parseFloat(document.getElementById('v1').value) || 0;
    const val2 = parseFloat(document.getElementById('v2').value) || 0;
    const toRad = Math.PI / 180;

    let ReG, ImG;


    switch(selected.value) {
        case 'vswr':
            let absG_v = (val1 - 1) / (val1 + 1);
            ReG = absG_v * Math.cos(val2 * toRad);
            ImG = absG_v * Math.sin(val2 * toRad);
            break;
        case 'absG':
            ReG = val1 * Math.cos(val2 * toRad);
            ImG = val1 * Math.sin(val2 * toRad);
            break;
        case 'reImG':
            ReG = val1; ImG = val2;
            break;
        case 'rxNorm':
            let Mz = Math.pow(val1 + 1, 2) + Math.pow(val2, 2);
            ReG = (Math.pow(val1, 2) + Math.pow(val2, 2) - 1) / Mz;
            ImG = (2 * val2) / Mz;
            break;
        case 'gbNorm':
            let My = Math.pow(val1 + 1, 2) + Math.pow(val2, 2);
            ReG = (1 - Math.pow(val1, 2) - Math.pow(val2, 2)) / My;
            ImG = (-2 * val2) / My;
            break;
        case 'RXReal':
            let r_n = val1 / Z0, x_n = val2 / Z0;
            let Mz_r = Math.pow(r_n + 1, 2) + Math.pow(x_n, 2);
            ReG = (Math.pow(r_n, 2) + Math.pow(x_n, 2) - 1) / Mz_r;
            ImG = (2 * x_n) / Mz_r;
            break;
        case 'GBReal':
            let gn = val1 * Z0, bn = val2 * Z0;
            let My_g = Math.pow(gn + 1, 2) + Math.pow(bn, 2);
            ReG = (1 - Math.pow(gn, 2) - Math.pow(bn, 2)) / My_g;
            ImG = (-2 * bn) / My_g;
            break;
    }


    let currentAbsG = Math.sqrt(ReG**2 + ImG**2);
    let argG_deg = Math.atan2(ImG, ReG) / toRad;


    const Dz = Math.pow(1 - ReG, 2) + Math.pow(ImG, 2);
    let r_calc = (1 - Math.pow(ReG, 2) - Math.pow(ImG, 2)) / Dz;
    let x_calc = (2 * ImG) / Dz;

    const Dy = Math.pow(1 + ReG, 2) + Math.pow(ImG, 2);
    let g_calc = (1 - Math.pow(ReG, 2) - Math.pow(ImG, 2)) / Dy;
    let b_calc = (-2 * ImG) / Dy;


    let displayAbsG = currentAbsG;
    let displayVSWR = (1 + currentAbsG) / (1 - currentAbsG);
    let displayR = r_calc;
    let displayG = g_calc;

    if (currentAbsG >= 1) {
        displayAbsG = 1;
        displayVSWR = "+infinity";
        displayR = 0;
        displayG = 0;
    }


    document.getElementById('results').innerHTML = `
        <div style="text-align: center; padding: 15px; font-family: monospace; line-height: 2; white-space: pre;">
VSWR: ${displayVSWR === "+infinity" ? displayVSWR : fmt(displayVSWR)}

|G|: ${fmt(displayAbsG)}, arg(G): ${fmt(argG_deg)} deg

Re(G): ${fmt(ReG)}, Im(G): ${fmt(ImG)}

r: ${fmt(displayR)}, +jx: ${fmt(x_calc)}

g: ${fmt(displayG)}, +jb: ${fmt(b_calc)}

R: ${fmt(displayR * Z0)} Ohm, +jX: ${fmt(x_calc * Z0)} Ohm

G: ${fmt(displayG / Z0)} S, +jB: ${fmt(b_calc / Z0)} S
        </div>
    `;
}


document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "VSWRBtn") {
        VSWRCalculation_calculator();
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

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const calcBtn = document.getElementById("VSWRBtn");
        if (calcBtn) {
            VSWRCalculation_calculator();
        }
    }
});


export let VSWRCalculation_html = `
<div class="container">
    <img class='img_Calculator' src='img/VSWR.png'/>
    <div class="content">
        <h2 data-key="titleVSWR">VSWR calculation</h2>
        
        <div class="parameters">
            <label><span>Z<sub>0</sub> = </span><input type="number" id="Z0_element"> <span>Ω</span></label>
        </div>

        <div class="direction">
            <p data-key="paragraphVSWR">Pick the parameter to enter:</p>
            <label><input type="checkbox" name="paramType" value="vswr"> VSWR & arg(G)</label>
            <label><input type="checkbox" name="paramType" value="absG"> |G| & arg(G)</label>
            <label><input type="checkbox" name="paramType" value="reImG"> Re(G) & Im(G)</label>
            <label><input type="checkbox" name="paramType" value="rxNorm"> r + jx (Normalized)</label>
            <label><input type="checkbox" name="paramType" value="gbNorm"> g + jb (Normalized)</label>
            <label><input type="checkbox" name="paramType" value="RXReal"> R + jX (Ω)</label>
            <label><input type="checkbox" name="paramType" value="GBReal"> G + jB (S)</label>
        </div>
        
        <div id="dynamicInputs" class="parameters"></div>

        <div class='container-button'> 
            <button id="VSWRBtn" data-key="buttonClc">Calculate</button>
        </div>

        <div id="results"></div>

        <button id="returnButton" class="return" data-key="buttonRtn">Return to Main Menu</button>
    </div>
</div>
`;