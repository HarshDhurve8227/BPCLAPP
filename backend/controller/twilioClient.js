import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendWhatsAppToManager = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${to}`
    });
    console.log(`✅ WhatsApp sent to ${to}`);
  } catch (error) {
    console.error('❌ WhatsApp sending failed:', error.message);
  }
};
