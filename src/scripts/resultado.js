// Get email
let email = document.cookie.match(new RegExp(`(^| )email=([^;]+)`))?.at(2);

if (!email || email === "") {
    window.location = "/";
}

const nombres = [ "MY", "CR", "RM", "MLK", "AGR" ];
let results = [];
let max = 0;
let count = 0;

// Get answer count for each nominee
for (let nombre of nombres) {
    let re = new RegExp(nombre, "g");
    let matches = (document.cookie.match(re) || []).length;
    results.push(matches);
    count += matches;
    if (matches > max) {
        max = matches;
    }
}

// Go to main page if not all questions are answered
if (count != 8) {
    window.location = "/";
}

// Get winner
let ganador = "";

for (let i = 0; i < nombres.length; i++) {
    if (results[i] === max) {
        ganador = nombres[i];
        break;
    }
}

// Set page content
let l_name = document.getElementById("nombre-laureado");
let l_text = document.getElementById("texto-laureado");
let l_image = document.getElementById("imagen-laureado");

switch (ganador) {
case "MY":
    l_name.innerHTML = "Malala Yousafzai";
    l_text.innerHTML = "<b>Eres una persona valiente, resiliente, empática y compasiva.</b><br><br>No importa las circunstancias que enfrentes, siempre tratas de ser positiv@ y tienes la determinación que se necesita para seguir adelante.<br><br>Eres una líder natural y aunque no te des cuenta inspiras a otras personas.<br><br><b>Malala Yousafzai</b> es una activista pakistaní, mensajera de la Paz de las Naciones Unidas y la persona más joven en recibir el Premio Nobel de la Paz. Como cofundadora del Fondo Malala ayuda a construir un mundo donde todas las niñas puedan aprender y ser líderes sin sentir miedo.";
    l_image.src = "/assets/img/resultado/MY.webp";
    break;
case "CR":
    l_name.innerHTML = "Comité Internacional de la Cruz Roja";
    l_text.innerHTML = "<b>Piensas que el mundo sería un lugar mejor si en lugar de competir, nos ayudáramos entre todas las personas.</b><br><br>Eres una persona altruista y solidaria, te interesas por el bienestar de todas las personas y siempre estás dispuesta a ayudar.<br><br>La <b>Cruz Roja</b> es una organización humanitaria cuyo principal objetivo es aliviar el sufrimiento humano.<br><br>Entre su trabajo se encuentra: la asistencia en desastres, servicios de salud, la defensa del derecho internacional humanitario (DIH), los programas de sangre y donación de órganos; y la promoción del voluntariado.";
    l_image.src = "/assets/img/resultado/CR.webp";
    break;
case "RM":
    l_name.innerHTML = "Rigoberta Menchú";
    l_text.innerHTML = "<b>Eres una persona pacifista, comprometida y valiente.</b><br><br>Buscas arreglar los conflictos sin recurrir a la violencia. Y aunque se presente situaciones complicadas, nunca te rindes y siempre buscas el bienestar para todas las personas.<br><br><b>Rigoberta Menchú</b> es una activista y defensora de la paz, la justicia social y los derechos humanos de los pueblos indígenas en Guatemala.<br><br>Nació en una familia maya y durante su infancia y juventud vivió bajo una situación de pobreza, discriminación racial y violencia; condiciones que por décadas han marcado la vida de la población indígena guatemalteca.";
    l_image.src = "/assets/img/resultado/RM.webp";
    break;
case "MLK":
    l_name.innerHTML = "Martin Luther King Jr.";
    l_text.innerHTML = "<b>Eres una persona que aboga por la justicia y eres consciente de las cosas que suceden en tu entorno.</b><br><br>Luchas por lo que crees e inspiras a quienes te rodean a defender sus ideales de manera pacífica.<br><br><b>Martin Luther King Jr.</b> fue un activista estadounidense que defendió los derechos de las personas afroamericanas. <br><br>Se opuso a las políticas discriminatorias de su país y, en 1963, convocó a más de 250,000 personas en una manifestación histórica. Gracias a su esfuerzo, el presidente Johnson aprobó una ley al año siguiente que prohibía la discriminación racial en Estados Unidos.";
    l_image.src = "/assets/img/resultado/MLK.webp";
    break;
case "AGR":
    l_name.innerHTML = "Alfonso García Robles";
    l_text.innerHTML = "<b>Eres una persona visionaria, analítica y apasionada.</b><br><br>Tu mente estratégica te posiciona como líder, capaz de influir y destacar en cualquier grupo.<br><br>Con tus habilidades diplomáticas, logras alcanzar tus objetivos, siempre buscando el diálogo y la cooperación. Y sin falta antes de actuar, te tomas el tiempo necesario para analizar a fondo cada situación.<br><br><b>Alfonso García Robles</b> fue el presidente de la Comisión Preparatoria para la Desnuclearización de América Latina, cuya misión culminó con la firma del Tratado de Tlatelolco.";
    l_image.src = "/assets/img/resultado/AGR.webp";
    break;
default:
    window.location = "/";
    break;
}

// Send results email
/*emailjs.init({
    publicKey: "",
});

emailjs.send("service_n4emy45", "template_ukq7hwc", {
    to_email: email,
    l_name: l_name.innerHTML,
    l_text: l_text.innerHTML,
    l_img: `https://nobel-smmun.github.io/email/${ganador}.png`,
});*/

// Delete all cookies to reset
document.cookie.split(';').forEach(cookie_untrimmed => {
    let cookie = cookie_untrimmed.trim();
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`;
});
