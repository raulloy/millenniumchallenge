const apiURL = "https://millenniumchallenge.onrender.com";
// const apiURL = "http://localhost:5000";

export default apiURL;

export const TTB_RULES = {
  single_choice: {
    default: ["De acuerdo", "Muy de acuerdo"], // Fallback for unknown matrix types
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
    Bueno: ["Bueno", "Excelente"],
    Regular: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
    Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
    No: ["Si"],
    Si: ["Si"],
    Mucho: ["Mucho"],
    "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
    "Algo fácil": ["Muy fácil", "Algo fácil"],
    Nunca: ["Nunca", "Pocas veces"],
    Moderada: ["Suficiente", "Moderada"],
    Buenas: ["Excelentes", "Buenas"],
    "Algo Probable": ["Algo Probable", "Muy Probable"],
    "Bastante probable": ["Bastante probable", "Algo probable"],
    "Nada probable": ["Nada probable", "Poco probable"],
    "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
    "Son buenos": ["Son excelentes", "Son buenos"],
  },
  matrix: {
    default: ["De acuerdo", "Muy de acuerdo"], // Fallback for unknown matrix types
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
    Bueno: ["Bueno", "Excelente"],
    Regular: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
    Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
    No: ["Si"],
    Si: ["Si"],
    Mucho: ["Mucho"],
    "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
    "Algo fácil": ["Muy fácil", "Algo fácil"],
    Nunca: ["Nunca", "Pocas veces"],
    Moderada: ["Suficiente", "Moderada"],
    Buenas: ["Excelentes", "Buenas"],
    "Algo Probable": ["Algo Probable", "Muy Probable"],
    "Bastante probable": ["Bastante probable", "Algo probable"],
    "Nada probable": ["Nada probable", "Poco probable"],
    "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
    "Son buenos": ["Son excelentes", "Son buenos"],
  },
};

export const exceptions =
  "¿Has observado algún tema antiético o de corrupción por parte de algún miembro de esta empresa?";
