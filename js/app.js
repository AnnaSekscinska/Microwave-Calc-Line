import {rect_wave} from "./page";
console.log(rect_wave());
const pageRouter = {
    rectWaveguide: rect_wave()
}

function addElement () {
    const newSection = document.createElement('section');
    newSection.classList.add("main-container");
    newSection.id = "main-container";
     const calcArray = [
         {title: "Rectangular Waveguide", img: "src=\"img/logoProj.png\"", id: "rectWaveguide"},
         {title: "Microstrip Line", img: "src=\"img/logoProj.png\"", id: "microstripLine"},
         {title: "Load Impedance Calculation", img: "src=\"img/logoProj.png\"", id: "impedanceCalculation"},
         {title: "Impedance Transformation", img: "src=\"img/logoProj.png\"", id: "impedanceTransformation"},
         {title: "VSWR Calculation", img: "src=\"img/logoProj.png\"", id: "VSWRCalculation"},
         {title: "Impedance Matching - Single Stub", img: "src=\"img/logoProj.png\"", id: "impedanceMatchingSS"},
         {title: "Impedance Matching - L-section network", img: "src=\"img/logoProj.png\"", id: "impedanceMatchingLSN"},
         {title: "Dictionary", img: "src=\"img/logoProj.png\"", id: "dictionary"},
     ]

    calcArray.forEach((element) => {
      newSection.innerHTML += `<div id=\"${element.id}\" class=\"div-calculator\">\n` +
          `    <img  class=\"div-img\" ${element.img} alt=\"Logo\"/>\n` +
          `   <header class=\"header-calculator\">${element.title}</header>\n` +
          "  </div>"
        })

    document.body.appendChild(newSection);
    const sectionHeader = document.getElementById("main-header");

    sectionHeader.after(newSection);

    calcArray.forEach((element) => {
    document.getElementById(`${element.id}`).onclick = function () {
        window.location.href = "#" + element.id;
    }
})

}

function switchContent() {
    const hash = window.location.hash.substring(1);
    console.log(hash);
    const hook = document.getElementById("main-container");
    console.log(hook);
    hook.innerHTML = pageRouter[hash].content;
}

addElement();
window.addEventListener('hashchange', switchContent);
