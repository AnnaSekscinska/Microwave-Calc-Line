import {rect_wave} from "./rectWaveguide";
import {microstripLine} from "./microstripLine";
import {impedance_calculator} from "./impedanceCalculator";
import {impedance_transformation} from "./impedanceTransformation";
import {VSWRCalculation} from "./VSWRCalculation";
import {impedanceMatchingSS} from "./impedanceMatchingSS";
import {impedanceMatchingLSN} from "./impedanceMatchingLSN";
import {dictionary} from "./dictionary";
import {createMainPage} from "./mainPage";
import {changeLanguage, curr_lang} from "./languageDictionary";


if (!document.getElementById('mathjax-script')) {
    const script = document.createElement('script');
    script.id = 'mathjax-script';
    script.async = true;
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(script);
}


window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(curr_lang);
})

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
    const hook = document.getElementById("header");
    let mainContainer = document.getElementById("main-container");
    if (mainContainer) {
        mainContainer.remove();
    }

    mainContainer = document.createElement('section');
    mainContainer.classList.add("main-container");
    mainContainer.id = "main-container";
    console.log(hook);

    if (hash) {
        mainContainer.innerHTML = pageRouter[hash].content;
        hook.after(mainContainer);
    } else {
        createMainPage();
    }

    setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    }, 50);

    if (typeof window.changeLanguage === "function") {
        window.changeLanguage(localStorage.getItem("language") || "pl");
    }

    const currentBtn = document.getElementById("currentButton");
    const returnBtn = document.getElementById("returnButton");
    if (returnBtn) {
        returnBtn.addEventListener("click", () => {
            window.location.hash = "";
        });
    }
    if (currentBtn) {
        currentBtn.addEventListener("click", () => {
            window.location.hash = "";
        });
    }
}

window.addEventListener('hashchange', switchContent);
window.addEventListener('load', switchContent);