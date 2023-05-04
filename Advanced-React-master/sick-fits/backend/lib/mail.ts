import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function mail(text: string): string {
  return `
  <div style="
      border:1px solid black;
      padding:20px;
      font-family:sans-serif;
      line-height:2;
      font-size:20px;
  >
    <h2> Hello there!</h2>
    <p>${text}</p>
  </div>
  `;
}

export async function sendPasswordResetToken(resetToken: string, to: string) {
  const info = await transport.sendMail({
    to,
    from: 'sandeep123gargyo@gmail.com',
    subject: 'Your Password Reset Token 😊',
    html: mail(`Your Password Reset Token is here
        <a href=${process.env.FRONTEND_URL}/reset?token=${resetToken}> Please click here to Reset</a>
    `),
  });
  console.log(info);
}
