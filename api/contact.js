import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, interest, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'L\'Essence d\'Or <onboarding@resend.dev>',
      to: 'contact@lessencedor.com',
      subject: `New enquiry — ${interest || 'General'} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #B8923F; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; font-size: 14px;">New Enquiry — L'Essence d'Or</h2>
          <hr style="border: none; border-top: 1px solid #B8923F; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company / Property:</strong> ${company || '—'}</p>
          <p><strong>Interest:</strong> ${interest || '—'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Sent from the lessencedor.com contact form.</p>
        </div>
      `,
      replyTo: email,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
