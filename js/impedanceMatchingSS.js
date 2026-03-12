export function impedanceMatchingSS() {
    return{hash: "#rect_wave", content: impedanceMatchingSS_html}
}

export let impedanceMatchingSS_html = "<div class=\"container\">\n" +
    "<img class='img_Calculator' src='img/SS.png'/>\n" +
    "<div class=\"content\">\n" +
    "  <h2>Single Stub Matching Circuit</h2>\n" +
    "  <p>Load impedance Z_L = R_L + jX_L</p>\n" +
    "\n" +
    "  <div class=\"parameters\">\n" +
    "    <label>R_L = <input type=\"number\" > Ohm</label>\n" +
    "    <label>X_L  = <input type=\"number\" > Ohm</label>\n" +
    "    <label>Line impedance</label>\n" +
    "    <label>Z0 = <input type=\"number\"> Ohm</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"direction\">\n" +
    "<label>Pick the configuration</label>\n" +
    "    <label><input type=\"checkbox\"> Solution 1 </label>\n" +
    "    <label><input type=\"checkbox\"> Solution 2</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <button>Calculate</button>\n" +
    "\n" +
    "  <div class=\"result\">\n" +
    "    d1/lambda  = 00\n    l1/lambda = 00\n" +
    "    d2/lambda = 00\n     l2/lambda = 00\n" +
    "  </div>\n" +
    "\n" +
    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +
    "</div>\n"

