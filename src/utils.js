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

export const TTB_RULES_2 = {
  single_choice: {
    // 🔹 Cultura Organizacional 🔹
    "Te comunican de forma correcta y a tiempo todas las oportunidades de crecimiento y desarrollo que se dan a lo interno de la empresa":
      ["Muy de acuerdo", "De acuerdo"],
    "Estás satisfecho con las políticas, reglamentos, valores, usos y costumbres": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Conoces cuál es la misión y visión": ["Muy de acuerdo", "De acuerdo"],

    "Entre los diferentes departamentos, existe una buena relación": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Existe trabajo en equipo en tu departamento": ["Muy de acuerdo", "De acuerdo"],
    "Tus compañeros de trabajo están comprometidos con hacer un trabajo de calidad": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "¿Consideras que tienes la cantidad apropiada de información para realizar bien tu trabajo?": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Murales informativos": ["Excelente", "Bueno"],
    Zoom: ["Excelente", "Bueno"],
    WhatsApp: ["Excelente", "Bueno"],
    "Correos electrónicos": ["Excelente", "Bueno"],
    Internet: ["Excelente", "Bueno"],
    Celulares: ["Excelente", "Bueno"],
    "Teléfonos /línea directa": ["Excelente", "Bueno"],

    "¿Qué tan comprometida consideras que está esta empresa con la diversidad, la inclusión y la no discriminación hacia las personas?":
      ["Totalmente comprometida", "Algo comprometida"],

    "Discriminación por tener una discapacidad": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por sexo (sexismo)": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por edad": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por raza": ["Nunca se ha dado", "Casi nunca se da"],
    "Acoso sexual": ["Nunca se ha dado", "Casi nunca se da"],
    "Hostigamiento laboral": ["Nunca se ha dado", "Casi nunca se da"],

    "¿Has observado algún tema antiético o de corrupción por parte de algún miembro de esta empresa?":
      ["No"],
    // 🔹 Liderazgo 🔹
    "¿Podría hacer algo tu jefe inmediato para que tú puedas realizar mejor tu trabajo o para que puedas realizarlo de una forma más fluida y fácil?":
      ["Si"],
    "¿En los últimos meses, has recibido por parte de tu jefe/a algún reconocimiento o felicitación por haber realizado un buen trabajo?":
      ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    "¿Qué tan apropiadas han sido las sanciones disciplinarias aplicadas a ti o a otros compañeros?":
      ["Apropiadas", "Algo apropiadas"],
    "Encaminados al servicio": ["Siempre", "Frecuentemente"],
    "Hacemos lo correcto": ["Siempre", "Frecuentemente"],
    Honradez: ["Siempre", "Frecuentemente"],
    "Somos transformadores": ["Siempre", "Frecuentemente"],
    "Compromiso con resultados extraordinarios": ["Siempre", "Frecuentemente"],
    // 🔹 Compromiso, bienestar y pertenencia 🔹
    "Consideras que tu carga de trabajo es la apropiada para tu puesto.": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],

    "Tienes claro cuáles son los principales objetivos que debes lograr en tu puesto de trabajo": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],

    "Te han presentado por escrito las funciones o responsabilidades de tu puesto.": ["Si"],

    "Cuentas con todos los materiales, equipos o herramientas que necesitas para hacer bien tu trabajo.":
      ["Totalmente de acuerdo", "De acuerdo"],

    "En general, ¿Qué tanto te gusta el trabajo que realizas en esta empresa?": ["Mucho"],

    "En general, ¿Qué tan motivado(a) te sientes con tu trabajo?": [
      "Muy motivado(a)",
      "Moderadamente motivado(a)",
    ],

    "¿Qué tan probable es que recomiendes positivamente a esta empresa en tu comunidad, a tus amigos, vecinos, familiares, etc.?":
      ["Muy Probable", "Algo Probable"],

    "¿Cuál es la probabilidad de que en los próximos 12 meses te mantengas trabajando para esta empresa?":
      ["Bastante probable", "Algo probable"],

    "En una semana normal, ¿con qué frecuencia experimentas estrés en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas enfadado/ira en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas preocupación en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas tristeza en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "¿Qué tan fácil te resulta equilibrar tu vida laboral con tu vida personal?": [
      "Muy fácil",
      "Algo fácil",
    ],

    "Estás satisfecho/a con la flexibilidad laboral (horarios, días libres, vacaciones) que te ofrece la empresa":
      ["Muy de acuerdo", "De acuerdo"],

    "¿Tienes buenas amistades en el trabajo?": ["Si"],

    "Tu jefe inmediato te invita a crecer y a desarrollarte aprovechando las oportunidades que existen dentro de la empresa":
      ["Muy de acuerdo", "De acuerdo"],

    "El esfuerzo que has hecho, ha sido justamente retribuido": ["Muy de acuerdo", "De acuerdo"],

    "Crees que tienes oportunidades de crecer profesionalmente en esta empresa": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Estás satisfecho(a) con la forma en que la empresa invierte en tu crecimiento y desarrollo, tanto personal como profesional":
      ["Muy de acuerdo", "De acuerdo"],

    "¿Cómo consideras que ha sido la capacitación que has recibido en esta empresa?": [
      "Suficiente",
      "Moderada",
    ],

    "¿Te gustaría recibir algún tipo de capacitación en especial/específica?": ["Si"],

    "¿Consideras que alguno de tus compañeros de trabajo podría llegar a ser un buen líder?": [
      "Si",
    ],

    "Es acorde con lo que se está pagando en el mercado local en posiciones similares": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Es acorde con la cantidad y el tipo de trabajo que realizas": ["Muy de acuerdo", "De acuerdo"],

    "¿De forma general, cuál es tu consideración con respecto a los beneficios (adicionales al salario) que te brinda esta empresa?":
      ["Son excelentes", "Son buenos"],

    "Ferias de salud": ["Totalmente satisfecho", "Satisfecho"],

    "Adelantos de salario": ["Totalmente satisfecho", "Satisfecho"],

    "Reembolso de matrícula (Estudios)": ["Totalmente satisfecho", "Satisfecho"],

    "Días por duelo": ["Totalmente satisfecho", "Satisfecho"],

    "Fiesta de Navidad": ["Totalmente satisfecho", "Satisfecho"],

    "Bono navideño": ["Totalmente satisfecho", "Satisfecho"],

    "Vales de cumpleaños": ["Totalmente satisfecho", "Satisfecho"],

    "Empleado del mes": ["Totalmente satisfecho", "Satisfecho"],

    "Vales alimenticios": ["Totalmente satisfecho", "Satisfecho"],

    "Asistencia Perfecta": ["Totalmente satisfecho", "Satisfecho"],

    "Seguro de vida y salud": ["Totalmente satisfecho", "Satisfecho"],

    "¿Estarías dispuesto a participar en algún programa de responsabilidad social que realice la empresa?":
      ["Si"],
    // 🔹 Salud y Seguridad 🔹
    "En general, ¿Qué tan probable es que sufras algún tipo de accidente debido al trabajo que realiza?":
      ["Nada probable", "Poco probable"],

    "En general, ¿Qué tan probable es que sufras algún tipo de enfermedad debido al trabajo que realiza?":
      ["Nada probable", "Poco probable"],

    "Las condiciones ambientales (iluminación, climatización, ventilación, espacio físico, etc.) en donde realizas tu trabajo son:":
      ["Excelentes", "Buenas"],
  },
  matrix: {
    // 🔹 Cultura Organizacional 🔹
    "Te comunican de forma correcta y a tiempo todas las oportunidades de crecimiento y desarrollo que se dan a lo interno de la empresa":
      ["Muy de acuerdo", "De acuerdo"],
    "Estás satisfecho con las políticas, reglamentos, valores, usos y costumbres": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Conoces  cuál es la misión y visión": ["Muy de acuerdo", "De acuerdo"],
    "Entre los diferentes departamentos,  existe una buena relación": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Existe trabajo en equipo en tu departamento": ["Muy de acuerdo", "De acuerdo"],
    "Tus compañeros de trabajo están comprometidos con hacer un trabajo de calidad": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "¿Consideras que tienes la cantidad apropiada de información para realizar bien tu trabajo?": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Murales informativos": ["Excelente", "Bueno"],
    Zoom: ["Excelente", "Bueno"],
    WhatsApp: ["Excelente", "Bueno"],
    "Correos electrónicos": ["Excelente", "Bueno"],
    Internet: ["Excelente", "Bueno"],
    Celulares: ["Excelente", "Bueno"],
    "Teléfonos /línea directa": ["Excelente", "Bueno"],

    "¿Qué tan comprometida consideras que está esta empresa con la diversidad, la inclusión y la no discriminación hacia las personas?":
      ["Totalmente comprometida", "Algo comprometida"],

    "Discriminación por tener una discapacidad": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por sexo (sexismo)": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por edad": ["Nunca se ha dado", "Casi nunca se da"],
    "Discriminación por raza": ["Nunca se ha dado", "Casi nunca se da"],
    "Acoso sexual": ["Nunca se ha dado", "Casi nunca se da"],
    "Hostigamiento laboral": ["Nunca se ha dado", "Casi nunca se da"],

    "¿Has observado algún tema antiético o de corrupción por parte de algún miembro de esta empresa?":
      ["No"],
    // 🔹 Liderazgo 🔹
    "¿Podría hacer algo tu jefe inmediato para que tú puedas realizar mejor tu trabajo o para que puedas realizarlo de una forma más fluida y fácil?":
      ["Si"],
    "¿En los últimos meses, has recibido por parte de tu jefe/a algún reconocimiento o felicitación por haber realizado un buen trabajo?":
      ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    "¿Qué tan apropiadas han sido las sanciones disciplinarias aplicadas a ti o a otros compañeros?":
      ["Apropiadas", "Algo apropiadas"],
    "Encaminados al servicio": ["Siempre", "Frecuentemente"],
    "Hacemos lo correcto": ["Siempre", "Frecuentemente"],
    Honradez: ["Siempre", "Frecuentemente"],
    "Somos transformadores": ["Siempre", "Frecuentemente"],
    "Compromiso con resultados extraordinarios": ["Siempre", "Frecuentemente"],
    // 🔹 Compromiso, bienestar y pertenencia 🔹
    "Consideras que tu carga de trabajo es la apropiada para tu puesto.": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],

    "Tienes claro cuáles son los principales objetivos que debes lograr en tu puesto de trabajo": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],

    "Te han presentado por escrito las funciones o responsabilidades de tu puesto.": ["Si"],

    "Cuentas con todos los materiales, equipos o herramientas que necesitas para hacer bien tu trabajo.":
      ["Totalmente de acuerdo", "De acuerdo"],

    "En general, ¿Qué tanto te gusta el trabajo que realizas en esta empresa?": ["Mucho"],

    "En general, ¿Qué tan motivado(a) te sientes con tu trabajo?": [
      "Muy motivado(a)",
      "Moderadamente motivado(a)",
    ],

    "¿Qué tan probable es que recomiendes positivamente a esta empresa en tu comunidad, a tus amigos, vecinos, familiares, etc.?":
      ["Muy Probable", "Algo Probable"],

    "¿Cuál es la probabilidad de que en los próximos 12 meses te mantengas trabajando para esta empresa?":
      ["Bastante probable", "Algo probable"],

    "En una semana normal, ¿con qué frecuencia experimentas estrés en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas enfadado/ira en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas preocupación en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "En una semana normal, ¿con qué frecuencia experimentas tristeza en el trabajo?": [
      "Nunca",
      "Pocas veces",
    ],

    "¿Qué tan fácil te resulta equilibrar tu vida laboral con tu vida personal?": [
      "Muy fácil",
      "Algo fácil",
    ],

    "Estás satisfecho/a con la flexibilidad laboral (horarios, días libres, vacaciones) que te ofrece la empresa":
      ["Muy de acuerdo", "De acuerdo"],

    "¿Tienes buenas amistades en el trabajo?": ["Si"],

    "Tu jefe inmediato te invita a crecer y a desarrollarte aprovechando las oportunidades que existen dentro de la empresa":
      ["Muy de acuerdo", "De acuerdo"],

    "El esfuerzo que has hecho, ha sido justamente retribuido": ["Muy de acuerdo", "De acuerdo"],

    "Crees que tienes oportunidades de crecer profesionalmente en esta empresa": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Estás satisfecho(a) con la forma en que la empresa invierte en  tu crecimiento y desarrollo, tanto personal como profesional":
      ["Muy de acuerdo", "De acuerdo"],

    "¿Cómo consideras que ha sido la capacitación que has recibido en esta empresa?": [
      "Suficiente",
      "Moderada",
    ],

    "¿Te gustaría recibir algún tipo de capacitación en especial/específica?": ["Si"],

    "¿Consideras que alguno de tus compañeros de trabajo podría llegar a ser un buen líder?": [
      "Si",
    ],

    "Es acorde con lo que se está pagando en el mercado local en posiciones similares": [
      "Muy de acuerdo",
      "De acuerdo",
    ],

    "Es acorde con la cantidad y el tipo de trabajo que realizas": ["Muy de acuerdo", "De acuerdo"],

    "¿De forma general, cuál es tu consideración con respecto a los beneficios (adicionales al salario) que te brinda esta empresa?":
      ["Son excelentes", "Son buenos"],

    "Ferias de salud": ["Totalmente satisfecho", "Satisfecho"],

    "Adelantos de salario": ["Totalmente satisfecho", "Satisfecho"],

    "Reembolso de matrícula (Estudios)": ["Totalmente satisfecho", "Satisfecho"],

    "Días por duelo": ["Totalmente satisfecho", "Satisfecho"],

    "Fiesta de Navidad": ["Totalmente satisfecho", "Satisfecho"],

    "Bono navideño": ["Totalmente satisfecho", "Satisfecho"],

    "Vales de cumpleaños": ["Totalmente satisfecho", "Satisfecho"],

    "Empleado del mes": ["Totalmente satisfecho", "Satisfecho"],

    "Vales alimenticios": ["Totalmente satisfecho", "Satisfecho"],

    "Asistencia Perfecta": ["Totalmente satisfecho", "Satisfecho"],

    "Seguro de vida y salud": ["Totalmente satisfecho", "Satisfecho"],

    "¿Estarías dispuesto a participar en algún programa de responsabilidad social que realice la empresa?":
      ["Si"],
    // 🔹 Salud y Seguridad 🔹
    "En general, ¿Qué tan probable es que sufras algún tipo de accidente debido al trabajo que realiza?":
      ["Nada probable", "Poco probable"],

    "En general, ¿Qué tan probable es que sufras algún tipo de enfermedad debido al trabajo que realiza?":
      ["Nada probable", "Poco probable"],

    "Las condiciones ambientales (iluminación, climatización, ventilación, espacio físico, etc.) en donde realizas tu trabajo son:":
      ["Excelentes", "Buenas"],

    // ----------------------------------->
    "Suele tomar decisiones basadas en análisis y criterios claros": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Valora y considera mis ideas y sugerencias en la toma de decisiones": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
  },
};

