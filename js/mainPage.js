export function main_page() {
    return{hash: "#rect_wave", content: main_page_html}
}

export function createMainPage () {
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

    const oldMain = document.getElementById("main-container")
    if (oldMain) {

        document.body.removeChild(oldMain)
    }

    const sectionHeader = document.getElementById("main-header");

    sectionHeader.after(newSection);

    calcArray.forEach((element) => {
        document.getElementById(`${element.id}`).onclick = function () {
            window.location.href = "#" + element.id;
        }
    })

}

