import { curr_lang } from "./languageDictionary.js";

export function createMainPage() {
    const newSection = document.createElement('section');
    newSection.classList.add("main-container");
    newSection.id = "main-container";


    const calcArray = [
        {key: "titleRect", img: "src=\"img/logo_rectwaveguide.png\"", id: "rectWaveguide"},
        {key: "titleMicrostrip", img: "src=\"img/MS_photo.png\"", id: "microstripLine"},
        {key: "titleImpCalc", img: "src=\"img/LI_photo.png\"", id: "impedanceCalculation"},
        {key: "titleImpTrans", img: "src=\"img/ImpTra_photo.png\"", id: "impedanceTransformation"},
        {key: "titleVSWR", img: "src=\"img/VSWR-photo.png\"", id: "VSWRCalculation"},
        {key: "titleSS", img: "src=\"img/ImpMatSS_photo.png\"", id: "impedanceMatchingSS"},
        {key: "titleLSN", img: "src=\"img/mpMatchL_photo.png\"", id: "impedanceMatchingLSN"},
        {key: "titleDictionary", img: "src=\"img/dictionary_photo.png\"", id: "dictionary"},
    ]

    calcArray.forEach((element) => {

        newSection.innerHTML += `<div id="${element.id}" class="div-calculator">\n` +
            `    <img class="div-img" ${element.img} alt="Logo"/>\n` +
            `    <header class="header-calculator" data-key="${element.key}"></header>\n` +
            "  </div>"
    });


    const oldMain = document.getElementById("main-container");
    if (oldMain) { document.body.removeChild(oldMain); }
    const sectionHeader = document.getElementById("main-header");
    sectionHeader.after(newSection);

    calcArray.forEach((element) => {
        document.getElementById(`${element.id}`).onclick = function () {
            window.location.href = "#" + element.id;
        }
    });


    if (typeof window.changeLanguage === "function") {
        window.changeLanguage(curr_lang);
    }
}