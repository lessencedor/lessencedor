import { useState } from 'react';

const GOLD = "#B8923F";
const CREAM = "#F8F5EF";
const DARK = "#1A1A1A";
const GREY = "#6B6B6B";
const F = "'Cormorant Garamond', serif";

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const field = { background: 'transparent', border: 'none', borderBottom: `1px solid ${GOLD}40`, color: DARK, fontFamily: F, fontSize: 15, padding: '10px 0', width: '100%', outline: 'none', marginBottom: 24 };
  const label = { fontFamily: "'Arial', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: GREY, display: 'block', marginBottom: 6 };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontFamily: F, fontSize: 22, color: GOLD, marginBottom: 12 }}>Thank you.</div>
      <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: GREY }}>We will be in touch shortly.</div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Name *</label>
          <input style={field} name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
        </div>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Email *</label>
          <input style={field} type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Property / Company</label>
          <input style={field} name="company" value={form.company} onChange={handle} placeholder="Optional" />
        </div>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Area of Interest</label>
          <select style={field} name="interest" value={form.interest} onChange={handle}>
            <option value="">Select</option>
            <option value="Evaluation & Distinction">Evaluation & Distinction</option>
            <option value="Consulting">Consulting</option>
            <option value="The Sense">The Sense</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <label style={label}>Message *</label>
      <textarea style={{ ...field, minHeight: 100, resize: 'vertical' }} name="message" value={form.message} onChange={handle} placeholder="Tell us about your project or inquiry" required />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button type="submit" disabled={status === 'loading'} style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', padding: '14px 40px', cursor: 'pointer' }}>
          {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
        </button>
        {status === 'error' && <p style={{ color: '#a33', fontFamily: F, fontSize: 13, marginTop: 16 }}>Something went wrong. Please try again or email us directly.</p>}
      </div>
    </form>
  );
}
