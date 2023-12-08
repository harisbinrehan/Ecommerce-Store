import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'harisbinrehan@gmail.com',
        pass: 'sioj kqua nzey ybqu'
      }
    });

    const info = await transporter.sendMail({
      from: 'harisbinrehan@gmail.com',
      to: email,
      subject: 'Welcome to Q-commerce',
      html: `
          <h2>Welcome to <b>Q-commerce</b></h2>
        <p>Thank you for joining <b>Q-commerce</b>. We're excited to have you as a customer.</p>
        <p>To verify your account, please click the link below:</p>
        <p> <a href='http://localhost:3000/auth/verifyUser?token=${token}'>Verify</a></p>
      <p>If you did not create an account on <b>Q-commerce</b>, you can ignore this email.</p>
        <p>Feel free to explore our website and let us know if you have any questions. Thank You!</p>
      `
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export default sendWelcomeEmail;
