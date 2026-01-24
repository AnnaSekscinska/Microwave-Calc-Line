export function rect_wave() {
    return{hash: "#rect_wave", content: rect_html}
}

export let rect_html = "<div class=\"container\">\n" +
    //"<img class='img_Calculator' src='img/lech.png'>\n" +
    "<div class=\"content\">\n" +
    "  <h2>Rectangular waveguide</h2>\n" +
    "  <p>Cutoff frequency calculations</p>\n" +
    "\n" +
    "  <div class=\"parameters\">\n" +
    "    <label>a = <input type=\"number\" >mm</label>\n" +
    "    <label>b = <input type=\"number\" >  </label>\n" +
    "    <label>Eps_r = <input type=\"number\">  </label>\n" +
    "  </div>\n" +
    "\n" +

    "\n" +
    "  <button id=\"calculateButton\">Calculate</button>\n" +
    "\n" +
    "  <div class=\"result\">\n" + " fc_01 = 00 GHz<br>" + " fc_02 = 00 GHz <br>" + " fc_03 = 00 GHz <br>" + " fc_10 = 00 GHz<br>" + " fc_20 = 00 GHz<br>" + " fc_30 = 00 GHz<br>" + " fc_11 = 00 GHz<br>" + " fc_12 = 00 GHz<br>" + " fc_13 = 00 GHz<br>" +
    "n <input type=\"number\"> m <input type=\"number\">  " + " <br> fc_nm = <sub></sub> 00 GHz\n" +
    "  </div>\n" +
    "\n" +
    "  <button id=\"returnButton\" class=\"return\">Return to Main Menu</button>\n" +
    "</div>\n" +
"</div>\n"


