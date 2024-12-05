import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (toEmail, name, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDMAIL_USER, // Use environment variables with consistent naming
      pass: process.env.SENDMAIL_PASS,
    },
  });

  const mailOption = {
    from: '"Test" <arunmaster335@gmail.com>', // Display sender's name and email
    to: toEmail, // Recipient's email
    subject: "Welcome to Our Platform!", // Email subject
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
          }
          .content h1 {
            color: #333333;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .content p {
            color: #555555;
            margin-bottom: 20px;
          }
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }
          .footer {
            background-color: #f4f4f4;
            color: #888888;
            text-align: center;
            padding: 10px;
            font-size: 14px;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            Welcome to Our Platform!
          </div>
          <div class="content">
            <h1>Hello, ${name}!</h1>
            <p>
              Thank you for signing up for our platform. We are excited to have you on board!
            </p>
            <p>
              To get started, click the button below to verify your email address and complete your registration:
            </p>
            <div style="text-align: center;">
              <a href="${verificationLink}" class="cta-button">Verify Email</a>
            </div>
            <p>
              If you did not sign up for this account, please disregard this email.
            </p>
            <p>Best Regards,<br>The Team</p>
          </div>
          <div class="footer">
            <p>
              © 2024 Your Company. All rights reserved. <br>
              Need help? <a href="mailto:support@example.com">Contact Support</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
