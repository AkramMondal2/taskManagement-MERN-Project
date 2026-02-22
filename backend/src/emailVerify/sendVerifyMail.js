import nodemailer from "nodemailer";

export const sendVerifyMail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailConfigurations = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Hi! Please verify your email by clicking the link below:
              ${process.env.CLIENT_URL}/emailVerify/${token}
              Do not share this link with anyone.
              Thanks`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("Email Sent Successfully");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send verification email");
  }
};
