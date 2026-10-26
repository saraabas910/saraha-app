import Mailjet from 'node-mailjet';

export class MailjetProvider {
  client;
  fromEmail;
  fromName;

  constructor(config) {
    this.client = new Mailjet({
      apiKey: config.apiKey,
      apiSecret: config.apiSecret
    });
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async sendEmail(email, subject, html) {
    try {
      const result = await this.client.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: this.fromEmail,
              Name: this.fromName,
            },
            To: [
              {
                Email: email
              },
            ],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      });

      console.log('Email sent successfully:', result.body);
      return result.body;
    } catch (error) {
      console.error('Mailjet sending failed:', error.statusCode || error.message);
      throw new Error('Failed to send verification email');
    }
  }
}