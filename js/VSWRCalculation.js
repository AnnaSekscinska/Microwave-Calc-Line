export function VSWRCalculation() {
    return {hash: "#VSWRCalculation", content: VSWRCalculation_html}
}

export let VSWRCalculation_html = "<div class=\"container\">\n" +
    "<img class='img_Calculator' src='img/VSWR.png'/>\n" +
    "<div class=\"content\">\n" +

    "  <h2>VSWR calculation</h2>\n" +

    "  <div class=\"parameters\">\n" +
    "    <label>Z0 = <input type=\"number\"> Ω</label>\n" +

    "  </div>\n" +

    "  <button>Calculate</button>\n" +

    "  <div class=\"result\">\n" +

    "    <label>Pick the parameter</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> VSWR</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> |G|   arg(G) deg</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> Re(G)   Im(G)</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> r   +jx</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> g   +jb</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> R Ω   +jX Ω</label>\n" +
    "    <label class=\"VSWRCheckbox\"><input type=\"checkbox\"> G S   +jB S</label>\n" +
    "  </div>\n" +

    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +

    "</div>\n" +
    "</div>\n";