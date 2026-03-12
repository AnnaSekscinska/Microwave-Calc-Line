export function impedance_transformation() {
    return{hash: "#rect_wave", content: impedanceTransformation_html}
}

export let impedanceTransformation_html = "<div class=\"container\">\n" +
    "<img class='img_Calculator' src='img/ImpedanceTransformation .png'/>\n" +
    "<div class=\"content\">\n" +
    "  <h2>Impedance transformation</h2><br>" +
    "  <p>Generator — Load</p><br>" +
    "<br>" +
    "  <div class=\"parameters\"><br>" +
    "    <label>λ (lambda) = <input type=\"number\" > mm</label><br>" +
    "    <label>R_L/Z  = <input type=\"number\" ></label><br>" +
    "    <label>X_L/Z = <input type=\"number\"></label><br>" +
    "    <label>Distance of transformationd = <input type=\"number\"> mm</label><br>" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"direction\">\n" +
    "    <label><input type=\"checkbox\"> Towards generator</label><br>" +
    "    <label><input type=\"checkbox\"> Towards load</label><br>" +
    "  </div>\n" +
    "\n" +
    "  <button>Calculate</button>\n" +
    "\n" +
    "  <div class=\"result\">\n" +
    "    normalized ZL' = RL' + jXL' = 00<br>" +
    "  </div>\n" +
    "\n" +
    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +
    "</div>\n" +
    "</div>\n"

