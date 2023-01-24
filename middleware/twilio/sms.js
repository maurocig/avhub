const twilio = require('twilio');
const logger = require('../logger');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require('../../config');

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async () => {
  try {
    const messageResponse = await twilioClient.messages.create({
      body: 'Hola! SMS desde Node.js',
      from: TWILIO_PHONE_NUMBER,
      to: '+59897467535',
    });
    logger.info(messageResponse);
  } catch (error) {
    logger.error(error);
  }
};

sendSMS();
