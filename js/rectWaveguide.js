export function rect_wave() {
    return{hash: "#rect_wave", content: rect_html}
}

export let rect_html = "<div class=\"container\">\n" +
    "  <h2>Impedance transformation</h2>\n" +
    "  <p>Generator — Load</p>\n" +
    "\n" +
    "  <div class=\"parameters\">\n" +
    "    <label>λ (lambda) = <input type=\"number\" > mm</label>\n" +
    "    <label>R_L/Z  = <input type=\"number\" ></label>\n" +
    "    <label>X<sub>L</sub>/Z<sub></sub> = <input type=\"number\"></label>\n" +
    "    <label>Distance of transformation = <input type=\"number\"> mm</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"direction\">\n" +
    "    <label><input type=\"checkbox\"> Towards generator</label>\n" +
    "    <label><input type=\"checkbox\"> Towards load</label>\n" +
    "  </div>\n" +
    "\n" +
    "  <button>Calculate</button>\n" +
    "\n" +
    "  <div class=\"result\">\n" +
    "    normalized Z<sub>L'</sub> = R<sub>L'</sub> + jX<sub>L'</sub> = 00\n" +
    "  </div>\n" +
    "\n" +
    "  <button class=\"return\">Return to Main Menu</button>\n" +
    "</div>\n"

