export function rect_wave() {
    return{hash: "#rect_wave", content: rect_html}
}

export let rect_html = "<div class=\"container\">\n" +
    "  <h2>Rectangular waveguide</h2>\n" +
    "  <p>Cutoff frequency calculations</p>\n" +
    "\n" +
    "  <div class=\"parameters\">\n" +
    "    <label>a = <input type=\"number\" > mm</label>\n" +
    "    <label>b = <input type=\"number\" ></label>\n" +
    "    <label>Eps_r = <input type=\"number\"></label>\n" +
    "  </div>\n" +
    "\n" +

    "\n" +
    "  <button id=\"calculateButton\">Calculate</button>\n" +
    "\n" +
    "  <div class=\"result\">\n" +
    "    fc_nm = <sub></sub> 00 GHz\n" +
    "  </div>\n" +
    "\n" +
    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +
    "</div>\n"

