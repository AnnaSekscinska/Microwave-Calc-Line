export function impedanceMatchingSS() {
    return{hash: "#rect_wave", content: impedanceMatchingSS_html}
}



function impedanceMatchingSSCalculator(RL, XL, Z0){

    RL = document.getElementById("RL_element").value;
    XL = document.getElementById("XL_element").value;
    Z0 = document.getElementById("Z0_element").value;

    if (isNaN(RL) || isNaN(XL) || isNaN(Z0) ) {
        alert("Wprowadź wszystkie wartości!");
    }

    const isSeries = document.getElementById("szer_rozw").checked || document.getElementById("szer_zw").checked;
    const isOpen = document.getElementById("szer_rozw").checked || document.getElementById("row_rozw").checked;

    let r_part, x_part;


    if (isSeries) {
        r_part = RL / Z0;
        x_part = XL / Z0;
    } else {
        const denom = Math.pow(RL, 2) + Math.pow(XL, 2);
        if (denom === 0) {
            alert("Wprowadź poprawne wartości!");
            return;
        }
        r_part = (RL / denom) * Z0;
        x_part = (-XL / denom) * Z0;
    }

    const A = Math.pow(r_part, 2) + Math.pow(x_part, 2) - r_part;
    const B = -2 * x_part;
    const C = 1 - r_part;

    let t_values = [];


    if (Math.abs(A) < 1e-9) {
        if (Math.abs(B) < 1e-9) {
            t_values = [0, 0];
        } else {
            t_values = [Infinity, -C / B];
        }
    } else {
        const discriminant = r_part * (Math.pow(1 - r_part, 2) + Math.pow(x_part, 2));
        if (discriminant < 0) {
            document.getElementById("Solution1_result").innerHTML = "<b>Brak rozwiązania:</b> dopasowanie niemożliwe.";
            document.getElementById("Solution2_result").innerHTML = "";
            return;
        }
        t_values = [
            (x_part + Math.sqrt(discriminant)) / A,
            (x_part - Math.sqrt(discriminant)) / A
        ];
    }


    const solutions = t_values.map(t => {

        let d_lam;
        if (!isFinite(t)) {
            d_lam = 0.25;
        } else {
            d_lam = Math.atan(t) / (2 * Math.PI);


            if (d_lam <= 0) d_lam += 0.5;
        }

        let stub_val;
        if (!isFinite(t)) {
            stub_val = x_part / r_part;
        } else {
            stub_val = (x_part * t * t + (Math.pow(r_part, 2) + Math.pow(x_part, 2) - 1) * t - x_part) / (r_part * (t * t + 1));
        }

        let l_lam;
        if (isSeries) {
            l_lam = isOpen ?
                Math.atan(-1 / stub_val) / (2 * Math.PI) :
                Math.atan(stub_val) / (2 * Math.PI);
        } else {
            l_lam = isOpen ?
                Math.atan(stub_val) / (2 * Math.PI) :
                Math.atan(-1 / stub_val) / (2 * Math.PI);
        }


        if (l_lam <= 0) l_lam += 0.5;

        return { d: d_lam, l: l_lam };
    });

    document.getElementById("Solution1_result").innerHTML =
        `<b>#1:</b> d1/λ = ${solutions[0].d.toFixed(5)}, l1/λ = ${solutions[0].l.toFixed(5)}`;
    document.getElementById("Solution2_result").innerHTML =
        `<b>#2:</b> d2/λ = ${solutions[1].d.toFixed(5)}, l2/λ = ${solutions[1].l.toFixed(5)}`;
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "Calculatebutton_IMSS") {
        impedanceMatchingSSCalculator();
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
        const calcBtn = document.getElementById("Calculatebutton_IMSS");
        if (calcBtn) {
            impedanceMatchingSSCalculator();
        }
    }
});



export let impedanceMatchingSS_html = "<div class=\"container\">\n" +
    "<img class='img_Calculator' src='img/SS.png'/>\n" +
    "<div class=\"content\">\n" +
    "  <h2 data-key='titleSS'>Single Stub Matching Circuit</h2>\n" +
    "\n" +
    "  <div class=\"parameters\">\n" +
    "    <label><span>R<sub>L</sub> = </span><input type=\"number\" id='RL_element' >Ω</label>\n" +
    "    <label><span>X<sub>L</sub> = </span> <input type=\"number\" id='XL_element'>Ω</label>\n" +
    "    <label><span>Z<sub>0</sub> = </span><input type=\"number\" id='Z0_element'>Ω</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"direction\">\n" +
    "<label data-key='paragraphSS'>Pick the configuration</label>\n" +
    " <div class='container-checkbox'> " +
    "    <label><input type='checkbox' id='szer_rozw'> <span data-key='checkboxSS1'>Single open-circuited stub</span></label>\n" +
    "    <label><input type='checkbox' id='szer_zw'> <span data-key='checkboxSS2'>Single short-circuited stub</span></label>\n" +
    "</div>" +
    " <div class='container-checkbox'> " +
    "    <label><input type='checkbox' id='row_rozw'> <span data-key='checkboxSS3'>Single open-circuited shunt stub</span></label>\n" +
    "    <label><input type='checkbox' id='row_zw'> <span data-key='checkboxSS4'>Single short-circuited shunt stub</span></label>\n" +
    "  </div>\n" +
    "  </div>\n" +
    "\n" +
    " <div class='container-button'> " +
    "  <button id='Calculatebutton_IMSS' data-key='buttonClc'>Calculate</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"Solution1\" id='Solution1' >\n" +
    "   <span id='Solution1_result'>" +
    "</span>" +
    "  </div>\n" +
    "  <div class=\"Solution2\" id='Solution2' >\n" +
    "   <span id='Solution2_result'>" +
    "</span>" +
    "  </div>\n" +
    "\n" +
    "  <button id=\"returnButton\" class=\"return\" data-key='buttonRtn'>Return to Main Menu</button>\n" +
    "</div>\n"

