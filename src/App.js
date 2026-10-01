import { useState, useEffect, useRef } from "react";
import ContactForm from './ContactForm';

/* Palette: dark chocolate system */
const DEEP = "#1F150C";      // deepest: hero veil, footer
const CHOC = "#2D1F12";      // dark chocolate (base)
const COCOA = "#3B2A19";     // bitter cocoa, lifted panels
const GOLD = "#B08838";      // matte gold
const GOLD_L = "#C9A55C";    // gold for text on dark
const CREAM = "#FBF6EE";
const CREAM_D = "rgba(251,246,238,0.74)";
const CREAM_M = "rgba(251,246,238,0.5)";
const LINE = "rgba(176,136,56,0.28)";
const F = "'Cormorant Garamond', serif";

const MARK_URL = "/mark.svg";
const LOGO_URL = "/logo.svg";

/* Matte foil: low-contrast metallic gradient, very slow drift */
const FOIL = "linear-gradient(115deg,#8A6828 0%,#C4A057 30%,#A98334 52%,#CDAA60 74%,#92702C 100%)";

const T = {
  en: {
    nav:["About","Dimensions","Services","Founder","Approach","Distinction","Symbol","Contact"],
    ids:["about","dimensions","services","founder","approach","distinction","symbol","contact"],
    sig:"The invisible measure.",
    tag:"The Invisible Measure",
    watch:"Watch the Film",
    abt:"What We Do",
    ab1:"L’Essence d’Or is an independent evaluation and elevation programme for luxury experiences. We measure what traditional systems do not: the invisible quality of an experience: how it is felt, sustained and remembered.",
    ab2:"We work with properties and brands that understand that true excellence is not defined by infrastructure, price or aesthetic alone, but by the depth of presence, anticipation and care that shapes every moment.",
    ab3:"Our work spans three areas: qualitative evaluation against a proprietary framework of five dimensions, confidential consulting for properties seeking elevation, and formation programmes that transform teams from within.",
    ab4:"The L’Essence d’Or Distinction is awarded to those who demonstrate sustained excellence across all dimensions. It is not systematically given. It is earned.",
    vc:"It is not perfection we seek, but presence, consistency and intention.",
    dt:"The Five Dimensions",
    di:"We evaluate what others do not. Five interconnected dimensions that capture not only what is visible, but what is felt and what endures.",
    dims:[
      {n:"I",nm:"The Seen",s:"Visible Quality",d:"Aesthetics, materiality, mise en place, visual coherence, lighting, presentation and operational fluidity."},
      {n:"II",nm:"The Felt",s:"Invisible Quality",d:"Atmosphere, rhythm, anticipation, sensory calibration, density of experience and the sensation of care before it is ever requested."},
      {n:"III",nm:"The Human",s:"Relational Quality",d:"Posture, listening, contextual reading, discretion, calibrated empathy, personalisation and elegance in every interaction."},
      {n:"IV",nm:"The Rooted",s:"Cultural Quality",d:"Authenticity, sense of place, heritage, narrative coherence, sophistication without displacement."},
      {n:"V",nm:"The Sustained",s:"Systemic Quality",d:"Internal standards, consistency, continuous training, leadership culture, resilience and commitment to elevation."}
    ],
    ft:"For",
    fwho:["Luxury Hotels & Resorts","Private Aviation","Yachting & Superyachts","Private Members’ Clubs","Wellness Retreats","Fine Dining Destinations"],
    st:"Our Services",
    sh:"Three ways to work with us.",
    svcs:[
      {t:"Evaluation & Distinction",d:"A rigorous, multi-layered assessment of your experience against the five dimensions. Combines documentary analysis, anonymous mystery experience, on-site observation and team dialogue. Culminates in a confidential report and, where merited, the L’Essence d’Or Distinction."},
      {t:"Consulting",d:"For properties and brands that aspire to elevation but are not yet ready for formal evaluation. We work alongside leadership to identify gaps, redesign service philosophy and build the internal culture that sustains excellence."},
      {t:"The Sense",d:"Formation programmes that transform teams. From executive immersions for leadership to sensorial workshops for operational teams. We do not train people what to do. We transform how they see, feel and respond."}
    ],
    sn:"The Distinction programme is currently in its inaugural phase and operates by invitation. Consulting and The Sense programmes are available upon request.",
    at:"The Approach",
    ah:"Rigour beneath restraint.",
    steps:[
      {n:"01",t:"Invitation",d:"We begin with alignment. Properties and experiences are assessed for compatibility with the Method before any evaluation begins."},
      {n:"02",t:"Evaluation",d:"A multi-layered process combining documentary analysis, anonymous experiential assessment, technical observation and structured dialogue with teams."},
      {n:"03",t:"Report",d:"A confidential dossier delivered exclusively to leadership: analysis by dimension, recognition of strengths and concrete recommendations for elevation."},
      {n:"04",t:"Distinction",d:"Awarded only when sustained excellence is confirmed across all five dimensions. Not all will receive it. Most will not."}
    ],
    dst:"The Distinction",
    dsh:"Most luxury is designed. Very little is truly understood.",
    dsb:"The L’Essence d’Or Distinction is not systematically awarded. It is granted only when the panel confirms sustained depth across all five dimensions.",
    dsc:"The Distinction is not pursued. It is recognised.",
    gkt:"Our Symbol",
    gks1:"The Ginkgo Biloba is over 200 million years old. The oldest living tree on earth. It survived ice ages, mass extinctions, fires and catastrophes that erased entire species. In Hiroshima, six ginkgo trees standing less than two kilometres from the epicentre sprouted again the following spring. In Eastern philosophy, the ginkgo symbolises longevity, resilience, hope and inner peace.",
    gks2:"Its leaf, two symmetrical lobes joined at a single point, embodies the balance of dualities: visible and invisible, tangible and felt, form and essence. Yin and yang. Not in opposition, but in quiet harmony.",
    gks3:"In autumn, the ginkgo leaf turns gold. Its most beautiful moment is precisely when it prepares to let go. It does not cling. It transforms.",
    gks4:"This is why the ginkgo is our symbol. Like the excellence we seek, it is not visible at first glance, but it sustains everything built upon it.",
    gk:[
      {t:"Luxury is not what you see.",b:true},
      {t:"It is what you sense, and what remains.",b:true},
      {t:"",b:false},
      {t:"We do not measure moments.",b:false},
      {t:"We measure what remains after them.",b:false},
      {t:"",b:false},
      {t:"This is the spirit of L’Essence d’Or.",b:true}
    ],

    fdt:"The Founder",
    fd1:"Ana Cunha is a luxury strategist and curator of destination experiences operating at the intersection of hospitality, brand ecosystems and experiential design.",
    fd2:"With advanced education in Luxury Brand Management from ISEG Executive Education and international exposure across leading luxury destinations including Paris, London, Venice, Lake Como and Dubai, her perspective bridges strategic clarity with refined aesthetics and a deep understanding of how luxury is perceived, felt and remembered.",
    fd3:"Recognised as Best Luxury Event Planner in Portugal at the Luxury Lifestyle Awards 2026, and with multiple international distinctions, her work combines advisory, creative direction and experiential design for high-end hospitality clients and premium brands.",
    fd4:"Her background in pharmaceutical sciences brings an uncommon dimension to her approach: analytical rigour, precision and structured methodology applied to the art of luxury experiences.",
    fd5:"L’Essence d’Or is the natural evolution of over a decade of work at the highest level of experiential luxury: a framework that measures what others cannot.",
    cta:"Request a Confidential Conversation",
    ce:"For enquiries",
    fo:"Based in Europe, serving excellence worldwide.",
    cr:"© 2026 L’Essence d’Or. All rights reserved."
  },
  pt: {
    nav:["Sobre","Dimensões","Serviços","Fundadora","Abordagem","Distinção","Símbolo","Contacto"],
    ids:["about","dimensions","services","founder","approach","distinction","symbol","contact"],
    sig:"A medida invisível.",
    tag:"The Invisible Measure",
    watch:"Ver o Filme",
    abt:"O Que Fazemos",
    ab1:"L’Essence d’Or é um programa independente de avaliação e elevação de experiências de luxo. Medimos o que os sistemas tradicionais não medem: a qualidade invisível de uma experiência: como é sentida, sustentada e recordada.",
    ab2:"Trabalhamos com propriedades e marcas que compreendem que a verdadeira excelência não se define pela infraestrutura, pelo preço ou pela estética, mas pela profundidade da presença, antecipação e cuidado que moldam cada momento.",
    ab3:"O nosso trabalho abrange três áreas: avaliação qualitativa com base num framework proprietário de cinco dimensões, consultoria confidencial para propriedades que procuram elevação, e programas de formação que transformam equipas a partir de dentro.",
    ab4:"A Distinction de L’Essence d’Or é atribuída a quem demonstra excelência sustentada em todas as dimensões. Não é dada sistematicamente. É conquistada.",
    vc:"Não procuramos a perfeição. Procuramos presença, consistência e intenção.",
    dt:"As Cinco Dimensões",
    di:"Avaliamos o que os outros não avaliam. Cinco dimensões interligadas que captam não apenas o que é visível, mas o que é sentido e o que permanece.",
    dims:[
      {n:"I",nm:"The Seen",s:"Qualidade Visível"},
      {n:"II",nm:"The Felt",s:"Qualidade Invisível"},
      {n:"III",nm:"The Human",s:"Qualidade Relacional"},
      {n:"IV",nm:"The Rooted",s:"Qualidade Cultural"},
      {n:"V",nm:"The Sustained",s:"Qualidade Sistémica"}
    ],
    ft:"Para",
    fwho:["Hotéis de Luxo & Resorts","Aviação Privada","Yachting & Superiates","Clubes Privados","Retiros de Wellness","Destinos Gastronómicos"],
    st:"Os Nossos Serviços",
    sh:"Três formas de trabalhar connosco.",
    svcs:[
      {t:"Avaliação & Distinction",d:"Uma avaliação rigorosa e multi-camada da sua experiência face às cinco dimensões. Combina análise documental, mystery experience anónima, observação on-site e diálogo com equipas. Culmina num relatório confidencial e, quando merecida, na Distinction de L’Essence d’Or."},
      {t:"Consultoria",d:"Para propriedades e marcas que aspiram à elevação mas não estão ainda prontas para avaliação formal. Trabalhamos com a liderança para identificar lacunas, redesenhar a filosofia de serviço e construir a cultura interna que sustenta a excelência."},
      {t:"The Sense",d:"Programas de formação que transformam equipas. De imersões executivas para liderança a workshops sensoriais para equipas operacionais. Não ensinamos pessoas o que fazer. Transformamos a forma como vêem, sentem e respondem."}
    ],
    sn:"O programa de Distinction encontra-se na sua fase inaugural e funciona por convite. Programas de Consultoria e The Sense estão disponíveis mediante contacto.",
    at:"A Abordagem",
    ah:"Rigor sob a contenção.",
    steps:[
      {n:"01",t:"Convite",d:"Começamos pelo alinhamento. Propriedades e experiências são avaliadas quanto à compatibilidade com o Método antes de qualquer avaliação."},
      {n:"02",t:"Avaliação",d:"Um processo multi-camada que combina análise documental, avaliação experiencial anónima, observação técnica e diálogo estruturado com equipas."},
      {n:"03",t:"Relatório",d:"Dossier confidencial entregue exclusivamente à liderança: análise por dimensão, reconhecimento de pontos fortes e recomendações concretas de elevação."},
      {n:"04",t:"Distinction",d:"Atribuída apenas quando a excelência sustentada é confirmada nas cinco dimensões. Nem todos a receberão. A maioria não receberá."}
    ],
    dst:"A Distinção",
    dsh:"A maior parte do luxo é desenhada. Muito pouco é verdadeiramente compreendido.",
    dsb:"A Distinction de L’Essence d’Or não é atribuída sistematicamente. Só é concedida quando o painel confirma profundidade sustentada nas cinco dimensões.",
    dsc:"A Distinction não se persegue. Reconhece-se.",
    gkt:"O Nosso Símbolo",
    gks1:"O Ginkgo Biloba tem mais de 200 milhões de anos. É a espécie de árvore mais antiga da Terra. Sobreviveu a eras glaciares, a extinções em massa, a incêndios e a catástrofes que apagaram espécies inteiras. Em Hiroshima, seis árvores de ginkgo a menos de dois quilómetros do epicentro voltaram a brotar na primavera seguinte. Na filosofia oriental, o ginkgo simboliza longevidade, resiliência, esperança e paz interior.",
    gks2:"A sua folha, dois lóbulos simétricos unidos por um único ponto, encarna o equilíbrio das dualidades: visível e invisível, tangível e sentido, forma e essência. Yin e yang. Não em oposição, mas em harmonia silenciosa.",
    gks3:"No outono, a folha de ginkgo torna-se dourada. O seu momento mais belo é precisamente quando se prepara para se desprender. Não se agarra. Transforma-se.",
    gks4:"É por isso que o ginkgo é o nosso símbolo. Como a excelência que procuramos, não é visível à primeira vista, mas sustenta tudo o que é construído sobre ela.",
    gk:[
      {t:"Luxury is not what you see.",b:true},
      {t:"It is what you sense, and what remains.",b:true},
      {t:"",b:false},
      {t:"Não medimos momentos.",b:false},
      {t:"Medimos o que permanece depois deles.",b:false},
      {t:"",b:false},
      {t:"Este é o espírito de L’Essence d’Or.",b:true}
    ],

    fdt:"A Fundadora",
    fd1:"Ana Cunha é uma estratega de luxo e curadora de experiências de destino, operando na intersecção entre hospitalidade, ecossistemas de marca e design experiencial.",
    fd2:"Com formação avançada em Luxury Brand Management pelo ISEG Executive Education e exposição internacional em destinos de referência como Paris, Londres, Veneza, Lake Como e Dubai, a sua perspectiva combina clareza estratégica com estética refinada e uma compreensão profunda de como o luxo é percebido, sentido e recordado.",
    fd3:"Reconhecida como Best Luxury Event Planner in Portugal nos Luxury Lifestyle Awards 2026, e com múltiplas distinções internacionais, o seu trabalho combina consultoria, direcção criativa e design experiencial para clientes de hospitalidade de alto nível e marcas premium.",
    fd4:"A sua formação em ciências farmacêuticas traz uma dimensão invulgar à sua abordagem: rigor analítico, precisão e metodologia estruturada aplicados à arte das experiências de luxo.",
    fd5:"L’Essence d’Or é a evolução natural de mais de uma década de trabalho ao mais alto nível do luxo experiencial: um framework que mede o que os outros não conseguem.",
    cta:"Solicitar uma Conversa Confidencial",
    ce:"Para informações",
    fo:"Sediada na Europa, ao serviço da excelência mundial.",
    cr:"© 2026 L’Essence d’Or. Todos os direitos reservados."
  }
};

