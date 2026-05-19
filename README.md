# Chatbot WhatsApp — Despacho Jurídico Camino Verde

Chatbot automático para WhatsApp Business via Twilio. Atiende clientes, clasifica casos y agenda llamadas con el Lic. Sergio Hernández.

## Flujo del chatbot

1. Bienvenida y menú de casos
2. Clasificación del caso (1-8)
3. Nombre completo del cliente
4. Colonia o área
5. Descripción breve del problema
6. Ventana horaria para la llamada
7. Confirmación de cita

## Instalación local

```bash
npm install
npm start
```

## Deploy en Vercel

1. Conecta este repositorio en vercel.com
2. Vercel detecta automáticamente la configuración
3. Copia la URL generada
4. Pégala en Twilio como Webhook URL

## Configuración en Twilio

- Webhook URL: `https://tu-proyecto.vercel.app/webhook`
- Método: HTTP POST