export const exceptions = [];

// export const TTB_RULES_2 = {
//   single_choice: {
//     default: ["De acuerdo", "Muy de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Totalmente de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Muy de acuerdo", "Totalmente de acuerdo"],
//     "Muy de acuerdo": ["De acuerdo", "Muy de acuerdo"],
//     "Muy de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
//     Bueno: ["Bueno", "Excelente"],
//     Regular: ["Bueno", "Excelente"],
//     Siempre: ["Siempre", "Frecuentemente"],
//     "Casi nunca": ["Siempre", "Frecuentemente"],
//     "Casi nunca se da": ["Nunca se ha dado", "Casi nunca se da"],
//     "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
//     "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
//     "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
//     Frecuentemente: ["Frecuentemente", "Siempre"],
//     Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
//     Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
//     "No aplica en mi caso": ["Totalmente satisfecho", "Satisfecho"],
//     "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
//     No: ["Si"],
//     Si: ["Una parte de ellas", "Si"],
//     Mucho: ["Mucho"],
//     Apropiadas: ["Apropiadas", "Algo apropiadas"],
//     "Nada apropiadas": ["Apropiadas", "Algo apropiadas"],
//     "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
//     "Algo fácil": ["Muy fácil", "Algo fácil"],
//     "Pocas veces": ["Nunca", "Pocas veces"],
//     Nunca: ["Nunca", "Pocas veces"],
//     Suficiente: ["Suficiente", "Moderada"],
//     Moderada: ["Suficiente", "Moderada"],
//     Buenas: ["Excelentes", "Buenas"],
//     "Muy Probable": ["Algo Probable", "Muy Probable"],
//     "Algo Probable": ["Algo Probable", "Muy Probable"],
//     "Bastante probable": ["Bastante probable", "Algo probable"],
//     "Nada probable": ["Nada probable", "Poco probable"],
//     "Poco probable": ["Nada probable", "Poco probable"],
//     "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
//     "Moderadamente motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
//     "Son buenos": ["Son excelentes", "Son buenos"],
//   },
//   matrix: {
//     default: ["De acuerdo", "Muy de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Totalmente de acuerdo"],
//     "De acuerdo": ["De acuerdo", "Muy de acuerdo", "Totalmente de acuerdo"],
//     "Muy de acuerdo": ["De acuerdo", "Muy de acuerdo"],
//     "Muy de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
//     Bueno: ["Bueno", "Excelente"],
//     Regular: ["Bueno", "Excelente"],
//     Siempre: ["Siempre", "Frecuentemente"],
//     "Casi nunca": ["Siempre", "Frecuentemente"],
//     "Casi nunca se da": ["Nunca se ha dado", "Casi nunca se da"],
//     "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
//     "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
//     "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
//     "Sí, aunque pocas veces lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
//     Frecuentemente: ["Frecuentemente", "Siempre"],
//     Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
//     Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
//     "No aplica en mi caso": ["Totalmente satisfecho", "Satisfecho"],
//     "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
//     No: ["Si"],
//     Si: ["Una parte de ellas", "Si"],
//     Mucho: ["Mucho"],
//     Apropiadas: ["Apropiadas", "Algo apropiadas"],
//     "Nada apropiadas": ["Apropiadas", "Algo apropiadas"],
//     "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
//     "Algo fácil": ["Muy fácil", "Algo fácil"],
//     "Pocas veces": ["Nunca", "Pocas veces"],
//     Nunca: ["Nunca", "Pocas veces"],
//     Suficiente: ["Suficiente", "Moderada"],
//     Moderada: ["Suficiente", "Moderada"],
//     Buenas: ["Excelentes", "Buenas"],
//     "Muy Probable": ["Algo Probable", "Muy Probable"],
//     "Algo Probable": ["Algo Probable", "Muy Probable"],
//     // "Algo Probable": ["Algo Probable", "Bastante probable"],
//     "Bastante probable": ["Bastante probable", "Algo probable"],
//     "Nada probable": ["Nada probable", "Poco probable"],
//     "Poco probable": ["Nada probable", "Poco probable"],
//     "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
//     "Moderadamente motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
//     "Son buenos": ["Son excelentes", "Son buenos"],
//     "Un poco inadecuadas": ["Excelentes", "Buenas"],
//     Excelentes: ["Excelentes", "Buenas"],
//     "Totalmente inadecuadas": ["Excelentes", "Buenas"],
//     "Bastante probable": ["Nada probable", "Poco probable"],
//     "Algo probable": ["Nada probable", "Poco probable"],
//   },
// };
