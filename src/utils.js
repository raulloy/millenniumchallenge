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
    "¿Consideras que la empresa cumple con sus promesas?": ["Totalmente de acuerdo", "De acuerdo"],
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

    "¿Cómo describirías el ambiente laboral en la empresa?": ["Positivo"],

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
    // --------------- Compromiso, Bienestar y Pertenencia -------------------->
    "Me siento apoyado(a) por mi jefe inmediato en mi desarrollo integral": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi jefe inmediato me motiva a crecer y aprovechar las oportunidades para desarrollarme": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi jefe se interesa genuinamente por mí como persona, más allá de mi rol/puesto en la empresa":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa invierte en mi crecimiento y desarrollo, tanto personal como profesional": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "La empresa me invita a crecer y a desarrollarme, aprovechando o creando sobre las oportunidades existentes.":
      ["Totalmente de acuerdo", "De acuerdo"],

    // --------------- Compromiso, Bienestar y Pertenencia -------------------->
    "La empresa cumple con las normativas de salud y seguridad laboral aplicables": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "He recibido la capacitación necesaria para prevenir accidentes y enfermedades producto del desempeño de mis funciones":
      ["Muy satisfecho", "Satisfecho"],
    "La empresa realiza inspecciones o revisiones periódicas para garantizar la seguridad en mi lugar de trabajo":
      ["Muy satisfecho", "Satisfecho"],
    "Estoy informado(a) sobre los riesgos asociados a mi puesto de trabajo y las medidas para mitigarlos":
      ["Muy satisfecho", "Satisfecho"],
    "Las condiciones ergonómicas de mi puesto de trabajo (mobiliario, postura, equipos, herramientas) son adecuadas para prevenir molestias o lesiones físicas.":
      ["Muy satisfecho", "Satisfecho"],
    "Las condiciones físicas de mi lugar de trabajo (iluminación, espacio, ventilación, etc.) son adecuadas para realizar mis labores":
      ["Muy satisfecho", "Satisfecho"],
    "Mi lugar de trabajo es seguro para realizar mi trabajo/funciones": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "La empresa implementa suficientes medidas para prevenir accidentes y enfermedades laborales": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "¿Qué molestias físicas o emocionales has experimentado debido a las condiciones de tu puesto de trabajo? (Selecciona todas las que apliquen).":
      ["Ninguna de las anteriores"],
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
    "Conozco y comprendo la misión y visión de esta empresa.": ["Muy de acuerdo", "De acuerdo"],
    "Estoy satisfecho(a) con las políticas, reglamentos y prácticas de esta empresa.": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Siento que los valores de esta empresa se reflejan en las acciones del día a día": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
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
    "El ambiente de trabajo está libre de cualquier tipo de discriminación": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "No he experimentado ni observado hostigamiento laboral": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "No he experimentado ni observado acoso sexual": ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa cumple con valores éticos en su forma de hacer negocios.": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "¿Consideras que la empresa cumple con sus promesas?": ["Muy de acuerdo", "De acuerdo"],
    "¿Consideras que la empresa fomenta una política de flexibilidad laboral (horarios, días libres, vacaciones) adecuada para sus colaboradores?":
      ["Totalmente de acuerdo", "De acuerdo"],
    "No he experimentado ni observado discriminación por raza": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "No he experimentado ni observado discriminación por edad": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "No he experimentado ni observado discriminación por sexo": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "No he experimentado ni observado discriminación por discapacidad": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "La empresa promueve la creatividad y la innovación entre los trabajadores": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Tus ideas y sugerencias son valoradas y consideradas para la mejora de los procesos o productos en la empresa":
      ["Totalmente de acuerdo", "De acuerdo"],
    "Consideras que la empresa apoya la toma de riesgos calculados y la experimentación en nuevos proyectos o ideas":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa proporciona las herramientas y recursos necesarios para fomentar la creatividad e innovación en tu equipo de trabajo":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa tiene una alta capacidad para adaptarse rápidamente a los cambios en el entorno laboral o del mercado":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa tiene una alta capacidad para adaptarse rápidamente a los cambios en el entorno laboral o del mercado":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa apoya a sus trabajadores en tiempos de incertidumbre o crisis, brindando las herramientas necesarias para que puedan adaptarse a los cambios":
      ["Totalmente de acuerdo", "De acuerdo"],
    "Los líderes de la empresa tienen una actitud resiliente frente a los desafíos y son un modelo a seguir en momentos difíciles.":
      ["Totalmente de acuerdo", "De acuerdo"],
    "Me siento respaldado por la empresa para adaptarme a nuevas formas de trabajo o cambios en las políticas, procedimientos y procesos.":
      ["Totalmente de acuerdo", "De acuerdo"],
    "¿Cuentas con la cantidad de información necesaria para desempeñar tus funciones de manera efectiva?":
      ["Muy de acuerdo", "De acuerdo"],
    "Cuento con las herramientas y los recursos necesarios para desempeñar mis funciones de manera eficiente":
      ["Totalmente de acuerdo", "De acuerdo"],
    "Las herramientas y los recursos proporcionados por la empresa son suficientes para cumplir con mis responsabilidades laborales":
      ["Totalmente de acuerdo", "De acuerdo"],
    "El mantenimiento y disponibilidad de las herramientas y los recursos de trabajo son adecuados":
      ["Totalmente de acuerdo", "De acuerdo"],
    "En mi equipo de trabajo puedo admitir errores sin temor a represalias o críticas": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "En mi equipo de trabajo puedo admitir errores sin temor a represalias o críticas": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "En mi equipo de trabajo se pueden discutir desacuerdos de manera constructiva": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Mis compañeros de trabajo confían plenamente en mí y en mis capacidades": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "En las reuniones se abordan temas importantes sin temor al conflicto que pudieran generar": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Considero que mi opinión es valorada cuando realizamos proyectos en equipo": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Considero que los desacuerdos en mi equipo de trabajo se enfocan en ideas y no en personas, es decir, no se toman de manera personal":
      ["Muy de acuerdo", "De acuerdo"],
    "Puedo pedir ayuda a mis compañeros de trabajo sin sentirte juzgado(a)": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Todos los miembros del equipo de trabajo están alineados con los objetivos establecidos": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Mis compañeros de trabajo están comprometidos con hacer un trabajo de calidad": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Las decisiones tomadas en el equipo se comunican de manera clara y sin ambigüedades": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Mis compañeros de trabajo asumen la responsabilidad de sus tareas sin excusas": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "La relación entre los diferentes departamentos facilita el trabajo en equipo": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Se reconocen y discuten las responsabilidades individuales en las reuniones de tu equipo": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Los objetivos del equipo de trabajo están por encima de los intereses individuales.": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Todos los miembros del equipo de trabajo se esfuerzan por alcanzar las metas colectivas": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "En mi equipo se reconocen los logros colectivos por encima de los individuales": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Fomenta un ambiente de confianza y motivación en mi equipo de trabajo": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Identifica y aprovecha mis fortalezas en las tareas asignadas": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Me apoya en momentos en los que enfrento retos laborales significativos": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Explica claramente las tareas y expectativas asociadas a mi rol/puesto de trabajo": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Está abierto(a) a escuchar críticas constructivas y sugerencias de mejora": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "Promueve un ambiente donde la comunicación fluye de manera efectiva entre los miembros del equipo":
      ["Muy de acuerdo", "De acuerdo"],
    "Fomenta y facilita la comunicación y colaboración con otros departamentos.": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "¿Qué tan apropiadas han sido las sanciones disciplinarias que te han aplicado?": [
      "Algo apropiadas",
      "Muy apropiadas",
    ],
    "Igualdad de género": ["Siempre", "Frecuentemente"],
    Transparencia: ["Siempre", "Frecuentemente"],
    Calidad: ["Siempre", "Frecuentemente"],
    Responsabilidad: ["Siempre", "Frecuentemente"],
    Solidaridad: ["Siempre", "Frecuentemente"],
    Tolerancia: ["Siempre", "Frecuentemente"],
    "Sentido de Pertenencia": ["Siempre", "Frecuentemente"],

    "Murales informativos": ["Excelente", "Bueno"],
    Zoom: ["Excelente", "Bueno"],
    WhatsApp: ["Excelente", "Bueno"],
    "Correos electrónicos": ["Excelente", "Bueno"],
    Internet: ["Excelente", "Bueno"],
    Celulares: ["Excelente", "Bueno"],
    "Teléfonos /línea directa": ["Excelente", "Bueno"],
    "Radios de Comunicación": ["Excelente", "Bueno"],

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
    // --------------- Compromiso, Bienestar y Pertenencia -------------------->
    "Me siento apoyado(a) por mi jefe inmediato en mi desarrollo integral": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi jefe inmediato me motiva a crecer y aprovechar las oportunidades para desarrollarme": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi jefe se interesa genuinamente por mí como persona, más allá de mi rol/puesto en la empresa":
      ["Totalmente de acuerdo", "De acuerdo"],
    "La empresa invierte en mi crecimiento y desarrollo, tanto personal como profesional": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "La empresa me invita a crecer y a desarrollarme, aprovechando o creando sobre las oportunidades existentes.":
      ["Totalmente de acuerdo", "De acuerdo"],

    // --------------- Compromiso, Bienestar y Pertenencia -------------------->
    "La empresa cumple con las normativas de salud y seguridad laboral aplicables": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "He recibido la capacitación necesaria para prevenir accidentes y enfermedades producto del desempeño de mis funciones":
      ["Muy satisfecho", "Satisfecho"],
    "La empresa realiza inspecciones o revisiones periódicas para garantizar la seguridad en mi lugar de trabajo":
      ["Muy satisfecho", "Satisfecho"],
    "Las condiciones ergonómicas de mi puesto de trabajo (mobiliario, postura, equipos, herramientas) son adecuadas para prevenir molestias o lesiones físicas.":
      ["Muy satisfecho", "Satisfecho"],
    "Las condiciones físicas de mi lugar de trabajo (iluminación, espacio, ventilación, etc.) son adecuadas para realizar mis labores":
      ["Muy satisfecho", "Satisfecho"],
    "Mi lugar de trabajo es seguro para realizar mi trabajo/funciones": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "La empresa implementa suficientes medidas para prevenir accidentes y enfermedades laborales": [
      "Muy satisfecho",
      "Satisfecho",
    ],
    "¿Qué molestias físicas o emocionales has experimentado debido a las condiciones de tu puesto de trabajo? (Selecciona todas las que apliquen).":
      ["Ninguna de las anteriores"],
    "Te han presentado por escrito las funciones o responsabilidades de tu puesto.": [
      "Sí",
      "Sí, parcialmente",
    ],
    "Tienes claro cuáles son los principales objetivos que debes lograr en tu puesto de trabajo.": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "¿Consideras que lo que haces en tu trabajo es importante para la empresa?": [
      "Muy de acuerdo",
      "De acuerdo",
    ],
    "En general, ¿qué tanto te gusta el trabajo que realizas en esta empresa?": [
      "Me gusta mucho",
      "Me gusta",
    ],
    "En general, ¿qué tan motivado(a) te sientes con tu trabajo?": [
      "Muy motivado",
      "Algo motivado",
    ],
    "¿Qué tan satisfecho(a) te sientes con tu desempeño en el trabajo?": [
      "Muy satisfecho",
      "Algo satisfecho",
    ],
    "¿Te consideras una persona enérgica y dinámica dentro de la empresa?": [
      "Siempre",
      "Frecuentemente",
    ],
    "¿Te gustaría recibir algún tipo de capacitación especial/específica u otra oportunidad de desarrollo personal y profesional?":
      ["Si"],
    "¿Qué tan satisfecho(a) te sientes con el tiempo que pasas y la convivencia que se da en esta empresa?":
      ["Muy satisfecho", "Algo satisfecho"],
    "Con respecto a tu compensación (salario), indica tu grado de acuerdo o desacuerdo con las siguientes afirmaciones:":
      ["Totalmente de acuerdo", "De acuerdo"],
    "¿Cómo describirías el ambiente laboral en la empresa?": ["Positivo"],
    "Mi salario es acorde con la cantidad y el tipo de trabajo que realizo": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi salario es acorde con la calidad y cantidad del desempeño que demuestro día a día": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Mi salario es equitativo en relación con lo que devengan otros compañeros en posiciones similares":
      ["Totalmente de acuerdo", "De acuerdo"],
    "Mi salario es acorde con lo que se está pagando en el mercado local en posiciones similares": [
      "Totalmente de acuerdo",
      "De acuerdo",
    ],
    "Agasajo de fin de año": ["Totalmente satisfecho", "Satisfecho"],
    "Celebración de Cumpleaños": ["Totalmente satisfecho", "Satisfecho"],
    "Flexibilidad de horario los sábados": ["Totalmente satisfecho", "Satisfecho"],
    "Permisos para temas personales": ["Totalmente satisfecho", "Satisfecho"],
    "Días libres por duelo": ["Totalmente satisfecho", "Satisfecho"],
    "Celebración del Día de la Madre": ["Totalmente satisfecho", "Satisfecho"],
    "Celebración del Día del Padre": ["Totalmente satisfecho", "Satisfecho"],
    "Aguinaldo de Navidad": ["Totalmente satisfecho", "Satisfecho"],
    "Seguro de vida y salud": ["Totalmente satisfecho", "Satisfecho"],
    "Prima de producción": ["Totalmente satisfecho", "Satisfecho"],
    Estrés: ["Siempre", "Frecuentemente"],
    "Enfado/Ira": ["Siempre", "Frecuentemente"],
    Preocupación: ["Siempre", "Frecuentemente"],
    Tristeza: ["Siempre", "Frecuentemente"],
    Soledad: ["Siempre", "Frecuentemente"],
    Alegría: ["Siempre", "Frecuentemente"],
    "¿Estás satisfecho(a) con la flexibilidad laboral (horarios, días libres, vacaciones) que te ofrece la empresa?":
      ["Muy satisfecho", "Algo satisfecho"],
    "Mis esfuerzos y logros son reconocidos": ["Siempre", "Frecuentemente"],
    "Ofrece a los trabajadores apoyo emocional en situaciones de estrés o dificultad": [
      "Siempre",
      "Frecuentemente",
    ],
    "Ofrece a los trabajadores apoyo emocional en situaciones de estrés o dificultad": [
      "Totalmente satisfecho",
      "Satisfecho",
    ],
    "Las condiciones ergonómicas de mi puesto de trabajo (mobiliario, postura, equipos, herramientas) son adecuadas para prevenir molestias o lesiones físicas.":
      ["Totalmente satisfecho", "Satisfecho"],
    "Mi lugar de trabajo es seguro para realizar mi trabajo/funciones": [
      "Totalmente satisfecho",
      "Satisfecho",
    ],
    "La empresa implementa suficientes medidas para prevenir accidentes y enfermedades laborales": [
      "Totalmente satisfecho",
      "Satisfecho",
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
