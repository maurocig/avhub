const twilio = require('twilio');
const logger = require('../../middleware/logger');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP } = require('../../config');

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendWhatsapp = async (message, number) => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: `${message}`,
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${number}`,
    });
    logger.info(messageResponse);
  } catch (error) {
    logger.error(error);
  }
};

const sendCheckoutWhatsapp = async (userEmail, number) => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: `Nuevo pedido de ${userEmail}`,
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${number}`,
    });
    logger.info(messageResponse);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { sendCheckoutWhatsapp };
