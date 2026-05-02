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


function VSWRCalculation_calculator() {
    const Z0 = parseFloat(document.getElementById('Z0_element').value) ;
    const selected = document.querySelector('input[name="paramType"]:checked');
    if (!selected) return;

    const val1 = parseFloat(document.getElementById('v1').value) ;
    const val2 = parseFloat(document.getElementById('v2').value) ;
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
            ReG = (Math.pow(val1, 2) - 1 + Math.pow(val2, 2)) / Mz;
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
            ReG = (Math.pow(r_n, 2) - 1 + Math.pow(x_n, 2)) / Mz_r;
            ImG = (2 * x_n) / Mz_r;
            break;
        case 'GBReal':
            let g_n = val1 * Z0, b_n = val2 * Z0;
            let My_g = Math.pow(g_n + 1, 2) + Math.pow(b_n, 2);
            ReG = (1 - Math.pow(g_n, 2) - Math.pow(b_n, 2)) / My_g;
            ImG = (-2 * b_n) / My_g;
            break;
    }


    const absG = Math.sqrt(ReG**2 + ImG**2);
    const vswr = (1 + absG) / (1 - absG);
    const argG = Math.atan2(ImG, ReG) / toRad;

    const Dz = Math.pow(1 - ReG, 2) + ImG**2;
    const r = (1 - ReG**2 - ImG**2) / Dz;
    const x = (2 * ImG) / Dz;

    const Dy = Math.pow(1 + ReG, 2) + ImG**2;
    const g = (1 - ReG**2 - ImG**2) / Dy;
    const b = (-2 * ImG) / Dy;


    document.getElementById('results').innerHTML = `
        <pre>
        VSWR: ${vswr.toFixed(3)}
        |G|: ${absG.toFixed(4)}, arg(G): ${argG.toFixed(2)}°
        Re(G): ${ReG.toFixed(4)}, Im(G): ${ImG.toFixed(4)}
        r: ${r.toFixed(4)}, x: ${x.toFixed(4)}
        g: ${g.toFixed(4)}, b: ${b.toFixed(4)}
        R: ${(r * Z0).toFixed(2)} Ω, X: ${(x * Z0).toFixed(2)} Ω
        G: ${(g / Z0).toExponential(3)} S, B: ${(b / Z0).toExponential(3)} S
        </pre>
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



export let VSWRCalculation_html = `
<div class="container">
    <img class='img_Calculator' src='img/VSWR.png'/>
    <div class="content">
        <h2>VSWR calculation</h2>
        
        <div class="parameters">
            <label>Z0 = <input type="number" id="Z0_element" > <span>Ω</span></label>
        </div>

        <div class="direction">
            <p>Pick the parameter to enter:</p>
            <label><input type="checkbox" name="paramType" value="vswr"> VSWR & arg(G)</label>
            <label><input type="checkbox" name="paramType" value="absG"> |G| & arg(G)</label>
            <label><input type="checkbox" name="paramType" value="reImG"> Re(G) & Im(G)</label>
            <label><input type="checkbox" name="paramType" value="rxNorm"> r + jx (Normalized)</label>
            <label><input type="checkbox" name="paramType" value="gbNorm"> g + jb (Normalized)</label>
            <label><input type="checkbox" name="paramType" value="RXReal"> R + jX (Ω)</label>
            <label><input type="checkbox" name="paramType" value="GBReal"> G + jB (S)</label>
        </div>

        <div id="dynamicInputs" class="parameters">
             
        </div>

        <button id="VSWRBtn">Calculate</button>

        <div id="results"></div>

        <button id="returnButton" class="return">Return to Main Menu</button>
    </div>
</div>
`;