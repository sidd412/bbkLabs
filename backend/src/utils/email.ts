import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_APP_PASSWORD;

let transporter: nodemailer.Transporter | null = null;

if (emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

export const emailService = {
  sendAdminAlert: async (leadData: any) => {
    if (!transporter) {
      console.warn('Email credentials missing. Skipping email alert.');
      return false;
    }

    try {
      const mailOptions = {
        from: `"BBK Labs Alerts" <${emailUser}>`,
        to: emailUser, // Send to the admin's email
        subject: `New Lead: ${leadData.name} - ${leadData.serviceNeeded}`,
        html: `
          <h2>New Lead Received!</h2>
          <p><strong>Name:</strong> ${leadData.name}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Business Type:</strong> ${leadData.businessType || 'N/A'}</p>
          <p><strong>Service Needed:</strong> ${leadData.serviceNeeded}</p>
          <p><strong>Message:</strong> ${leadData.message || 'No message provided'}</p>
          <br/>
          <a href="https://cms.bbklabs.com/leads" style="padding: 10px 15px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">View in CRM</a>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Admin email alert sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending admin email alert:', error);
      return false;
    }
  },

  sendClientWelcome: async (clientEmail: string, clientName: string) => {
    if (!transporter) {
      console.warn('Email credentials missing. Skipping client welcome email.');
      return false;
    }

    try {
      const mailOptions = {
        from: `"BBK Labs" <${emailUser}>`,
        to: clientEmail,
        subject: `Welcome to BBK Labs! We've received your query`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
            
            <h2 style="color: #2563eb; margin-bottom: 5px;">Hello ${clientName},</h2>
            <p style="font-size: 16px; margin-top: 0;"><strong>Thank you for reaching out to BBK Labs!</strong> / <strong>BBK Labs से संपर्क करने के लिए धन्यवाद!</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            
            <p>We have successfully received your consultation request. Our technical team is reviewing your requirements and we will contact you shortly to schedule a discussion.</p>
            <p style="color: #4b5563;"><em>हमने आपका अनुरोध सफलतापूर्वक प्राप्त कर लिया है। हमारी टेक्निकल टीम आपकी ज़रूरतों को समझ रही है और हम जल्द ही आपसे संपर्क करेंगे।</em></p>
            
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin-top: 0; color: #1e293b;">Why choose us? / हमें क्यों चुनें?</h3>
              <p style="margin-bottom: 0;">At BBK Labs, we specialize in building scalable software, mobile apps, and websites for modern businesses. We are excited to learn more about your project!</p>
              <p style="color: #4b5563; margin-top: 10px; margin-bottom: 0;"><em>हम आधुनिक बिज़नेस के लिए शानदार वेबसाइट, सॉफ्टवेयर और मोबाइल ऐप बनाने में माहिर हैं। हम आपके प्रोजेक्ट पर काम करने के लिए उत्सुक हैं!</em></p>
            </div>
            
            <p><strong>Need immediate assistance? (तुरंत सहायता चाहिए?)</strong></p>
            <p>You can reach us directly at / आप हमें यहाँ कॉल या WhatsApp कर सकते हैं:</p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 8px;">📞 Phone/WhatsApp: <strong>+91 91290 54029</strong></li>
              <li>🌐 Website: <a href="https://bbklabs.com" style="color: #2563eb; text-decoration: none;">www.bbklabs.com</a></li>
            </ul>
            
            <br/>
            <p>Best Regards / सादर,</p>
            <p style="margin-bottom: 5px;"><strong>Team BBK Labs</strong></p>
            <p style="margin-top: 0; color: #64748b; font-size: 14px;"><em>(Building your business via tech)</em></p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Client welcome email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending client welcome email:', error);
      return false;
    }
  }
};