function useInView(ref){
  const [v,setV]=useState(false);
  useEffect(()=>{
    const el=ref.current;
    if(!el)return;
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:0.12});
    o.observe(el);
    return ()=>o.disconnect();
  },[ref]);
  return v;
}

/* Entrance: "rise" (text), "fade" (lines, quiet), "scale" (symbols) */
function FI({children,delay,type}){
  const ref=useRef(null);const v=useInView(ref);const d=delay||0;
  const k=type||"rise";
  const hidden = k==="scale" ? "scale(.94)" : k==="fade" ? "none" : "translateY(26px)";
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":hidden,transition:"opacity 1.1s ease "+d+"s, transform 1.2s cubic-bezier(.2,.7,.2,1) "+d+"s"}}>{children}</div>;
}

/* Hairline with gold fade */
function GL({w}){return <div style={{display:"flex",justifyContent:"center",margin:"28px 0"}}><div style={{width:w||80,height:1,background:"linear-gradient(90deg,transparent,"+GOLD+",transparent)"}}/></div>;}

/* Matte gold foil applied to the vector logo via CSS mask */
function Foil({src,ratio,width,label,drift}){
  return <div role="img" aria-label={label||"L'Essence d'Or"} style={{
    width:width,maxWidth:"100%",aspectRatio:ratio,margin:"0 auto",
    backgroundImage:FOIL,backgroundSize:"240% 100%",
    WebkitMaskImage:"url("+src+")",maskImage:"url("+src+")",
    WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",
    WebkitMaskSize:"contain",maskSize:"contain",
    WebkitMaskPosition:"center",maskPosition:"center",
    animation:drift===false?"none":"foil 18s ease-in-out infinite"
  }}/>;
}
const Logo=function(p){return <Foil src={LOGO_URL} ratio="870 / 480" width={p.width} drift={p.drift}/>;};
const Mark=function(p){return <Foil src={MARK_URL} ratio="400 / 370" width={p.width} drift={p.drift}/>;};

