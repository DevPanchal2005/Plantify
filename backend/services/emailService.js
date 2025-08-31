const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
  // Check if Gmail credentials are provided
  if (
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD &&
    process.env.EMAIL_USER.includes("@gmail.com")
  ) {
    // Use Gmail SMTP
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else if (
    process.env.EMAIL_SERVICE &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD
  ) {
    // Use other email service
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // Fallback to Ethereal Email for testing
    console.log(
      "⚠️  No email credentials found, using Ethereal Email for testing"
    );
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ethereal.user@ethereal.email",
        pass: "ethereal.pass",
      },
    });
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    console.log("📧 Attempting to send password reset email to:", email);
    console.log("🔧 Email configuration:", {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASSWORD,
      passwordLength: process.env.EMAIL_PASSWORD?.length,
    });
    console.log("🔧 Environment variables loaded:", {
      NODE_ENV: process.env.NODE_ENV,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    });

    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("✅ Email transporter verified successfully");
    } catch (verifyError) {
      console.error(
        "❌ Email transporter verification failed:",
        verifyError.message
      );
      throw new Error(`Email configuration error: ${verifyError.message}`);
    }

    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5174"
    }/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: {
        name: "Plantify Support",
        address: process.env.EMAIL_FROM || "noreply@plantify.com",
      },
      to: email,
      subject: "Password Reset Request - Plantify",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - Plantify</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Plantify</h1>
              <h2>Password Reset Request</h2>
            </div>
            <div class="content">
              <p>Hello ${userName || "Plant Lover"},</p>
              
              <p>We received a request to reset your password for your Plantify account. If you didn't make this request, you can safely ignore this email.</p>
              
              <p>To reset your password, click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset My Password</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">
                ${resetUrl}
              </p>
              
              <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul>
                  <li>This link will expire in 1 hour for security reasons</li>
                  <li>You can only use this link once</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                </ul>
              </div>
              
              <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
              
              <p>Happy planting! 🌿</p>
              <p><strong>The Plantify Team</strong></p>
            </div>
            <div class="footer">
              <p>This email was sent from Plantify. If you have any questions, please contact our support team.</p>
              <p>&copy; ${new Date().getFullYear()} Plantify. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${userName || "Plant Lover"},
        
        We received a request to reset your password for your Plantify account.
        
        To reset your password, visit this link: ${resetUrl}
        
        This link will expire in 1 hour for security reasons.
        
        If you didn't request this reset, please ignore this email.
        
        Happy planting!
        The Plantify Team
      `,
    };

    console.log("📤 Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Password reset email sent successfully:", info.messageId);

    // For development, log the preview URL
    if (process.env.NODE_ENV !== "production") {
      console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl:
        process.env.NODE_ENV !== "production"
          ? nodemailer.getTestMessageUrl(info)
          : null,
    };
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });

    // Provide more specific error messages
    if (error.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Please check your email credentials."
      );
    } else if (error.code === "ECONNECTION") {
      throw new Error(
        "Failed to connect to email server. Please check your internet connection."
      );
    } else if (error.responseCode === 535) {
      throw new Error(
        "Invalid email credentials. Please check your email and app password."
      );
    } else {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  }
};

// Send welcome email (bonus feature)
const sendWelcomeEmail = async (email, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: "Plantify Team",
        address: process.env.EMAIL_FROM || "welcome@plantify.com",
      },
      to: email,
      subject: "Welcome to Plantify! 🌱",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Plantify</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Welcome to Plantify!</h1>
            </div>
            <div class="content">
              <p>Hello ${userName},</p>
              
              <p>Welcome to the Plantify family! We're thrilled to have you join our community of plant lovers.</p>
              
              <p>🌿 <strong>What you can do with Plantify:</strong></p>
              <ul>
                <li>Browse our extensive collection of beautiful plants</li>
                <li>Get expert care instructions for each plant</li>
                <li>Build your wishlist of dream plants</li>
                <li>Track your orders and deliveries</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${
                  process.env.FRONTEND_URL || "http://localhost:5174"
                }" class="button">Start Shopping</a>
              </div>
              
              <p>Happy planting! 🌱</p>
              <p><strong>The Plantify Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw error for welcome email - it's not critical
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendWelcomeEmail,
};
