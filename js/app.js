import {rect_wave} from "./rectWaveguide";
import {microstripLine} from "./microstripLine";
import {impedance_calculator} from "./impedanceCalculator";
import {impedance_transformation} from "./impedanceTransformation";
import {VSWRCalculation} from "./VSWRCalculation";
import {impedanceMatchingSS} from "./impedanceMatchingSS";
import {impedanceMatchingLSN} from "./impedanceMatchingLSN";
import {dictionary} from "./dictionary";
import {createMainPage} from "./mainPage";

const pageRouter = {
    rectWaveguide: rect_wave(),
    microstripLine: microstripLine(),
    impedanceCalculation: impedance_calculator(),
    impedanceTransformation: impedance_transformation(),
    VSWRCalculation: VSWRCalculation(),
    impedanceMatchingSS: impedanceMatchingSS(),
    impedanceMatchingLSN: impedanceMatchingLSN() ,
    dictionary: dictionary()
}

function switchContent() {
    const hash = window.location.hash.substring(1);
    console.log(hash);
    const hook = document.getElementById("main-container");
    console.log(hook);
    if (hash) {
        hook.innerHTML = pageRouter[hash].content;
    } else {
        createMainPage();
    }

    const returnButton = document.getElementById("returnButton");
    if (returnButton) {
        returnButton.addEventListener("click", () => {
            window.location.hash = "";
        });
    }
}
window.addEventListener('hashchange', switchContent);
window.addEventListener('load', switchContent);