import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Resend with API Key from environment
  const resend = new Resend(process.env.RESEND_API_KEY);

  app.use(express.json());

  // API Contact Route
  app.post('/api/contact', async (req, res) => {
    const { name, email, category, vision } = req.body;

    if (!name || !email || !vision) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Note: Resend requires a verified domain for production. 
      // During testing, you can use 'onboarding@resend.dev'.
      const { data, error } = await resend.emails.send({
        from: 'Koon-Tet Portfolio <onboarding@resend.dev>',
        to: ['sendrarandrianasolo@gmail.com'],
        subject: `New Inquiry from ${name} - ${category}`,
        html: `
          <h1>New Inquiry from Portfolio</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Vision:</strong></p>
          <p>${vision.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // API Booking Route
  app.post('/api/book', async (req, res) => {
    const { name, email, notes, date, sessionType } = req.body;

    if (!name || !email || !sessionType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Koon-Tet Booking <onboarding@resend.dev>',
        to: ['sendrarandrianasolo@gmail.com'],
        subject: `NEW BOOKING REQUEST: ${sessionType} - ${name}`,
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Session Type:</strong> ${sessionType}</p>
          <p><strong>Requested Date:</strong> ${date}</p>
          <p><strong>Notes / Vision:</strong></p>
          <p>${(notes || 'None provided').replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send booking email' });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('Booking server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
