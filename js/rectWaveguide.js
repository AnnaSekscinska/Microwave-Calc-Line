import {sqrt} from "mathjs";

export function rect_wave() {
    return{hash: "#rect_wave", content: rect_html}
}


function rectHTMLCalculator(a, b, eps_r, m, n, c, fc, mi_r) {
    a =document.getElementById("A_parameter").value;
    b =document.getElementById("B_parameter").value;
    eps_r =document.getElementById("Epsr_parameter").value;
    m =document.getElementById("M_parameter").value;
    n =document.getElementById("N_parameter").value;
    c = 300000000;
    mi_r = 1;
    fc = document.getElementById("fc_result").value;

    a = parseFloat(a);
    b = parseFloat(b);
    eps_r= parseFloat(eps_r);
    m = parseFloat(m);
    n = parseFloat(n);
    fc = parseFloat(fc);

    if (a === "" || b === "" || eps_r === "" || m === "" || n === "") {
        alert("Wprowadź wszystkie wartości!");
    } else if (eps_r === 1){
        fc = (c/2)*sqrt((m/a)*(m/a)+(n/b)*(n/b));
        document.getElementById("fc_result").innerHTML = "f<sub>c(m,n)</sub> = " + fc.toFixed(5);
        console.log(fc);
    } else {
        fc = ((c/(2*sqrt(eps_r*mi_r)))*sqrt((m/a)*(m/a)+(n/b)*(n/b)));
        document.getElementById("fc_result").innerHTML = "f<sub>c(m,n)</sub> = " + fc.toFixed(5);
        console.log(fc);
    }
    let mList = [0,0,0,1,2,3,1,1,1];
    let nList = [1,2,3,0,0,0,1,2,3];
    let fmn = "";

    for (let i = 0; i < mList.length; i++) {
        if (eps_r === 1){
            const res = (c/2)*sqrt(((mList[i]/a)*(mList[i]/a))+((nList[i]/b)*(nList[i]/b)));
            fmn+=`f <sub>c(${mList[i]},${nList[i]})</sub> = ${res.toFixed(5)}<br>`
            document.getElementById("fmn_result").innerHTML = fmn;
            console.log(fmn);
        } else {
            const res = ((c/(2*sqrt(eps_r*mi_r)))*sqrt(((mList[i]/a)*(mList[i]/a))+((nList[i]/b)*(nList[i]/b))))
            fmn+=`f <sub>c(${mList[i]},${nList[i]})</sub> = ${res.toFixed(5)}<br>`
            document.getElementById("fmn_result").innerHTML = fmn;
            console.log(fmn);
        }
    }
    //document.getElementById("fc_result").innerHTML = fc;
    //document.getElementById("fmn_result").innerHTML = fmn;
}

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "calculateButton_rect") {
        rectHTMLCalculator();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const calcBtn = document.getElementById("calculateButton_rect");
        if (calcBtn) {
            rectHTMLCalculator();
        }
    }
});

export let rect_html = "<div class=\"container\">\n" +
    "<img class='img_Calculator' src='img/rectwaveguide.png'/>" +

    "<div class=\"content\">" +

    "  <h2 data-key='titleRect'>Rectangular waveguide</h2>" +

    "  <p data-key='paragraphRect'>Cutoff frequency calculations</p>" +

    "  <div class=\"parameters\">" +
    "    <label>a = <input type=\"number\" id='A_parameter'>mm</label>" +
    "    <label>b = <input type=\"number\" id='B_parameter'>mm</label>" +
    "    <label><span>ε<sub>r</sub> = </span><input type=\"number\" id='Epsr_parameter'>  </label>" +
    "    <label>n = <input type=\"number\" id='N_parameter'></label>" +
    "    <label>m = <input type=\"number\" id='M_parameter'></label> " +
    "  </div>" +
    "  <div class=\"container-button\">" +
    "  <button id=\"calculateButton_rect\" data-key='buttonClc'>Calculate</button>" +
    "  </div>" +
    "  <div  class=\"fcmn_results\" id='fcmn_results'>" +
    "<span id='fmn_result'></span>" +

    "<span id='fc_result'> " +
    "  </div>" +

    "  <button id=\"returnButton\" class=\"return\" data-key='buttonRtn'>Return to Main Menu</button>" +
    "</div>" +
"</div>"


