import * as nodemailer from 'nodemailer'
import * as Email from 'email-templates';
import * as path from "path";
import { logger } from "src/utils/logger";

export class EmailService {
  async sendMail(to: any, emailTemplate: any, data = {}) {
    if (typeof to === "string") {
      to = [to];
    }
    logger.info(`Sending "${emailTemplate}" email to ${to.join(", ")}`);

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const email = new Email({
      message: {
        from: `Sourcefy <${process.env.SMTP_USERNAME}>`
      },
      transport: transporter,
      views: {
        options: {
          extension: "ejs",
        },
      },
      preview: process.env.SMTP_PREVIEW === 'true',
      send: process.env.SMTP_SEND === 'true',
    });

    try {
      await email.send({
        template: path.join(__dirname, "templates", emailTemplate),
        message: {
          to: to,
        },
        locals: data,
      });
      logger.info(`Email sent to ${to} using template "${emailTemplate}"`);
    } catch (error) {
      logger.error(`Failed to send email: ${error.message}`);
      throw new Error("Failed to send email");
    }
  }
}
