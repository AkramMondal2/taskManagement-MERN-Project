import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyMail = async (token, email) => {
  try {
    const info = await resend.emails.send({
      from: "onboarding@resend.dev", // free testing sender
      to: email,
      subject: "Email Verification",
      html: `
        <div style="font-family:sans-serif">
          <h2>Email Verification</h2>
          <p>Please verify your email by clicking the link below:</p>
          
          <a href="${process.env.CLIENT_URL}/emailVerify/${token}" 
             style="display:inline-block;padding:10px 20px;
             background:#4CAF50;color:white;
             text-decoration:none;border-radius:5px;">
             Verify Email
          </a>

          <p>Do not share this link with anyone.</p>
          <p>Thanks</p>
        </div>
      `,
    });

    console.log("Email Sent Successfully");
    console.log(info);

    return info;

  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send verification email");
  }
};