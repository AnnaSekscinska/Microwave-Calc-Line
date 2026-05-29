export function dictionary () {
    return{hash: "#rect_wave", content: dictionary_html}
}

export let dictionary_html = `
    <div class="container">
        <div class="content">
            <h2 data-key='titleDictionary'>Dictionary</h2>
            <p data-key='dictionaryParagraph1'>The most important definitions and formulas</p>

            <div class="parameters">

               <details class="dictionary-item">
    <summary data-key="titleRect">Rectangular Waveguide</summary>
    <div class="item-content">
        <h4><span data-key="dictionaryRect3">Cutoff frequencies</span> \\( f_{c(m,n)} \\):</h4>
        
        <p><span data-key="dictionaryRect1">For vacuum / air</span> \\( \\epsilon_r = 1 \\):</p>
        $$f_{c(m,n)} = \\frac{c}{2} \\cdot \\sqrt{\\left(\\frac{m}{a}\\right)^2 + \\left(\\frac{n}{b}\\right)^2}$$

        <p><span data-key="dictionaryRect2">For a dielectric filling:</span> \\( \\epsilon_r \\):</p>
        $$f_{c(m,n)} = \\frac{c}{2 \\cdot \\sqrt{\\epsilon_r \\cdot \\mu_r}} \\cdot \\sqrt{\\left(\\frac{m}{a}\\right)^2 + \\left(\\frac{n}{b}\\right)^2}$$
     
    </div>
</details>

                <details class="dictionary-item">
                    <summary data-key="titleMicrostrip">Microstrip Line</summary>
                    <div class="item-content">
                   <div class="item-content">
    <h4 data-key="buttonAnalysis">Analysis </h4>
    <p>\\( H > W \\):</p>
    $$ \\epsilon_{eff} = \\frac{\\epsilon_{r}+1}{2} + \\frac{\\epsilon_{r}-1}{2} \\left[ \\frac{1}{\\sqrt{1+12\\frac{H}{W}}} + 0.04\\left(1-\\frac{W}{H}\\right)^{2} \\right] $$
    
    <p> \\( H < W \\):</p>
    $$ \\epsilon_{eff} = \\frac{\\epsilon_{r}+1}{2} + \\frac{\\epsilon_{r}-1}{2\\sqrt{1+12\\frac{H}{W}}} $$

    <br>
    <p data-key="dictionaryMicro1"><b>Characteristic impedance:</b></p>
    <p>\\( H > W \\):</p>
    $$ Z_{0} = \\frac{60}{\\sqrt{\\epsilon_{eff}}} \\ln\\left(\\frac{8H}{W} + \\frac{W}{4H}\\right) $$

    <p>\\( H < W \\):</p>
    $$ Z_{0} = \\frac{120\\pi}{\\sqrt{\\epsilon_{eff}} \\left[ \\frac{W}{H} + 1.393 + 0.667 \\ln\\left(\\frac{W}{H} + 1.444\\right) \\right]} $$

    <hr>
    
    <h4 data-key="buttonSynthesis">Synthesis</h4>
    <p data-key="dictionaryMicro2"><b>For narrow lines:</b></p>
    $$ A = \\frac{Z_{0}}{60}\\sqrt{\\frac{\\epsilon_{r}+1}{2}} + \\frac{\\epsilon_{r}-1}{\\epsilon_{r}+1}\\left(0.23+\\frac{0.11}{\\epsilon_{r}}\\right) $$
    $$ \\frac{W}{H} = \\frac{8e^{A}}{e^{2A}-2} $$

    <p data-key="dictionaryMicro3"><b>For wide lines:</b></p>
    $$ B = \\frac{377\\pi}{2Z_{0}\\sqrt{\\epsilon_{r}}} $$
    $$ \\frac{W}{H} = \\frac{2}{\\pi} \\left[ B-1-\\ln(2B-1)+\\frac{\\epsilon_{r}-1}{2\\epsilon_{r}}\\left(\\ln(B-1)+0.39-\\frac{0.61}{\\epsilon_{r}}\\right) \\right] $$

    <br>
    <p data-key="dictionaryMicro4"><b>Final parameters:</b></p>
    $$ W = \\left(\\frac{W}{H}\\right) \\cdot H $$
    $$ \\lambda_{g} = \\frac{c}{f \\cdot \\sqrt{\\epsilon_{eff}}} $$
</div>
                </details>

             <details class="dictionary-item">
    <summary data-key="titleImpTrans">Impedance Transformation</summary>
    <div class="item-content">
       
        $$Z_{in} = Z_{0} \\frac{Z_{L} + jZ_{0} \\tan(\\beta l)}{Z_{0} + jZ_{L} \\tan(\\beta l)}$$
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_trans_quarter">Quarter-wave line:</h4>
        $$Z_{in} = \\frac{Z_{0}^2}{Z_{L}}$$

        <h4 data-key="dict_trans_param">Parametry:</h4>
        <ul>
            <li>\\( \\beta = \\frac{2\\pi}{\\lambda_g} \\)</li>
          
        </ul>
    </div>
</details>

              <details class="dictionary-item">
    <summary data-key="titleVSWR">VSWR Calculation</summary>
    <div class="item-content">
        <h4 data-key="dict_vswr_gamma">Reflection coefficient: \\( |\\Gamma| \\):</h4>
        $$|\\Gamma| = \\frac{VSWR - 1}{VSWR + 1}$$
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_vswr_complex">Components: \\( \\Gamma \\):</h4>
        $$\\Gamma = Re(\\Gamma) + j \\cdot Im(\\Gamma)$$
        $$Re(\\Gamma) = |\\Gamma| \\cdot \\cos(\\arg(\\Gamma))$$
        $$Im(\\Gamma) = |\\Gamma| \\cdot \\sin(\\arg(\\Gamma))$$

        <h4 data-key="dict_vswr_imp">Load impedance:</h4>
        $$Z_{L} = Z_{0} \\frac{1 + \\Gamma}{1 - \\Gamma}$$
    </div>
</details>

             <details class="dictionary-item">
    <summary data-key="titleImpCalc">Impedance Calculator</summary>
    <div class="item-content">
        <h4 data-key="dict_vswr_gamma">Reflection coefficient: \\( \\Gamma \\):</h4>
        $$|\\Gamma| = \\frac{SWR - 1}{SWR + 1}$$
        $$\\Gamma = |\\Gamma| \\cdot e^{j \\phi}$$
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_vswr_imp">Load impedance: \\( z_L \\):</h4>
        $$z_L = \\frac{1 + \\Gamma}{1 - \\Gamma}$$

        <h4 data-key="dict_calc_phase">Phase \\( \\phi \\):</h4>
        <p><span data-key="dict_calc_current">Current wave:</span> \\( \\phi = 2 \\beta d \\)</p>
        <p><span data-key="dict_calc_voltage">Voltage wave:</span> \\( \\phi = 2 \\beta d - \\pi \\)</p>
        
        <p style="font-size: 14px; color: #64748b; margin-top: 15px;">
            \\( \\beta = \\frac{2\\pi}{\\lambda} \\)
        </p>
    </div>
</details>
              <details class="dictionary-item">
    <summary data-key="titleSS">Single Stub Matching</summary>
    <div class="item-content">
        <h4 data-key="dict_stub_series">Series Stub</h4>
        <p><span data-key="dict_stub_open">Open-circuited:</span> \\( Z_{stub} = -jZ_{0} \\cot(\\beta l) \\)</p>
        <p><span data-key="dict_stub_short">Short-circuited:</span> \\( Z_{stub} = jZ_{0} \\tan(\\beta l) \\)</p>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_stub_parallel">Shunt Stub</h4>
        <p><span data-key="dict_stub_open">Open-circuited:</span> \\( Y_{stub} = jY_{0} \\tan(\\beta l) \\)</p>
        <p><span data-key="dict_stub_short">Short-circuited:</span> \\( Y_{stub} = -jY_{0} \\cot(\\beta l) \\)</p>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_trans_param">Parametry:</h4>
        <ul>
            <li>\\( \\beta = 2\\pi / \\lambda_g \\)</li>
        </ul>
    </div>
</details>
               <details class="dictionary-item">
    <summary data-key="titleLSN">L-section Matching Network</summary>
    <div class="item-content">
        <h4 data-key="dict_lsection_base">Normalized load impedance:</h4>
        $$Z_{L} = R_{L} + jX_{L}$$
        $$z_{L} = \\frac{Z_{L}}{Z_{0}} = r_{L} + jx_{L}$$

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_lsection_case1">Przypadek 1: \\( R_{L} < Z_{0} \\ (r_{L} < 1) \\)</h4>
        $$x = \\pm\\sqrt{r_{L}(1-r_{L})} - x_{L}$$
        $$b = \\pm\\sqrt{\\frac{1-r_{L}}{r_{L}}}$$

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_lsection_case2">Przypadek 2: \\( R_{L} > Z_{0} \\ (r_{L} > 1) \\)</h4>
        $$b = \\frac{x_{L} \\pm \\sqrt{r_{L}(r_{L}^{2} + x_{L}^{2} - r_{L})}}{r_{L}^{2} + x_{L}^{2}}$$
        $$x = \\frac{b \\cdot x_{L} + r_{L} - 1}{b \\cdot r_{L}}$$

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">

        <h4 data-key="dict_lsection_elements">Calculating components (C, L):</h4>
        
        <p><span data-key="dict_lsection_reactance">Reactance:</span> \\( X = x \\cdot Z_{0} \\)</p>
        $$C_{Z} = -\\frac{1}{X \\cdot 2\\pi f} \\quad \\text{(dla } X < 0 \\text{)}$$
        $$L_{Z} = \\frac{X}{2\\pi f} \\quad \\text{(dla } X > 0 \\text{)}$$

        <p><span data-key="dict_lsection_susceptance">Susceptance:</span> \\( B = \\frac{b}{Z_{0}} \\)</p>
        $$C_{Y} = \\frac{B}{2\\pi f} \\quad \\text{(dla } B > 0 \\text{)}$$
        $$L_{Y} = -\\frac{1}{B \\cdot 2\\pi f} \\quad \\text{(dla } B < 0 \\text{)}$$
    </div>
</details>

            </div>

            <div class="direction"></div>

            <button id="returnButton" class="return">Return to Main Menu</button>
        </div>
    </div> 
`