if (process.env.NODE_ENV !== "production") {
  const { default: dotenv } = await import("dotenv");
  dotenv.config();
}

import express from "express";
import { createTransport } from "nodemailer";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." },
});

app.use(express.static(__dirname));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (name.length > 100 || email.length > 100 || message.length > 1000) {
    return res.status(400).json({ error: "Input exceeds maximum length." });
  }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

app.get("*", (req, res) => res.sendFile("index.html", { root: __dirname }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
