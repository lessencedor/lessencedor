import { useState, useEffect, useRef } from 'react';

const GOLD = "#B08838";
const GOLD_L = "#C9A55C";
const CREAM = "#FBF6EE";
const CREAM_M = "rgba(251,246,238,0.55)";
const F = "'Cormorant Garamond', serif";

const DEEP = "#1F150C";
const LINE = "rgba(201,165,92,0.45)";

const TXT = {
  en: { name:'Name', email:'Email', company:'Property / Brand', interest:'Area of Interest', message:'Message',
        phName:'Your full name', phEmail:'your@email.com', phCompany:'Optional', phSelect:'Select', phMessage:'Tell us about your project or inquiry',
        send:'Send Inquiry', sending:'Sending...', thanks:'Thank you.', soon:'We will be in touch shortly.',
        error:'Something went wrong. Please try again or email us directly.',
        options:['Evaluation & Distinction','Consulting','The Sense','Other'] },
  pt: { name:'Nome', email:'Email', company:'Propriedade / Marca', interest:'Área de Interesse', message:'Mensagem',
        phName:'O seu nome completo', phEmail:'o.seu@email.com', phCompany:'Opcional', phSelect:'Seleccionar', phMessage:'Fale-nos do seu projecto ou pedido',
        send:'Enviar Pedido', sending:'A enviar...', thanks:'Obrigado.', soon:'Entraremos em contacto em breve.',
        error:'Algo correu mal. Por favor tente de novo ou envie-nos um email directamente.',
        options:['Avaliação & Distinction','Consultoria','The Sense','Outro'] }
};

/* Custom select: native dropdowns ignore the palette */
function Select({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 26 }}>
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}
        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${GOLD}66`, color: value ? CREAM : CREAM_M, fontFamily: F, fontSize: 18, padding: '10px 0', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{value || placeholder}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}><path d="M1 1l5 5 5-5" fill="none" stroke={GOLD_L} strokeWidth="1.2"/></svg>
      </button>
      {open && (
        <ul role="listbox" style={{ position: 'absolute', left: 0, right: 0, top: '100%', zIndex: 20, margin: 0, padding: '6px 0', listStyle: 'none', background: DEEP, border: `1px solid ${LINE}`, boxShadow: '0 18px 40px rgba(0,0,0,0.45)' }}>
          {options.map(o => (
            <li key={o} role="option" aria-selected={value === o} onClick={() => { onChange(o); setOpen(false); }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(176,136,56,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = value === o ? 'rgba(176,136,56,0.10)' : 'transparent'; }}
              style={{ padding: '12px 16px', fontFamily: F, fontSize: 17, color: value === o ? GOLD_L : CREAM, cursor: 'pointer', background: value === o ? 'rgba(176,136,56,0.10)' : 'transparent', transition: 'background .25s' }}>
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ContactForm({ lang }) {
  const L = TXT[lang] || TXT.en;
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
      <div style={{ fontFamily: F, fontSize: 26, color: GOLD_L, marginBottom: 12 }}>{L.thanks}</div>
      <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: CREAM_M }}>{L.soon}</div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 580, margin: '0 auto', textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>{L.name} *</label>
          <input style={field} name="name" value={form.name} onChange={handle} placeholder={L.phName} required />
        </div>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>{L.email} *</label>
          <input style={field} type="email" name="email" value={form.email} onChange={handle} placeholder={L.phEmail} required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>{L.company}</label>
          <input style={field} name="company" value={form.company} onChange={handle} placeholder={L.phCompany} />
        </div>
        <div style={{ flex: '1 1 220px' }}>
          <label style={label}>{L.interest}</label>
          <Select value={form.interest} onChange={v => setForm({ ...form, interest: v })} placeholder={L.phSelect}
            options={L.options} />
        </div>
      </div>
      <label style={label}>{L.message} *</label>
      <textarea style={{ ...field, minHeight: 110, resize: 'vertical' }} name="message" value={form.message} onChange={handle} placeholder={L.phMessage} required />
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <button type="submit" disabled={status === 'loading'} style={{ background: 'transparent', border: `1px solid ${GOLD_L}`, color: GOLD_L, fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', padding: '15px 44px', cursor: 'pointer' }}>
          {status === 'loading' ? L.sending : L.send}
        </button>
        {status === 'error' && <p style={{ color: '#E0A58A', fontFamily: F, fontSize: 15, marginTop: 18 }}>{L.error}</p>}
      </div>
    </form>
  );
}
