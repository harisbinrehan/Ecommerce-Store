import nodemailer from 'nodemailer';

const sendResetEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 485,
      secure: false,
      auth: {
        user: 'harisbinrehan@gmail.com',
        pass: 'sioj kqua nzey ybqu'
      }
    });

    await transporter.sendMail({
      from: 'harisbinrehan@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `
      <h2>Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password of <b>Q-commerce</b>. To reset your password, please click the link below:</p>
      <p> <a href='http://localhost:3000/auth/newPassword?token=${token}'>Click Here</a></p>
      <p>If you did not request a password reset, you can ignore this email.</p>
      <p>Thank you.</p>
    `
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export default sendResetEmail;
