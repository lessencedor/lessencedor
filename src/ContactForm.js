import { useState } from 'react';

const CREAM = "#FBF6EE";
const CREAM_M = "rgba(251,246,238,0.55)";
const F = "'Cormorant Garamond', serif";


const TXT = {
  en: { name:'Name', email:'Email', company:'Property / Brand', interest:'Area of Interest', message:'Message',
        phName:'Your full name', phEmail:'your@email.com', phCompany:'Optional',
        purpose:'Purpose', choose:'Please choose a purpose.',
        send:'Send', sending:'Sending...', thanks:'Thank you.', soon:'We will be in touch shortly.',
        error:'Something went wrong. Please try again or email us directly.',
        options:[
          ['Submit a Property or Experience','A few words about the property or experience you would like us to consider.','Properties and experiences may also be considered independently.'],
          ['Partnerships & Collaborations','A few words about the collaboration you have in mind.',''],
          ['Editorial','A few words about your request.',''],
          ['General Enquiries','A few words about your enquiry.','']
        ] },
  pt: { name:'Nome', email:'Email', company:'Propriedade / Marca', interest:'Área de Interesse', message:'Mensagem',
        phName:'O seu nome completo', phEmail:'o.seu@email.com', phCompany:'Opcional',
        purpose:'Propósito', choose:'Por favor escolha um propósito.',
        send:'Enviar', sending:'A enviar...', thanks:'Obrigado.', soon:'Entraremos em contacto em breve.',
        error:'Algo correu mal. Por favor tente de novo ou envie-nos um email directamente.',
        options:[
          ['Submeter uma Propriedade ou Experiência','Algumas palavras sobre a propriedade ou experiência que gostaria que considerássemos.','As propriedades e experiências podem também ser consideradas por iniciativa nossa.'],
          ['Parcerias e Colaborações','Algumas palavras sobre a colaboração que tem em mente.',''],
          ['Editorial','Algumas palavras sobre o seu pedido.',''],
          ['Pedidos de Informação','Algumas palavras sobre o seu pedido.','']
        ] }
};

export default function ContactForm({ lang }) {
  const L = TXT[lang] || TXT.en;
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [needPurpose, setNeedPurpose] = useState(false);
  const sel = L.options.find(o => o[0] === form.interest);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    if (!form.interest) { setNeedPurpose(true); return; }
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
    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(251,246,238,0.22)', color: CREAM,
    fontFamily: F, fontSize: 18, padding: '10px 0', width: '100%', outline: 'none', marginBottom: 26,
    borderRadius: 0, colorScheme: 'dark',
  };
  const label = {
    fontFamily: "'Arial', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
    color: CREAM_M, display: 'block', marginBottom: 6,
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontFamily: F, fontSize: 26, color: CREAM, marginBottom: 12 }}>{L.thanks}</div>
      <div style={{ fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: CREAM_M }}>{L.soon}</div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ maxWidth: 580, margin: '0 auto', textAlign: 'left' }}>
      <label style={label}>{L.purpose} *</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 28px', marginBottom: 10 }}>
        {L.options.map(o => {
          const on = form.interest === o[0];
          return (
            <button key={o[0]} type="button" onClick={() => { setForm({ ...form, interest: o[0] }); setNeedPurpose(false); }}
              className="rv"
              style={{ background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer', fontFamily: F, fontSize: 18, color: on ? CREAM : CREAM_M, borderBottom: on ? '1px solid rgba(251,246,238,0.6)' : '1px solid transparent', transition: 'color .3s, border-color .3s' }}>
              <h3 style={{ fontSize: 'inherit', fontWeight: 400, margin: 0 }}>{o[0]}</h3>
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: F, fontSize: 14, fontStyle: 'italic', color: needPurpose ? '#E0A58A' : CREAM_M, minHeight: 22, marginBottom: 22, transition: 'color .3s' }}>
        {needPurpose ? L.choose : (sel && sel[2]) || ''}
      </p>
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
      <div style={{ flex: '1 1 220px', maxWidth: 276 }}>
        <label style={label}>{L.company}</label>
        <input style={field} name="company" value={form.company} onChange={handle} placeholder={L.phCompany} />
      </div>
      <label style={label}>{L.message} *</label>
      <textarea style={{ ...field, minHeight: 110, resize: 'vertical' }} name="message" value={form.message} onChange={handle} placeholder={sel ? sel[1] : ''} required />
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <button type="submit" disabled={status === 'loading'} style={{ background: 'transparent', border: '1px solid rgba(251,246,238,0.45)', color: CREAM, fontFamily: F, fontSize: 14, letterSpacing: '.28em', textTransform: 'uppercase', padding: '16px 40px 15px 44px', cursor: 'pointer' }}>
          {status === 'loading' ? L.sending : L.send}
        </button>
        {status === 'error' && <p style={{ color: '#E0A58A', fontFamily: F, fontSize: 15, marginTop: 18 }}>{L.error}</p>}
      </div>
    </form>
  );
}
