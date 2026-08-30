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
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello ${clientName},</h2>
            <p>Thank you for reaching out to <strong>BBK Labs</strong>!</p>
            <p>We have successfully received your consultation request. Our technical team is reviewing your requirements and we will contact you shortly to schedule a discussion.</p>
            <p>At BBK Labs, we specialize in building scalable software, mobile apps, and websites for modern businesses. We are excited to learn more about your project!</p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Team BBK Labs</strong></p>
            <p><a href="https://bbklabs.com">bbklabs.com</a></p>
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
