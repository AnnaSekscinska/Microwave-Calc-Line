export function microstripLine() {
    return {hash: "#microstrip_line", content: microstripLine_html}
}

export let microstripLine_html =
    "<div class=\"container\">\n" +
    "  <div class=\"content\">\n" +

    "  <h2>Microstrip Line</h2>\n" +
    "  <p>Analysis and Synthesis</p>\n" +

    "  <div class=\"parameters\">\n" +
    "    <label>H = <input type=\"number\"> mm</label>\n" +
    "    <label>Eps_r = <input type=\"number\"></label>\n" +
    "    <label>Z0 = <input type=\"number\"> Ohm</label>\n" +
    "    <label>f = <input type=\"number\"> GHz</label>\n" +
    "  </div>\n" +


    "  <button>Calculate</button>\n" +

    "  <div class=\"result\">\n" +
    "    W = ... mm" +
    "Eps_eff = ... lambda = ... mm " +
    "  </div>\n" +

    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +

    "  </div>\n" +
    "</div>\n";