const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const VERIFY_TOKEN = 'caminoverde2024';

const sessions = {};

const CASOS = [
  '1️⃣ Regularización de Predio',
  '2️⃣ Herencia y Testamento',
  '3️⃣ Divorcio',
  '4️⃣ Concubinato',
  '5️⃣ Despidos (Laboral)',
  '6️⃣ Contratos',
  '7️⃣ Manutención',
  '8️⃣ Otros'
];

const VENTANAS = [
  '1️⃣ 8:00 am – 12:00 pm',
  '2️⃣ 12:00 pm – 4:00 pm',
  '3️⃣ 4:00 pm – 8:00 pm'
];

function getSession(phone) {
  if (!sessions[phone]) {
    sessions[phone] = { step: 'welcome', data: {} };
  }
  return sessions[phone];
}

function resetSession(phone) {
  sessions[phone] = { step: 'caso', data: {} };
}

function processMessage(phone, incomingMsg) {
  const session = getSession(phone);
  const msg = incomingMsg.trim();
  let response = '';

  switch (session.step) {
    case 'welcome':
    case 'inicio':
      response = `¡Hola! 👋 Bienvenido al Despacho Jurídico Camino Verde.\n\nEstoy aquí para ayudarte a agendar una llamada con el Lic. Sergio Hernández.\n\n¿Cuál es el motivo de tu consulta?\n\n${CASOS.join('\n')}\n\n_Responde con el número de tu caso._`;
      session.step = 'caso';
      break;

    case 'caso': {
      const idx = parseInt(msg) - 1;
      if (idx >= 0 && idx <= 7) {
        session.data.caso = CASOS[idx];
        response = `Entendido, ${CASOS[idx]}. ¡Gracias por contarnos! 🙏\n\n¿Me puedes dar tu *nombre completo*?`;
        session.step = 'nombre';
      } else {
        response = `Por favor responde con un número del *1 al 8* según tu caso 😊\n\n${CASOS.join('\n')}`;
      }
      break;
    }

    case 'nombre':
      session.data.nombre = msg;
      response = `Mucho gusto, *${msg}*. 🤝\n\n¿En qué *colonia o área* vives o tienes el problema?`;
      session.step = 'colonia';
      break;

    case 'colonia':
      session.data.colonia = msg;
      response = `Perfecto. Para que el abogado llegue bien preparado, ¿puedes describirme brevemente tu situación? (2 o 3 oraciones está bien 😊)`;
      session.step = 'descripcion';
      break;

    case 'descripcion':
      session.data.descripcion = msg;
      response = `Gracias por compartirlo. 🙏\n\nEl Lic. Sergio Hernández te llamará en la ventana horaria que elijas:\n\n${VENTANAS.join('\n')}\n\n_Responde con 1, 2 o 3._`;
      session.step = 'ventana';
      break;

    case 'ventana': {
      const idx = parseInt(msg) - 1;
      if (idx >= 0 && idx <= 2) {
        session.data.ventana = VENTANAS[idx];
        const d = session.data;
        response = `✅ ¡Listo, ${d.nombre}!\n\nTu solicitud está registrada:\n📋 Caso: ${d.caso}\n📍 Colonia: ${d.colonia}\n📅 Llamada: El abogado te contactará en la ventana de ${d.ventana}\n📞 Al número desde el que nos escribes\n\nTambién puedes visitarnos sin cita este *jueves de 9am a 12pm* en el Centro Comunitario Ley Cortez, junto al Centro de Justicia para la Mujer.\n\n_Despacho Jurídico Camino Verde — Hernández y Asociados 🌿_`;
        resetSession(phone);
      } else {
        response = `Por favor responde con *1, 2 o 3* según el horario que prefieras 😊\n\n${VENTANAS.join('\n')}`;
      }
      break;
    }

    default:
      resetSession(phone);
      session.step = 'caso';
      response = `¡Hola! 👋 Bienvenido al Despacho Jurídico Camino Verde.\n\n¿Cuál es el motivo de tu consulta?\n\n${CASOS.join('\n')}\n\n_Responde con el número de tu caso._`;
  }

  return response;
}

// Verificación del webhook de Meta
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado por Meta ✅');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recibir mensajes de Meta WhatsApp Cloud API
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    body.entry?.forEach(entry => {
      entry.changes?.forEach(change => {
        const value = change.value;
        if (value.messages) {
          value.messages.forEach(async message => {
            const from = message.from;
            const text = message.text?.body || '';
            console.log(`Mensaje de ${from}: ${text}`);

            const responseText = processMessage(from, text);

            // Enviar respuesta via Meta API
            const phoneNumberId = value.metadata.phone_number_id;
            const accessToken = process.env.META_ACCESS_TOKEN;

            await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: from,
                type: 'text',
                text: { body: responseText }
              })
            });
          });
        }
      });
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get('/', (req, res) => {
  res.send('Chatbot Despacho Jurídico Camino Verde — Activo ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
