import { useState, useEffect, useRef } from "react";
import ContactForm from './ContactForm';

const GOLD = "#B8923F";
const CREAM = "#F8F5EF";
const DARK = "#1A1A1A";
const WARM = "#2C2C2C";
const GREY = "#6B6B6B";
const LIGHT = "#A0A0A0";
const F = "'Cormorant Garamond', serif";

const MARK_URL = "/mark.svg";
const LOGO_URL = "/logo.svg";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{
    if(!ref.current)return;
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:0.12});
    o.observe(ref.current);return ()=>o.disconnect();
  },[]);
  return v;
}
function FI({children,delay}){
  const ref=useRef(null);const v=useInView(ref);const d=delay||0;
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(28px)",transition:"opacity 0.9s ease "+d+"s, transform 0.9s ease "+d+"s"}}>{children}</div>;
}
function GL(){return <div style={{display:"flex",justifyContent:"center",margin:"24px 0"}}><div style={{width:80,height:1,background:"linear-gradient(90deg,transparent,"+GOLD+",transparent)"}}/></div>;}
function Img({size,full}){return <img src={full?LOGO_URL:MARK_URL} alt="" style={{width:size||60,height:"auto",verticalAlign:"middle"}}/>;}



export default function App(){
  const [lang,setLang]=useState("en");
  const [sc,setSc]=useState(false);
  const [splash,setSplash]=useState(true);
  const [openDim,setOpenDim]=useState(-1);
  const t=T[lang];

  useEffect(()=>{
    var link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
    link.rel="stylesheet";document.head.appendChild(link);
    var h=function(){setSc(window.scrollY>60);};
    window.addEventListener("scroll",h);
    setTimeout(function(){setSplash(false);},2800);
    return function(){window.removeEventListener("scroll",h);};
  },[]);

  var go=function(id){document.getElementById(id).scrollIntoView({behavior:"smooth"});};
  var S=function(text){return <h2 style={{fontFamily:F,fontSize:"clamp(28px,4vw,42px)",fontWeight:300,color:GOLD,letterSpacing:".15em",textAlign:"center",textTransform:"uppercase"}}>{text}</h2>;};
  var P=function(text,extra){return <p style={Object.assign({},{fontFamily:F,fontSize:"clamp(16px,2vw,19px)",lineHeight:1.8,color:WARM,maxWidth:680,margin:"0 auto",textAlign:"center"},extra||{})}>{text}</p>;};

  return (
    <div style={{fontFamily:F,background:CREAM,color:DARK,overflowX:"hidden"}}>
      <style>{"*{margin:0;padding:0;box-sizing:border-box}body{background:#F8F5EF}html{scroll-behavior:smooth}section{margin:0;border:0;display:block}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}::selection{background:"+GOLD+";color:"+CREAM+"}a{transition:opacity .3s ease}a:hover{opacity:.75}button{transition:opacity .3s ease}button:hover{opacity:.7}@keyframes fu{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}@keyframes br{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes xl{from{width:0}to{width:100px}}@keyframes sf{from{opacity:1}to{opacity:0;pointer-events:none}}@keyframes sl{0%{opacity:0;transform:scale(.96)}35%{opacity:1;transform:scale(1)}75%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.01)}}"}</style>

      {splash&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:CREAM,zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center",animation:"sf 0.6s ease 2.2s forwards"}}><img src={LOGO_URL} alt="" style={{width:"clamp(220px,42vw,340px)",height:"auto",animation:"sl 2.4s ease forwards"}}/></div>}

      {/* NAV: fixed, logo left, hamburger right on scroll */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:sc?"rgba(248,245,239,0.97)":"transparent",backdropFilter:sc?"blur(12px)":"none",borderBottom:sc?"1px solid rgba(184,146,63,0.12)":"none",transition:"all .5s",padding:sc?"10px 24px":"20px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={function(){go("home")}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
            <Img size={26}/>
            {!sc&&<span style={{fontFamily:F,fontSize:13,letterSpacing:".12em",color:GREY,fontWeight:400}}>L'ESSENCE D'OR</span>}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {/* Nav links - desktop only */}
            {sc&&<div style={{display:"flex",gap:0,marginRight:8}}>
              {t.nav.map(function(n,i){
                return <button key={i} onClick={function(){go(t.ids[i])}} style={{fontFamily:F,fontSize:10,letterSpacing:".06em",textTransform:"uppercase",color:GREY,background:"none",border:"none",cursor:"pointer",padding:"6px 6px"}}>{n}</button>;
              })}
            </div>}
            <div style={{display:"flex",gap:2,borderLeft:"1px solid rgba(184,146,63,0.2)",paddingLeft:12}}>
              <button onClick={function(){setLang("en")}} style={{fontFamily:F,fontSize:11,cursor:"pointer",padding:"4px 8px",border:"none",background:"none",color:lang==="en"?GOLD:LIGHT,borderBottom:lang==="en"?"1px solid "+GOLD:"1px solid transparent"}}>EN</button>
              <button onClick={function(){setLang("pt")}} style={{fontFamily:F,fontSize:11,cursor:"pointer",padding:"4px 8px",border:"none",background:"none",color:lang==="pt"?GOLD:LIGHT,borderBottom:lang==="pt"?"1px solid "+GOLD:"1px solid transparent"}}>PT</button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"0 24px",position:"relative"}}>
        
        <div style={{animation:"fu 1.2s ease",textAlign:"center",position:"relative"}}>
          <Img size={260} full/>
          <div style={{display:"flex",justifyContent:"center",margin:"28px 0"}}>
            <div style={{height:1,background:"linear-gradient(90deg,transparent,"+GOLD+",transparent)",animation:"xl 1.5s ease forwards",animationDelay:".8s",width:0}}/>
          </div>
          <p style={{fontFamily:F,fontSize:"clamp(12px,1.6vw,15px)",letterSpacing:".18em",color:GREY,textTransform:"uppercase",animation:"fu 1.2s ease .4s both"}}>{t.tag}</p>
        </div>
        <div style={{position:"absolute",bottom:40,animation:"br 2.5s ease infinite"}}>
          <svg width="18" height="28" viewBox="0 0 20 30" fill="none"><rect x="1" y="1" width="18" height="28" rx="9" stroke={GOLD} strokeWidth="1" opacity=".3"/><circle cx="10" cy="10" r="2" fill={GOLD} opacity=".5"/></svg>
        </div>
      </section>

      {/* ABOUT: What is it, what does it do, who is it for */}
      <section id="about" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,80px)",background:CREAM}}>
        <FI>{S(t.abt)}<GL/></FI>
        <FI delay={0.2}>{P(t.ab1)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.3}>{P(t.ab2)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.4}>{P(t.ab3)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.5}>{P(t.ab4)}</FI>
        <div style={{height:20}}/>
        <FI delay={0.6}>{P(t.vc,{fontStyle:"italic",color:LIGHT,fontSize:"clamp(14px,1.6vw,16px)"})}</FI>
      </section>


      {/* DIMENSIONS */}
      <section id="dimensions" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,60px)",background:CREAM}}>
        <FI>{S(t.dt)}<GL/>{P(t.di)}</FI>
        <div style={{marginTop:48,maxWidth:760,margin:"48px auto 0"}}>
          {t.dims.map(function(d,i){
            var isOpen=openDim===i;
            return (<FI key={d.n} delay={i*0.08}>
              <div onClick={function(){setOpenDim(isOpen?-1:i)}}
                style={{cursor:"pointer",padding:"24px 32px",marginBottom:1,background:isOpen?"rgba(184,146,63,0.04)":"transparent",borderLeft:isOpen?"2px solid "+GOLD:"2px solid transparent",transition:"all 0.4s ease"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:16}}>
                    <span style={{fontFamily:F,fontSize:13,letterSpacing:".2em",color:isOpen?GOLD:LIGHT,transition:"color 0.4s"}}>{d.n}</span>
                    <span style={{fontFamily:F,fontSize:19,fontWeight:400,color:isOpen?GOLD:WARM,letterSpacing:".06em",transition:"color 0.4s"}}>{d.nm}</span>
                  </div>
                  <span style={{fontFamily:F,fontSize:13,letterSpacing:".1em",color:GREY,textTransform:"uppercase",fontStyle:"italic"}}>{d.s}</span>
                </div>
                <div style={{maxHeight:isOpen?200:0,overflow:"hidden",transition:"max-height 0.5s ease, opacity 0.4s ease",opacity:isOpen?1:0}}>
                  <p style={{fontFamily:F,fontSize:15,color:WARM,lineHeight:1.75,paddingTop:16,paddingLeft:29}}>{d.d}</p>
                </div>
              </div>
              {i<4&&<div style={{height:1,background:"rgba(184,146,63,0.08)",margin:"0 32px"}}/>}
            </FI>);
          })}
        </div>
        <div style={{marginTop:48}}>
          <FI delay={0.5}>
            <div style={{width:1,height:32,background:"linear-gradient(to bottom,transparent,"+GOLD+")",margin:"0 auto 20px"}}/>
            <p style={{fontFamily:F,fontSize:12,letterSpacing:".2em",color:LIGHT,textTransform:"uppercase",textAlign:"center",marginBottom:24}}>{t.ft}</p>
          </FI>
          <div style={{maxWidth:640,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px"}}>
            {t.fwho.map(function(w,i){
              return (
                <FI key={i} delay={0.6+i*0.08}>
                  <div style={{padding:"10px 24px",borderRadius:"40px",border:"1px solid rgba(184,146,63,0.25)",background:"transparent",cursor:"default",transition:"all .4s ease"}}
                    onMouseEnter={function(e){e.currentTarget.style.background="rgba(184,146,63,0.06)";e.currentTarget.style.borderColor=GOLD;}}
                    onMouseLeave={function(e){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(184,146,63,0.25)";}}>
                    <p style={{fontFamily:F,fontSize:13,letterSpacing:".04em",color:GREY,whiteSpace:"nowrap"}}>{w}</p>
                  </div>
                </FI>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES: Three pillars */}
      <section id="services" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,80px)",background:CREAM}}>
        <FI>{S(t.st)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(18px,2.2vw,22px)",fontWeight:500,color:DARK,textAlign:"center",maxWidth:500,margin:"0 auto 48px"}}>{t.sh}</p></FI>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          {t.svcs.map(function(s,i){
            return (<FI key={i} delay={i*0.15}>
              <div style={{padding:"36px 0",borderBottom:i<2?"1px solid rgba(184,146,63,0.12)":"none"}}>
                <h3 style={{fontFamily:F,fontSize:20,fontWeight:400,color:GOLD,letterSpacing:".06em",textAlign:"center"}}>{s.t}</h3>
                <p style={{fontFamily:F,fontSize:16,color:WARM,lineHeight:1.75,marginTop:14,textAlign:"center",maxWidth:640,margin:"14px auto 0"}}>{s.d}</p>
              </div>
            </FI>);
          })}
        </div>
        <FI delay={0.5}>
          <p style={{fontFamily:F,fontSize:14,color:LIGHT,fontStyle:"italic",textAlign:"center",marginTop:36,maxWidth:600,margin:"36px auto 0"}}>{t.sn}</p>
        </FI>
      </section>


      {/* FOUNDER */}
      <section id="founder" style={{padding:"clamp(50px,6vw,80px) clamp(24px,6vw,80px)",background:CREAM}}>
        <FI>{S(t.fdt)}<GL/></FI>
        <FI delay={0.2}>{P(t.fd1)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.3}>{P(t.fd2)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.35}>{P(t.fd3)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.4}>{P(t.fd4,{fontStyle:"italic",color:GREY})}</FI>
        <div style={{height:24}}/>
        <FI delay={0.5}>{P(t.fd5)}</FI>
      </section>

      {/* APPROACH */}
      <section id="approach" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,80px)",background:DARK}}>
        <FI>{S(t.at)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(18px,2.2vw,22px)",fontWeight:500,color:"rgba(255,255,255,0.7)",textAlign:"center",maxWidth:500,margin:"0 auto 48px"}}>{t.ah}</p></FI>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          {t.steps.map(function(s,i){
            return (<FI key={s.n} delay={i*0.12}>
              <div style={{display:"flex",gap:24,padding:"28px 0",borderBottom:i<3?"1px solid rgba(184,146,63,0.12)":"none",alignItems:"flex-start"}}>
                <span style={{fontFamily:F,fontSize:28,fontWeight:300,color:GOLD,flexShrink:0,lineHeight:1}}>{s.n}</span>
                <div>
                  <h3 style={{fontFamily:F,fontSize:18,fontWeight:400,color:GOLD,letterSpacing:".06em"}}>{s.t}</h3>
                  <p style={{fontFamily:F,fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginTop:8}}>{s.d}</p>
                </div>
              </div>
            </FI>);
          })}
        </div>
      </section>

      {/* DISTINCTION */}
      <section id="distinction" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,80px)",background:CREAM}}>
        <FI>{S(t.dst)}<GL/></FI>
        <FI delay={0.2}>{P(t.dsh,{fontSize:"clamp(18px,2.2vw,22px)",fontWeight:500})}</FI>
        <div style={{height:32}}/>
        <FI delay={0.3}>{P(t.dsb)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.4}>{P(t.dsc,{fontStyle:"italic",color:GOLD})}</FI>
      </section>


      {/* GINKGO */}
      <section id="symbol" style={{padding:"clamp(60px,8vw,100px) clamp(24px,6vw,80px)",background:CREAM}}>
        <FI>{S(t.gkt)}<GL/></FI>
        <div style={{display:"flex",justifyContent:"center",marginBottom:40}}><Img size={80}/></div>
        <FI delay={0.2}>{P(t.gks1)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.3}>{P(t.gks2)}</FI>
        <div style={{height:24}}/>
        <FI delay={0.4}>{P(t.gks3,{fontStyle:"italic",color:GOLD})}</FI>
        <div style={{height:24}}/>
        <FI delay={0.5}>{P(t.gks4)}</FI>
      </section>

      {/* MANIFESTO */}
      <section style={{padding:"clamp(50px,6vw,80px) 24px",background:DARK,textAlign:"center"}}>
        <FI>
          <Img size={70}/>
          <div style={{marginTop:36,maxWidth:500,margin:"36px auto 0"}}>
            {t.gk.map(function(l,i){
              if(l.t==="")return <div key={i} style={{height:20}}/>;
              return <p key={i} style={{fontFamily:F,fontSize:l.b?20:17,fontWeight:l.b?500:300,fontStyle:l.b?"normal":"italic",color:l.b?GOLD:"rgba(255,255,255,0.55)",lineHeight:1.8}}>{l.t}</p>;
            })}
          </div>
        </FI>
      </section>


      {/* CONTACT */}
      <section id="contact" style={{padding:"clamp(50px,6vw,80px) 24px",background:CREAM,textAlign:"center"}}>
        <FI>
          <Img size={44}/>
          <h2 style={{fontFamily:F,fontSize:"clamp(24px,3.5vw,36px)",fontWeight:300,color:GOLD,letterSpacing:".15em",textTransform:"uppercase",marginTop:20}}>L'Essence d'Or</h2>
          <GL/>
          <p style={{fontFamily:F,fontSize:15,color:GREY,fontStyle:"italic"}}>{t.sig}</p>
          <div style={{marginTop:40}}>
  <ContactForm />
</div>

          <div style={{marginTop:36}}>
            <a href="mailto:contact@lessencedor.com" style={{fontFamily:F,fontSize:16,color:WARM,textDecoration:"none"}}>contact@lessencedor.com</a>
            <p style={{fontFamily:F,fontSize:13,color:LIGHT,marginTop:16}}>www.lessencedor.com</p>
          </div>
          <p style={{fontFamily:F,fontSize:12,color:LIGHT,marginTop:32,fontStyle:"italic"}}>{t.fo}</p>
        </FI>
      </section>

      <footer style={{padding:16,background:DARK,textAlign:"center"}}>
        <p style={{fontFamily:F,fontSize:11,color:"rgba(255,255,255,0.25)",letterSpacing:".06em"}}>{t.cr}</p>
      </footer>
    </div>
  );
}
