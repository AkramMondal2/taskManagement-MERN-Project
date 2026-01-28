import nodemailer from "nodemailer";

export const sendVerifyMail = async (token, email) => {
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // App Password
    },
  });

  const mailConfigurations = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           ${process.env.CLIENT_URL}/emailVerify/${token} 
           please don't share with anyone
           Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error);
    }
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
