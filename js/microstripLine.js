import {sqrt} from "mathjs";

export function microstripLine() {
    return {hash: "#microstrip_line", content: microstripLine_html}
}

function microstripLineCalculator(h, eps_r, f, z0, eps_eff, w, c, lambda) {

    h = document.getElementById("h_parameter").value;
    eps_r = document.getElementById("eps_r_parameter").value;
    f = document.getElementById("f_parameter").value;
    z0 = document.getElementById("z0_parameter").value;
    eps_eff = document.getElementById("eps_eff_result").value;
    w = document.getElementById("w_parameter").value;
    c = 100000000;


    h = parseFloat(h);
    eps_r = parseFloat(eps_r);
    f = parseFloat(f);
    z0 = parseFloat(z0);
    eps_eff = parseFloat(eps_eff);
    w = parseFloat(w);

    if (h === "" || eps_r === "" || f === "" || z0 === "") {
        alert("Wprowadź wszystkie wartości!");
    } else if (h >= w) { //ZAPYTAC ADY I KAPIEGO
        eps_eff = (((eps_r+1)/2)+((eps_r-1)/2)*(1/(sqrt(1+12*h/w))+0.04*(1-w/h)*(1-w/h)))
        document.getElementById("eps_eff_result").innerHTML = "Epsilon<sub>eff</sub> = " + eps_eff;
        z0 = (60/sqrt(eps_eff))*Math.log((8*h/w)+(w/(4*h)))
        document.getElementById("z0_result").innerHTML = "Z<sub>0</sub> = " + z0;
    } else if (h < w) {
        eps_eff = (((eps_r+1)/2)+((eps_r-1)/2*sqrt(1+12*h/w))) // DODAC SYMBOL EPSILON
        document.getElementById("eps_eff_result").innerHTML = "Epsilon<sub>eff</sub> = " + eps_eff;
        z0 = 120*Math.PI/(sqrt(eps_eff)*((w/h)+1.393+0.667*Math.log(w/h+1.444)))
        document.getElementById("z0_result").innerHTML = "Z<sub>0</sub> = " + z0;
    }

    lambda = c/(f*sqrt(eps_eff))
    document.getElementById("lambda_result").innerHTML = "lambda = " + lambda; //DODAC ZNACZEK LAMBDY
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "calculateButton_microstripLine") {
        microstripLineCalculator();
    }
});

export let microstripLine_html =
    "<div class=\"container\">\n" +
    "  <div class=\"content\">\n" +

    "  <h2>Microstrip Line</h2>\n" +
    "  <p>Analysis and Synthesis</p>\n" +

    "  <div class=\"parameters\">" +
    "    <label>H = <input type=\"number\" id='h_parameter'> mm</label>" +
    "    <label>w = <input type=\"number\" id='w_parameter'> mm</label>" +
    "    <label>Eps_r = <input type=\"number\" id='eps_r_parameter'></label>" +
    "    <label>Z0 = <input type=\"number\" id='z0_parameter'> Ohm</label>" +
    "    <label>f = <input type=\"number\" id='f_parameter'> GHz</label>" +
    "  </div>" +


    "  <button id='calculateButton_microstripLine'>Calculate</button>" +

    "  <div class='microstripLine_result' id='microstripLine_result' >" +
    "<span id='eps_eff_result'>" +
    "</span>" +
    "<span id='z0_result'>" +
    "</span>" +
    "<span id='lambda_result'>" +
    "</span>" +
    "  </div>\n" +

    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +

    "  </div>\n" +
    "</div>\n";