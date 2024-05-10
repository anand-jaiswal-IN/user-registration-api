import nodemailer from "nodemailer";
import validator from "validator";

async function sendMail(userEmail, subject, html) {
  const transporter = nodemailer.createTransport({
    // i am using gmail mail service
    service: "Gmail",
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true if port is 465 otherwise false
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_USER_PASSWORD,
    },
  });
  try {
    if ((!userEmail, !subject, !html)) {
      throw new Error("All fields are required");
    }
    if (!validator.isEmail(userEmail)) {
      throw new Error("User Email is not valid");
    }
    const info = await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.MAIL_USER}>`,
      // from: process.env.MAIL_USER,
      to: userEmail,
      subject: subject,
      html: html,
    });

    return info;
  } catch (error) {
    throw new Error("Error Found while sending E-mail : " + error.message);
  }
}

async function sendOTPonEmail(userEmail, otp) {
  const applicationName = process.env.APP_NAME;
  const verificationUrl = "";
  const serviceLink = "";
  const subject = "Verification OTP to verify user";
  const html = `
    <p> Dear User </p>
    <p>Thank you for choosing ${applicationName} for your needs. To complete the verification process and ensure the security of your account, please use the following OTP (One-Time Password):</p>
    <h1>${otp}</h1>
    <p>Please enter this OTP in the verification section of the ${applicationName} app ${verificationUrl} within the next ${process.env.OTP_EXPIRY} milliseconds. This OTP is valid for one-time use only.</p>
    <p>If you did not request this OTP or have any concerns regarding your account security, please contact ${serviceLink}</p>
    <p>Thank you for your cooperation.</p>
    <p>Team ${applicationName}</p>
    `;
  return await sendMail(userEmail, subject, html);
}
export default sendMail;
export { sendOTPonEmail };
