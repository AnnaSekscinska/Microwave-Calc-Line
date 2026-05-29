const language = {
    pl: 1,
    eng: 0
}
export let curr_lang = localStorage.getItem("language") || "pl";
const dic = {
    main_page: ["Main page", "Strona główna"],
    buttonClc: ["Calculate", "Oblicz"],
    buttonRtn: ["Return to Main Menu", "Powrót do menu"],
    buttonAnalysis: ["Analysis", "Analiza"],
    buttonSynthesis: ["Synthesis", "Synteza"],
    //Rectangular waveguide
    titleRect: ["Rectangular waveguide", "Falowód prostokątny"],
    paragraphRect: ["Cutoff frequency calculations", "Obliczenia częstotliwości odcięcia"],
    //Microstrip Line
    titleMicrostrip: ["Microstrip Line", "Linia mikropaskowa"],
    paragraphMicrostrip: ["Analysis and Synthesis", "Analiza i synteza"],
    checkboxLine1: ["Narrow line", "Linia wąska"],
    checkboxLine2: ["Wide line", "Linia szeroka"],
    //Impedance Calculation
    titleImpCalc: ["Impedance Calculator", "Kalkulator impedancji"],
    paragraphImpCalc1: ["Generator — Load", "Generator — Obciążenie"],
    paragraphImpCalc2: ["Distance between Load and minimum of wave distribution", "Odległość między obciążeniem a minimalnym rozkładem fali" ],
    checkboxImpCalc1: ["Current wave", "Fala prądowa"],
    checkboxImpCalc2: ["Voltage wave", "Fala napięciowa"],
    //Impedance Transformation
    titleImpTrans: ["Impedance transformation", "Transformacja impedancji"],
    paragraphImpTrans: ["Generator — Load", "Generator — Obciążenie"],
    parameterImpTrans: ["Distance = ", "Dystans = "],
    checkboxImpTrans1: ["Towards generator", "W kierunku generatora"],
    checkboxImpTrans2: ["Towards load", "W kierunku ładunku"],
    //VSWR
    titleVSWR: ["VSWR Calculation", "Obliczenia VSWR"],
    paragraphVSWR: ["Pick the parameter to enter:", "Wybierz parametr:"],
    // Single Stub
    titleSS: ["Single Stub Matching Circuit", "Układ dopasowania pojedynczego strojnika"],
    paragraphSS: ["Pick the configuration: ", "Wybierz konfigurację: "],
    checkboxSS1: ["Single open-circuited series stub", "Strojnik szeregowy rozwarty"],
    checkboxSS2: ["Single short-circuited series stub", "Strojnik szeregowy zwarty"],
    checkboxSS3: ["Single open-circuited shunt stub", "Strojnik równoległy rozwarty"],
    checkboxSS4: ["Single short-circuited shunt stub", "Strojnik równoległy zwarty"],
    //L-section matching network
    titleLSN: ["L-section Matching Network", "Układ dopasowujący typu L"],
    // Dictionary
    titleDictionary: ["Dictionary", "Słownik"],
    dictionaryParagraph1: ["The most important definitions and formulas", "Najważniejsze wzory i definicje"],
    dictionaryRect1: ["For vacuum / air", "Dla próżni / powietrza"],
    dictionaryRect2: ["For a dielectric filling:", "Dla wypełnienia dielektrykiem:"],
    dictionaryRect3: ["Cutoff frequencies", "Częstotliwości odcięcia"],
    //Microatrip Line
    dictionaryMicro1: ["Characteristic impedance:", "Impedancja charakterystyczna:"],
    dictionaryMicro2: ["For narrow lines:", "Dla linii wąskich:"],
    dictionaryMicro3: ["For wide lines:", "Dla linii szerokich:"],
    dictionaryMicro4: ["Final parameters:", "Parametry końcowe:"],
    //LSN
    dict_lsection_base: ["Normalized load impedance:", "Znormalizowana impedancja obciążenia:"],
    dict_lsection_case1: ["Case 1:", "Przypadek 1:"],
    dict_lsection_case2: ["Case 2:", "Przypadek 2:"],
    dict_lsection_elements: ["Calculating components (C, L):", "Wyznaczanie elementów (C, L):"],
    dict_lsection_reactance: ["Reactance:", "Reaktancja:"],
    dict_lsection_susceptance: ["Susceptance:", "Susceptancja:"],
    //ImpedanceTransformation
    dict_trans_quarter: ["Quarter-wave line:", "Linia świerćfalowa: "],
    dict_trans_param: ["Parameters:", "Parametry:"],
    //SS
    dict_stub_series: ["Series stub", "Strojnik szeregowy"],
    dict_stub_open: ["Open-circuited:", "Rozwarty:"],
    dict_stub_short: ["Short-circuited:", "Zwarty:"],
    dict_stub_parallel: ["Shunt Stub:", "Strojnik równoległy:"],
    //VSWR
    dict_vswr_gamma: ["Reflection coefficient:", "Współczynnik odbicia:"],
    dict_vswr_complex: ["Components:", "Składowe:"],
    dict_vswr_imp: ["Load impedance:", "Impedancja obciążenia:"],
    //ImpCalc
    dict_calc_phase: ["Phase", "Faza"],
    dict_calc_current: ["Current wave:", "Fala prądowa:"],
    dict_calc_voltage: ["Voltage wave:", "Fala napięciowa:"]

}

export function changeLanguage(newLang) {
    curr_lang = newLang;

    localStorage.setItem("language", curr_lang);
    const langIdx = language[curr_lang];


    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (dic[key]) {

            element.innerText = dic[key][langIdx];
        }
    });
}