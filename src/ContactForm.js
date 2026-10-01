import { useState } from 'react';

const GOLD = "#B08838";
const GOLD_L = "#C9A55C";
const CREAM = "#FBF6EE";
const CREAM_M = "rgba(251,246,238,0.55)";
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

  const field = {
    background: 'transparent', border: 'none', borderBottom: `1px solid ${GOLD}66`, color: CREAM,
    fontFamily: F, fontSize: 18, padding: '10px 0', width: '100%', outline: 'none', marginBottom: 26,
    borderRadius: 0, colorScheme: 'dark',
  };
  const label = {
    fontFamily: "'Arial', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
    color: CREAM_M, display: 'block', marginBottom: 6,
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontFamily: F, fontSize: 26, color: GOLD_L, marginBottom: 12 }}>Thank you.</div>
      <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: CREAM_M }}>We will be in touch shortly.</div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 580, margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Name *</label>
          <input style={field} name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
        </div>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>Email *</label>
          <input style={field} type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
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
      <textarea style={{ ...field, minHeight: 110, resize: 'vertical' }} name="message" value={form.message} onChange={handle} placeholder="Tell us about your project or inquiry" required />
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <button type="submit" disabled={status === 'loading'} style={{ background: 'transparent', border: `1px solid ${GOLD_L}`, color: GOLD_L, fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', padding: '15px 44px', cursor: 'pointer' }}>
          {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
        </button>
        {status === 'error' && <p style={{ color: '#E0A58A', fontFamily: F, fontSize: 15, marginTop: 18 }}>Something went wrong. Please try again or email us directly.</p>}
      </div>
    </form>
  );
}
