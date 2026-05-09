import {sqrt} from "mathjs";

export function microstripLine() {
    return {hash: "#microstrip_line", content: microstripLine_html}
}

function analysis_microstripLineCalculator(h, eps_r, f, eps_eff, w, lambda, z0) {

    h = parseFloat(document.getElementById("h_parameter").value);
    eps_r = parseFloat(document.getElementById("eps_r_parameter").value);
    f = parseFloat(document.getElementById("f_parameter").value);
    eps_eff = parseFloat(document.getElementById("eps_eff_result").value);
    w = parseFloat(document.getElementById("w_parameter").value);
    const c = 300000000;

    z0 = parseFloat(z0);

    if (isNaN(h) || isNaN(eps_r) || isNaN(f) || isNaN(w)) {
        alert("Wprowadź wszystkie wartości!");
    } else if (h >= w) {
        eps_eff = (((eps_r+1)/2)+((eps_r-1)/2)*(1/(sqrt(1+12*h/w))+0.04*(1-w/h)*(1-w/h)))

        document.getElementById("eps_eff_result").innerHTML = "<span>ε<sub>r</sub> = </span>" + eps_eff;
        z0 = (60/sqrt(eps_eff))*Math.log((8*h/w)+(w/(4*h)))

        document.getElementById("z0_result").innerHTML = "Z<sub>0</sub> = " + z0;
    } else if (h < w) {
        eps_eff = (((eps_r+1)/2)+((eps_r-1)/(2*sqrt(1+12*h/w))))

        document.getElementById("eps_eff_result").innerHTML = "<span>ε<sub>r</sub> = </span>" + eps_eff;
        z0 = 120*Math.PI/(sqrt(eps_eff)*((w/h)+1.393+0.667*Math.log(w/h+1.444)))

        document.getElementById("z0_result").innerHTML = "Z<sub>0</sub> = " + z0;
    }

    lambda = c/(f*sqrt(eps_eff))

    document.getElementById("lambda_result").innerHTML = "λ = " + lambda;
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "analysisButton_microstripLine") {
        analysis_microstripLineCalculator();
    }
});

function synthesis_microstripLineCalculator(h, eps_r, f, eps_eff, w, c, lambda, z0) {

    h = document.getElementById("h_parameter").value;
    eps_r = document.getElementById("eps_r_parameter").value;
    f = document.getElementById("f_parameter").value;
    z0 = document.getElementById("z0_parameter").value;
    eps_eff = document.getElementById("eps_eff_result").value;
    c = 300000000;


    h = parseFloat(h);
    eps_r = parseFloat(eps_r);
    f = parseFloat(f);
    z0 = parseFloat(z0);
    eps_eff = parseFloat(eps_eff);
    //w = parseFloat(w);

    let C = ((377*Math.PI)/(2*z0*sqrt(eps_r)));
    let D = (z0/60)*(sqrt((eps_r+1)/2))+((eps_r-1)/(eps_r+1))*(0.23+0.11/eps_r)
    let stosunek_wh;
    if (isNaN(h) || isNaN(eps_r) || isNaN(f) || isNaN(z0)) {
        alert("Wprowadź wszystkie wartości!");
    } else if (document.getElementById("szeroka_linia").checked) {
        stosunek_wh = (2/Math.PI)*(C-1-Math.log(2*C-1)+((eps_r-1)/(2*eps_r))*(Math.log(C-1)+0.39-(0.61/eps_r)))
        w = stosunek_wh*h ;

        document.getElementById("z0_result").innerHTML = "w = " + w;
        eps_eff = (((eps_r+1)/2)+((eps_r-1)/2)*(1/(sqrt(1+12*h/w))))

        document.getElementById("eps_eff_result").innerHTML = "<span>ε<sub>r</sub> = </span>" + eps_eff;
    } else if (document.getElementById("waska_linia").checked) {
        stosunek_wh = (8 * Math.pow(Math.E, D)) / (Math.pow(Math.E, 2 * D) - 2)
        w = stosunek_wh * h;

        document.getElementById("z0_result").innerHTML = "w = " + w;
        eps_eff = (((eps_r + 1) / 2) + ((eps_r - 1) / 2) * (1 / (sqrt(1 + 12 * h / w))))

        document.getElementById("eps_eff_result").innerHTML = "<span>ε<sub>r</sub> = </span>" + eps_eff;
    }


        lambda = c/(f*sqrt(eps_eff))

    document.getElementById("lambda_result").innerHTML = "λ = " + lambda;
    }


document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "synthesisButton_microstripLine") {
        synthesis_microstripLineCalculator();
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

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const wInput = document.getElementById("w_parameter");
        const z0Input = document.getElementById("z0_parameter");

        if (wInput || z0Input) {
            event.preventDefault();


            const wValue = wInput ? wInput.value : "";
            const z0Value = z0Input ? z0Input.value : "";

            if (wValue !== "") {
                analysis_microstripLineCalculator();
            } else if (z0Value !== "") {
                synthesis_microstripLineCalculator();
            }
        }

    }
});


export let microstripLine_html =
    "<div class=\"container\">\n" +
    " <img class='img_Calculator' src='img/imgMicroStripLine.png'/> " +
    "  <div class=\"content\">\n" +

    "  <h2 data-key='titleMicrostrip'>Microstrip Line</h2>\n" +
    "  <p data-key='paragraphMicrostrip'>Analysis and Synthesis</p>\n" +

    "  <div class=\"parameters\">" +
    "    <label>H = <input type=\"number\" id='h_parameter'> mm</label>" +
    "    <label>w = <input type=\"number\" id='w_parameter'> mm</label>" +
    "    <label><span>ε<sub>r</sub> = </span><input type=\"number\" id='eps_r_parameter'></label>" +
    "    <label><span>Z<sub>0</sub> = </span><input type=\"number\" id='z0_parameter'>Ω</label>" +
    "    <label>f = <input type=\"number\" id='f_parameter'> GHz</label>" +
    " <div class='container-checkbox'> " +
    "<label><input type='checkbox' id='waska_linia'> <span data-key='checkboxLine1'>Narrow Line</span></label>\n" +
    "<label><input type='checkbox' id='szeroka_linia'> <span data-key='checkboxLine2'>Wide Line</span></label>\n" +
    "  </div>" +
    "</div>\n" +

    " <div class='container-button'> " +
    "  <button id='analysisButton_microstripLine' data-key='buttonAnalysis'>Analysis</button>" +
    "  <button id='synthesisButton_microstripLine' data-key='buttonSynthesis'>Synthesis</button>" +
    "</div>\n" +

    "  <div class='microstripLine_result' id='microstripLine_result' >" +
    "<span id='eps_eff_result'>" +
    "</span>" +
    "<span id='z0_result'>" +
    "</span>" +
    "<span id='lambda_result'>" +
    "</span>" +
    "  </div>\n" +

    "  <button id=\"returnButton\" class=\"return\" data-key='buttonRtn'>Return to Main Menu</button>\n" +

    "  </div>\n" +
    "</div>\n";