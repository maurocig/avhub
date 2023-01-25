const twilio = require('twilio');
const logger = require('../logger');

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP,
  TWILIO_PHONE_NUMBER,
} = require('../../config');

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendCheckoutWhatsapp = async (userEmail, phoneNumber) => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: `Nuevo pedido de ${userEmail}`,
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${phoneNumber}`,
    });
  } catch (error) {
    logger.error(error);
  }
};

const sendCheckoutSMS = async (userEmail, phoneNumber) => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: `Su pedido a nombre de ${userEmail} fue recibido y está siendo procesado`,
      from: TWILIO_PHONE_NUMBER,
      to: `+${phoneNumber}`,
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { sendCheckoutWhatsapp, sendCheckoutSMS };
