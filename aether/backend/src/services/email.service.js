import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const FROM = process.env.EMAIL_FROM || 'AETHERIS <noreply@aetheris.io>';

const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #0a0a0f; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #12121a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px; }
    .logo { font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 2px; }
    h1 { color: #ffffff; font-size: 24px; margin: 20px 0 10px; }
    p { color: #9ca3af; font-size: 16px; line-height: 1.6; }
    .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; margin: 20px 0; }
    .highlight { color: #6366f1; font-weight: 600; }
    .score { font-size: 48px; font-weight: 800; color: #06b6d4; }
    .footer { text-align: center; padding: 20px; color: #4b5563; font-size: 12px; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 24px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">AETHERIS</div>
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} AETHERIS Platform. All rights reserved.</p>
      <p>AI-Powered Employee Verification & Hiring</p>
    </div>
  </div>
</body>
</html>
`;

export const sendWelcomeEmail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: 'Welcome to AETHERIS — The Future of Hiring',
      html: baseTemplate(`
        <h1>Welcome aboard, ${name}! 🚀</h1>
        <p>You've joined the most advanced AI-powered hiring platform. AETHERIS uses cutting-edge artificial intelligence to match candidates with their dream jobs.</p>
        <hr class="divider">
        <p><span class="highlight">What's next?</span></p>
        <p>• Complete your profile to boost your ATS score<br>
           • Upload your resume for AI analysis<br>
           • Browse curated job opportunities</p>
        <a href="${process.env.FRONTEND_URL}/login" class="btn">Get Started</a>
      `),
    });
  } catch (error) {
    console.error('Welcome email error:', error.message);
  }
};

export const sendVerificationEmail = async (to, name, token) => {
  try {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    console.log(`\n=========================================`);
    console.log(`📧 NEW REGISTRATION EMAIL VERIFICATION:`);
    console.log(`To: ${to}`);
    console.log(`Link: ${verifyUrl}`);
    console.log(`=========================================\n`);
    
    if (!process.env.EMAIL_USER) {
      console.log('Skipping actual email dispatch because EMAIL_USER is not set in .env.');
      return;
    }
    
    await transporter.sendMail({
      from: FROM,
      to,
      subject: 'Verify Your AETHERIS Account',
      html: baseTemplate(`
        <h1>Verify your email, ${name}</h1>
        <p>Click the button below to verify your email address and activate your account.</p>
        <a href="${verifyUrl}" class="btn">Verify Email</a>
        <p>This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
      `),
    });
  } catch (error) {
    console.error('Verification email error:', error.message);
  }
};

export const sendPasswordResetEmail = async (to, name, resetUrl) => {
  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: 'Reset Your AETHERIS Password',
      html: baseTemplate(`
        <h1>Password Reset Request</h1>
        <p>Hi ${name}, we received a request to reset your password.</p>
        <a href="${resetUrl}" class="btn">Reset Password</a>
        <p>This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
      `),
    });
  } catch (error) {
    console.error('Password reset email error:', error.message);
  }
};

export const sendApplicationUpdate = async (to, name, jobTitle, status) => {
  try {
    const statusMessages = {
      reviewed: 'Your application is being reviewed by the hiring team.',
      shortlisted: 'Congratulations! You\'ve been shortlisted for the next round.',
      rejected: 'Unfortunately, the team has decided to move forward with other candidates.',
      hired: '🎉 Congratulations! You\'ve been selected for the position!',
    };

    await transporter.sendMail({
      from: FROM,
      to,
      subject: `Application Update: ${jobTitle}`,
      html: baseTemplate(`
        <h1>Application Update</h1>
        <p>Hi ${name}, there's an update on your application for <span class="highlight">${jobTitle}</span>.</p>
        <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p>
        <p>${statusMessages[status] || 'Your application status has been updated.'}</p>
        <a href="${process.env.FRONTEND_URL}/employee/dashboard" class="btn">View Dashboard</a>
      `),
    });
  } catch (error) {
    console.error('Application update email error:', error.message);
  }
};

export const sendJobAlert = async (to, name, jobs) => {
  try {
    const jobList = jobs.map(j => `<li style="color:#9ca3af;margin:8px 0;"><span class="highlight">${j.title}</span> at ${j.companyName} — ${j.location}</li>`).join('');

    await transporter.sendMail({
      from: FROM,
      to,
      subject: `${jobs.length} New Jobs Match Your Profile — AETHERIS`,
      html: baseTemplate(`
        <h1>New Job Matches 🎯</h1>
        <p>Hi ${name}, we found ${jobs.length} new job(s) that match your skills:</p>
        <ul>${jobList}</ul>
        <a href="${process.env.FRONTEND_URL}/jobs" class="btn">View All Jobs</a>
      `),
    });
  } catch (error) {
    console.error('Job alert email error:', error.message);
  }
};

export const sendAIAnalysisComplete = async (to, name, jobTitle, matchScore) => {
  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: `AI Analysis Complete — ${matchScore}% Match for ${jobTitle}`,
      html: baseTemplate(`
        <h1>AI Analysis Complete</h1>
        <p>Hi ${name}, your resume has been analyzed for <span class="highlight">${jobTitle}</span>.</p>
        <div style="text-align:center;margin:24px 0;">
          <div class="score">${matchScore}%</div>
          <p>Match Score</p>
        </div>
        <p>Log in to view your full skill gap analysis, improvement suggestions, and interview preparation tips.</p>
        <a href="${process.env.FRONTEND_URL}/employee/dashboard" class="btn">View Full Report</a>
      `),
    });
  } catch (error) {
    console.error('AI analysis email error:', error.message);
  }
};