function useIsMobile(){
  const [m,setM]=useState(typeof window!=="undefined"&&window.innerWidth<900);
  useEffect(()=>{
    const f=function(){setM(window.innerWidth<900);};
    window.addEventListener("resize",f);return function(){window.removeEventListener("resize",f);};
  },[]);
  return m;
}

export default function App(){
  const [lang,setLang]=useState("en");
  const [sc,setSc]=useState(false);
  const [splash,setSplash]=useState(function(){
    try{return !window.sessionStorage.getItem("ld_seen");}catch(e){return true;}
  });
  const [openDim,setOpenDim]=useState(-1);
  const [menu,setMenu]=useState(false);
  const mobile=useIsMobile();
  const t=T[lang];

  useEffect(()=>{
    var link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
    link.rel="stylesheet";document.head.appendChild(link);
    var h=function(){setSc(window.scrollY>60);};
    window.addEventListener("scroll",h);
    return function(){window.removeEventListener("scroll",h);};
  },[]);

  useEffect(()=>{
    if(!splash)return;
    var id=setTimeout(function(){
      setSplash(false);
      try{window.sessionStorage.setItem("ld_seen","1");}catch(e){}
    },1900);
    return function(){clearTimeout(id);};
  },[splash]);

  var go=function(id){setMenu(false);var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"});};
  var S=function(text,color){return <h2 style={{fontFamily:F,fontSize:"clamp(28px,4vw,42px)",fontWeight:300,color:color||GOLD_L,letterSpacing:".15em",textAlign:"center",textTransform:"uppercase"}}>{text}</h2>;};
  var P=function(text,extra){return <p style={Object.assign({},{fontFamily:F,fontSize:"clamp(17px,2vw,20px)",lineHeight:1.85,color:CREAM_D,maxWidth:680,margin:"0 auto",textAlign:"center"},extra||{})}>{text}</p>;};

  var pad="clamp(70px,9vw,120px) clamp(24px,6vw,80px)";

  return (
    <div style={{fontFamily:F,background:CHOC,color:CREAM,overflowX:"hidden"}}>
      <style>{"*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:"+CHOC+";-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}section{display:block;position:relative}::selection{background:"+GOLD+";color:"+DEEP+"}a{transition:opacity .3s ease}a:hover{opacity:.75}button{transition:opacity .3s ease}button:hover{opacity:.75}"+
      "@keyframes fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes br{0%,100%{opacity:.25}50%{opacity:.75}}@keyframes xl{from{width:0}to{width:110px}}@keyframes sf{from{opacity:1}to{opacity:0;pointer-events:none}}@keyframes sl{0%{opacity:0;transform:scale(.96)}40%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}"+
      "@keyframes foil{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes kb{from{transform:scale(1)}to{transform:scale(1.07)}}"+
      "@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}video{display:none!important}}"}</style>

      {/* Film grain: tactile warmth */}
      <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:90,pointerEvents:"none",opacity:.07,mixBlendMode:"soft-light",backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"}}/>

      {/* Splash: brief, once per session */}
      {splash&&<div style={{position:"fixed",inset:0,background:DEEP,zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center",animation:"sf .7s ease 1.2s forwards"}}><div style={{width:"clamp(220px,40vw,360px)",animation:"sl 1.4s ease forwards"}}><Logo width="100%" drift={false}/></div></div>}

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:(sc||menu)?"rgba(31,21,12,0.92)":"transparent",backdropFilter:sc?"blur(14px)":"none",WebkitBackdropFilter:sc?"blur(14px)":"none",borderBottom:sc?"1px solid "+LINE:"1px solid transparent",transition:"all .5s",padding:sc?"10px 24px":"22px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={function(){go("home")}} aria-label="Home" style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:30}}><Mark width="100%" drift={false}/></div>
            {!sc&&!mobile&&<span style={{fontFamily:F,fontSize:13,letterSpacing:".2em",color:CREAM_D,fontWeight:400}}>L'ESSENCE D'OR</span>}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {sc&&!mobile&&<div style={{display:"flex",gap:0,marginRight:8}}>
              {t.nav.map(function(n,i){
                return <button key={i} onClick={function(){go(t.ids[i])}} style={{fontFamily:F,fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:CREAM_D,background:"none",border:"none",cursor:"pointer",padding:"6px 8px"}}>{n}</button>;
              })}
            </div>}
            {mobile&&<button onClick={function(){setMenu(!menu)}} aria-label="Menu" style={{background:"none",border:"none",cursor:"pointer",padding:"8px 6px",display:"flex",flexDirection:"column",gap:6}}>
              <span style={{display:"block",width:22,height:1,background:GOLD_L,transform:menu?"translateY(3.5px) rotate(45deg)":"none",transition:"transform .3s"}}/>
              <span style={{display:"block",width:22,height:1,background:GOLD_L,transform:menu?"translateY(-3.5px) rotate(-45deg)":"none",transition:"transform .3s"}}/>
            </button>}
            <div style={{display:"flex",gap:2,borderLeft:"1px solid "+LINE,paddingLeft:12}}>
              <button onClick={function(){setLang("en")}} style={{fontFamily:F,fontSize:12,cursor:"pointer",padding:"4px 8px",border:"none",background:"none",color:lang==="en"?GOLD_L:CREAM_M,borderBottom:lang==="en"?"1px solid "+GOLD_L:"1px solid transparent"}}>EN</button>
              <button onClick={function(){setLang("pt")}} style={{fontFamily:F,fontSize:12,cursor:"pointer",padding:"4px 8px",border:"none",background:"none",color:lang==="pt"?GOLD_L:CREAM_M,borderBottom:lang==="pt"?"1px solid "+GOLD_L:"1px solid transparent"}}>PT</button>
            </div>
          </div>
        </div>
        {mobile&&menu&&<div style={{padding:"18px 0 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          {t.nav.map(function(n,i){
            return <button key={i} onClick={function(){go(t.ids[i])}} style={{fontFamily:F,fontSize:16,letterSpacing:".16em",textTransform:"uppercase",color:CREAM,background:"none",border:"none",cursor:"pointer",padding:"11px 0"}}>{n}</button>;
          })}
        </div>}
      </nav>

      {/* HERO: film, chocolate veil, foil logo */}
      <section id="home" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 24px",overflow:"hidden",background:DEEP}}>
        <div style={{position:"absolute",inset:0,animation:"kb 24s ease-in-out infinite alternate"}}>
          <video autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg" aria-hidden="true" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}>
            <source src="/hero.mp4" type="video/mp4"/>
          </video>
        </div>
        <div style={{position:"absolute",inset:0,background:"rgba(31,21,12,0.52)"}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 46%,rgba(31,21,12,0.55) 0%,rgba(31,21,12,0) 62%)"}}/>
        <div style={{position:"absolute",left:0,right:0,bottom:0,height:"30%",background:"linear-gradient(to bottom,rgba(45,31,18,0),"+CHOC+")"}}/>

        <div style={{animation:"fu 1.6s ease 1.5s both",textAlign:"center",position:"relative",width:"100%",maxWidth:480}}>
          <Logo width="clamp(250px,34vw,440px)"/>
          <div style={{display:"flex",justifyContent:"center",margin:"34px 0 30px"}}>
            <div style={{height:1,background:"linear-gradient(90deg,transparent,"+GOLD_L+",transparent)",animation:"xl 1.6s ease forwards",animationDelay:"2.4s",width:0}}/>
          </div>
          <p style={{fontFamily:F,fontSize:"clamp(12px,1.5vw,15px)",letterSpacing:".32em",color:CREAM_D,textTransform:"uppercase"}}>{t.tag}</p>
        </div>
        <div style={{position:"absolute",bottom:34,animation:"br 2.8s ease infinite"}}>
          <svg width="18" height="28" viewBox="0 0 20 30" fill="none"><rect x="1" y="1" width="18" height="28" rx="9" stroke={GOLD_L} strokeWidth="1" opacity=".6"/><circle cx="10" cy="10" r="2" fill={GOLD_L} opacity=".8"/></svg>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{padding:pad,background:CHOC}}>
        <FI>{S(t.abt)}<GL/></FI>
        <FI delay={0.15}>{P(t.ab1,{fontSize:"clamp(21px,2.6vw,28px)",lineHeight:1.6,color:CREAM,maxWidth:800,fontWeight:300})}</FI>
        <div style={{height:40}}/>
        <FI delay={0.2}>{P(t.ab2)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.25}>{P(t.ab3)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.3}>{P(t.ab4)}</FI>
        <div style={{height:36}}/>
        <FI delay={0.35}>{P(t.vc,{fontStyle:"italic",color:GOLD_L,fontSize:"clamp(16px,1.8vw,19px)"})}</FI>
      </section>

      {/* DIMENSIONS */}
      <section id="dimensions" style={{padding:pad,background:COCOA}}>
        <FI>{S(t.dt)}<GL/>{P(t.di)}</FI>
        <div style={{maxWidth:820,margin:"56px auto 0",borderTop:"1px solid "+LINE}}>
          {t.dims.map(function(d,i){
            var isOpen=openDim===i;
            var has=!!d.d;
            return (<FI key={d.n} delay={i*0.07} type="fade">
              <div onClick={function(){if(has)setOpenDim(isOpen?-1:i)}}
                style={{cursor:has?"pointer":"default",padding:"26px 8px",borderBottom:"1px solid "+LINE,transition:"background .5s ease",background:isOpen?"rgba(176,136,56,0.07)":"transparent"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:16,flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:22}}>
                    <span style={{fontFamily:F,fontSize:14,letterSpacing:".2em",color:GOLD_L,minWidth:28}}>{d.n}</span>
                    <span style={{fontFamily:F,fontSize:"clamp(22px,2.6vw,28px)",fontWeight:300,color:isOpen?GOLD_L:CREAM,letterSpacing:".05em",transition:"color .4s"}}>{d.nm}</span>
                  </div>
                  <span style={{fontFamily:F,fontSize:13,letterSpacing:".14em",color:CREAM_M,textTransform:"uppercase",fontStyle:"italic"}}>{d.s}</span>
                </div>
                {has&&<div style={{maxHeight:isOpen?220:0,overflow:"hidden",transition:"max-height .6s ease, opacity .5s ease",opacity:isOpen?1:0}}>
                  <p style={{fontFamily:F,fontSize:17,color:CREAM_D,lineHeight:1.8,paddingTop:16,paddingLeft:50,maxWidth:680}}>{d.d}</p>
                </div>}
              </div>
            </FI>);
          })}
        </div>

        {/* FOR: editorial index, not buttons */}
        <div style={{marginTop:90}}>
          <FI type="fade">
            <p style={{fontFamily:F,fontSize:13,letterSpacing:".4em",color:GOLD_L,textTransform:"uppercase",textAlign:"center",marginBottom:34}}>{t.ft}</p>
          </FI>
          <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",borderTop:"1px solid "+LINE}}>
            {t.fwho.map(function(w,i){
              return (
                <FI key={i} delay={0.1+i*0.07} type="fade">
                  <div style={{padding:"26px 12px",textAlign:"center",borderBottom:"1px solid "+LINE}}>
                    <p style={{fontFamily:F,fontSize:"clamp(17px,1.9vw,21px)",fontWeight:400,letterSpacing:".08em",color:CREAM}}>{w}</p>
                  </div>
                </FI>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:pad,background:CHOC}}>
        <FI>{S(t.st)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(20px,2.4vw,26px)",fontWeight:300,color:CREAM,textAlign:"center",maxWidth:560,margin:"0 auto 64px"}}>{t.sh}</p></FI>
        <div style={{maxWidth:1080,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"clamp(28px,4vw,56px)"}}>
          {t.svcs.map(function(s,i){
            return (<FI key={i} delay={i*0.15}>
              <div style={{borderTop:"1px solid "+GOLD,paddingTop:28,height:"100%"}}>
                <h3 style={{fontFamily:F,fontSize:"clamp(22px,2.2vw,26px)",fontWeight:400,color:GOLD_L,letterSpacing:".05em"}}>{s.t}</h3>
                <p style={{fontFamily:F,fontSize:17,color:CREAM_D,lineHeight:1.8,marginTop:18}}>{s.d}</p>
              </div>
            </FI>);
          })}
        </div>
        <FI delay={0.4}>
          <p style={{fontFamily:F,fontSize:15,color:CREAM_M,fontStyle:"italic",textAlign:"center",maxWidth:620,margin:"64px auto 0",lineHeight:1.7}}>{t.sn}</p>
        </FI>
      </section>

      {/* FOUNDER: the one paper-warm interlude */}
      <section id="founder" style={{padding:pad,background:CREAM,color:CHOC}}>
        <FI>{S(t.fdt,GOLD)}<GL/></FI>
        <FI delay={0.15}>{P(t.fd1,{color:CHOC,fontSize:"clamp(21px,2.6vw,28px)",lineHeight:1.6,fontWeight:300,maxWidth:800})}</FI>
        <div style={{height:36}}/>
        <FI delay={0.2}>{P(t.fd2,{color:"rgba(45,31,18,0.8)"})}</FI>
        <div style={{height:24}}/>
        <FI delay={0.25}>{P(t.fd3,{color:"rgba(45,31,18,0.8)"})}</FI>
        <div style={{height:24}}/>
        <FI delay={0.3}>{P(t.fd4,{fontStyle:"italic",color:GOLD})}</FI>
        <div style={{height:24}}/>
        <FI delay={0.35}>{P(t.fd5,{color:"rgba(45,31,18,0.8)"})}</FI>
      </section>

      {/* APPROACH */}
      <section id="approach" style={{padding:pad,background:DEEP}}>
        <FI>{S(t.at)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(20px,2.4vw,26px)",fontWeight:300,color:CREAM_D,textAlign:"center",maxWidth:560,margin:"0 auto 56px"}}>{t.ah}</p></FI>
        <div style={{maxWidth:820,margin:"0 auto",borderTop:"1px solid "+LINE}}>
          {t.steps.map(function(s,i){
            return (<FI key={s.n} delay={i*0.1} type="fade">
              <div style={{display:"flex",gap:"clamp(18px,4vw,44px)",padding:"34px 0",borderBottom:"1px solid "+LINE,alignItems:"flex-start"}}>
                <span style={{fontFamily:F,fontSize:"clamp(38px,5vw,56px)",fontWeight:300,color:GOLD,flexShrink:0,lineHeight:.9,minWidth:"1.5em",opacity:.9}}>{s.n}</span>
                <div>
                  <h3 style={{fontFamily:F,fontSize:"clamp(21px,2.2vw,25px)",fontWeight:400,color:GOLD_L,letterSpacing:".05em"}}>{s.t}</h3>
                  <p style={{fontFamily:F,fontSize:17,color:CREAM_D,lineHeight:1.75,marginTop:10}}>{s.d}</p>
                </div>
              </div>
            </FI>);
          })}
        </div>
      </section>

      {/* DISTINCTION: one statement, full presence */}
      <section id="distinction" style={{minHeight:"84vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:pad,background:"radial-gradient(ellipse at 50% 40%,"+COCOA+" 0%,"+CHOC+" 70%)"}}>
        <FI type="fade">{S(t.dst)}<GL/></FI>
        <FI delay={0.2}>
          <p style={{fontFamily:F,fontSize:"clamp(34px,6.2vw,80px)",fontWeight:300,lineHeight:1.14,color:CREAM,textAlign:"center",maxWidth:1000,margin:"28px auto 0",letterSpacing:"-.005em"}}>{t.dsh}</p>
        </FI>
        <div style={{height:56}}/>
        <FI delay={0.35}>{P(t.dsb,{maxWidth:640})}</FI>
        <div style={{height:28}}/>
        <FI delay={0.5}>{P(t.dsc,{fontStyle:"italic",color:GOLD_L,fontSize:"clamp(19px,2.2vw,24px)"})}</FI>
      </section>

      {/* SYMBOL */}
      <section id="symbol" style={{padding:pad,background:COCOA}}>
        <FI>{S(t.gkt)}<GL/></FI>
        <FI type="scale"><div style={{margin:"20px auto 56px"}}><Mark width="clamp(110px,14vw,170px)"/></div></FI>
        <FI delay={0.15}>{P(t.gks1)}</FI>
        <div style={{height:26}}/>
        <FI delay={0.2}>{P(t.gks2)}</FI>
        <div style={{height:26}}/>
        <FI delay={0.25}>{P(t.gks3,{fontStyle:"italic",color:GOLD_L,fontSize:"clamp(19px,2.2vw,24px)"})}</FI>
        <div style={{height:26}}/>
        <FI delay={0.3}>{P(t.gks4)}</FI>
      </section>

      {/* MANIFESTO */}
      <section style={{padding:"clamp(90px,11vw,150px) 24px",background:DEEP,textAlign:"center"}}>
        <FI type="scale">
          <Mark width="clamp(90px,10vw,120px)"/>
        </FI>
        <FI delay={0.2}>
          <div style={{marginTop:52,maxWidth:640,margin:"52px auto 0"}}>
            {t.gk.map(function(l,i){
              if(l.t==="")return <div key={i} style={{height:26}}/>;
              return <p key={i} style={{fontFamily:F,fontSize:l.b?"clamp(24px,3.2vw,34px)":"clamp(18px,2vw,22px)",fontWeight:l.b?400:300,fontStyle:l.b?"normal":"italic",color:l.b?GOLD_L:CREAM_D,lineHeight:1.7}}>{l.t}</p>;
            })}
          </div>
        </FI>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:pad,background:CHOC,textAlign:"center"}}>
        <FI>
          <div style={{margin:"0 auto"}}><Mark width="48px" drift={false}/></div>
          <h2 style={{fontFamily:F,fontSize:"clamp(26px,3.5vw,38px)",fontWeight:300,color:GOLD_L,letterSpacing:".18em",textTransform:"uppercase",marginTop:24}}>L'Essence d'Or</h2>
          <GL/>
          <p style={{fontFamily:F,fontSize:16,color:CREAM_M,fontStyle:"italic"}}>{t.sig}</p>
          <div style={{marginTop:44}}>
            <ContactForm />
          </div>
          <div style={{marginTop:48}}>
            <a href="mailto:contact@lessencedor.com" style={{fontFamily:F,fontSize:18,color:CREAM,textDecoration:"none",letterSpacing:".04em"}}>contact@lessencedor.com</a>
            <p style={{fontFamily:F,fontSize:13,color:CREAM_M,marginTop:16,letterSpacing:".08em"}}>www.lessencedor.com</p>
          </div>
          <p style={{fontFamily:F,fontSize:13,color:CREAM_M,marginTop:36,fontStyle:"italic"}}>{t.fo}</p>
        </FI>
      </section>

      <footer style={{padding:"18px 16px",background:DEEP,textAlign:"center",borderTop:"1px solid "+LINE}}>
        <p style={{fontFamily:F,fontSize:12,color:CREAM_M,letterSpacing:".08em"}}>{t.cr}</p>
      </footer>
    </div>
  );
}
