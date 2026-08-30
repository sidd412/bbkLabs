import twilio from 'twilio';

// Use environment variables or fallback values for safe initialization
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER;

// Initialize Twilio client only if credentials exist
let client: twilio.Twilio | null = null;
if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error);
  }
}

export const whatsappService = {
  sendAdminAlert: async (leadName: string, serviceNeeded: string, phone: string) => {
    if (!client || !twilioNumber || !adminNumber) {
      console.warn('Twilio credentials missing. Skipping WhatsApp alert.');
      return false;
    }

    try {
      const message = await client.messages.create({
        body: `🚨 *New Lead Alert!*\n\n*Name:* ${leadName}\n*Service:* ${serviceNeeded}\n*Phone:* ${phone}\n\nPlease check the BBK Labs CRM for more details.`,
        from: `whatsapp:${twilioNumber}`,
        to: `whatsapp:${adminNumber}`
      });
      console.log('WhatsApp alert sent successfully:', message.sid);
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp alert:', error);
      return false;
    }
  },

  sendClientWelcome: async (clientPhone: string, clientName: string) => {
    if (!client || !twilioNumber) {
      console.warn('Twilio credentials missing. Skipping client welcome message.');
      return false;
    }

    // Format phone number to international format if not already (assuming +91 for India as default for this agency)
    let formattedPhone = clientPhone;
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+91${formattedPhone}`;
    }

    try {
      const message = await client.messages.create({
        body: `Hello ${clientName}! 👋\n\nThank you for reaching out to *BBK Labs*. We have received your query and our team will contact you shortly to discuss your project.\n\nBest Regards,\nTeam BBK Labs`,
        from: `whatsapp:${twilioNumber}`,
        to: `whatsapp:${formattedPhone}`
      });
      console.log('WhatsApp welcome message sent:', message.sid);
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp welcome message:', error);
      return false;
    }
  }
};
