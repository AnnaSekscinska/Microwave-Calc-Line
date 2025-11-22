//function addElementOld() {
//
// const newDiv = document.createElement('div');
//
// const currentDiv = document.getElementById("start");
//
// const Content = document.createTextNode("Cyce");
//
// newDiv.appendChild(Content);
//
//document.body.insertBefore(newDiv, currentDiv);
//}
//
//function addElementOld2 (){
//
// const newHeader = document.createElement('header');
// const newDiv = document.createElement('div');
//
// newHeader.innerHTML = "<div> dupa </div>";
//document.body.appendChild(newHeader);
//}

function addElement () {
 const newSection = document.createElement('section');

 const calcArray = [
     {title: "Rectangular Waveguide", img: "src=\"img/logoProj.png\"" },
     {title: "Microstrip Line", img: "src=\"img/logoProj.png\""},
     {title: "Load Impedance Calculation", img: "src=\"img/logoProj.png\""},
     {title: "Impedance Transformation", img: "src=\"img/logoProj.png\""},
     {title: "VSWR Calculation", img: "src=\"img/logoProj.png\""},
     {title: "Impedance Matching - Single Stub", img: "src=\"img/logoProj.png\""},
     {title: "Impedance Matching - L-section network", img: "src=\"img/logoProj.png\""},
     {title: "Dictionary", img: "src=\"img/logoProj.png\""},
 ]

 //for (let i=0; i<8; i++) {
 // newSection.innerHTML += "<div class=\"div-calculator\">\n" +
 //     "    <img class=\"div-img\" src=\"img/logoProj.png\" alt=\"Logo\"/>\n" +
 //     `   <header class=\"header-calculator\">${calcArray[i].title}</header>\n` +
 //     "  </div>"
 //}

 calcArray.forEach((element) => {
  newSection.innerHTML += "<div class=\"div-calculator\">\n" +
      `    <img class=\"div-img\" ${element.img} alt=\"Logo\"/>\n` +
      `   <header class=\"header-calculator\">${element.title}</header>\n` +
      "  </div>"
 })

 document.body.appendChild(newSection);
 const sectionHeader = document.getElementById("main-header");

sectionHeader.after(newSection);
}

addElement();