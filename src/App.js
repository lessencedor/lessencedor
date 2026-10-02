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

const PRERENDER = typeof window === "undefined";
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
      {n:"I",nm:"The Seen",s:"Visible Quality",d:"Aesthetics, materiality, mise en place, visual coherence, lighting, presentation and operational fluidity.",v:"A guest checks in at dusk. The curtains have already been drawn to frame the exact angle where the sun is setting. No one mentioned the view. The room simply knew what time it was."},
      {n:"II",nm:"The Felt",s:"Invisible Quality",d:"Atmosphere, rhythm, anticipation, sensory calibration, density of experience and the sensation of care before it is ever requested.",v:"After three days, a guest realises she has not looked at her phone once. Not because there was no signal. Because nothing was missing."},
      {n:"III",nm:"The Human",s:"Relational Quality",d:"Posture, listening, contextual reading, discretion, calibrated empathy, personalisation and elegance in every interaction.",v:"A couple arrives in silence. The team reads it. No cheerful remarks over dinner. Only presence, warmth, and a handwritten note left in the room: we are here if you need anything."},
      {n:"IV",nm:"The Rooted",s:"Cultural Quality",d:"Authenticity, sense of place, heritage, narrative coherence, sophistication without displacement.",v:"Breakfast does not present a local ingredient as decoration. The grandmother from the village still bakes the bread. The story is not told. It is tasted."},
      {n:"V",nm:"The Sustained",s:"Systemic Quality",d:"Internal standards, consistency, continuous training, leadership culture, resilience and commitment to elevation.",v:"A new team member, in her second week, resolves a difficult request with the same calm and grace as the director. That is not luck. That is culture."}
    ],
    ft:"For",
    fwho:["Luxury Hotels & Resorts","Private Aviation","Yachting & Superyachts","Private Members’ Clubs","Wellness Retreats","Fine Dining Destinations"],
    st:"Our Services",
    sh:"Three ways to work with us.",
    svcs:[
      {t:"Evaluation & Distinction",d:"A rigorous, multi-layered assessment of your experience against the five dimensions. Combines documentary analysis, anonymous mystery experience, on-site observation and team dialogue. Culminates in a confidential report and, where merited, the L’Essence d’Or Distinction."},
      {t:"Consulting",d:"For properties and brands that aspire to elevation but are not yet ready for formal evaluation. We work alongside leadership to identify gaps, redesign service philosophy and build the internal culture that sustains excellence."},
      {t:"The Sense",d:"The Sense trains perception. L’Essence d’Or measures the result. From executive immersions for leadership to sensorial workshops for operational teams: people trained to sense, not merely to execute."}
    ],
    sn:"The Distinction is rare by design and, in its inaugural phase, operates by invitation. The Sense and Consulting exist for those who aspire to it, and are available upon request.",
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
    dsv:[["Star ratings measure infrastructure.","We measure how the experience is felt."],["Editorial awards measure popularity.","We measure depth and consistency."],["Rankings measure declared satisfaction.","We measure invisible quality."]],
    dsr:["Valid for two years, subject to reassessment. Rare by design.","Recognised properties and experiences join The Circle."],
    enter:"Enter",withSound:"with sound",silence:"enter in silence",sound:"Sound",
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
    frole:"Founder and Creative Director of Made With Love Events, and the mind behind L’Essence d’Or, The Invisible Measure.",
    fs:[
      "Most luxury experiences are well executed. Very few are unforgettable. The difference rarely lies in what can be counted, and almost always in what is felt: a need anticipated, a moment perfectly timed, an atmosphere that feels effortless, the sense of being genuinely considered.",
      "This conviction was shaped through more than a decade in the events industry with Made With Love, where Ana creates destination weddings, private celebrations and hospitality-led events in Portugal and internationally.",
      "It has been further informed by executive education in Management of Fashion and Luxury Companies at Università Bocconi and Mastering Luxury Hospitality: Fundamentals to Leadership at EDHEC Business School, alongside masterclasses with international industry leaders.",
      "This journey led to the creation of L’Essence d’Or, The Invisible Measure: a proprietary methodology conceived to evaluate, elevate and distinguish luxury hospitality through the elements that are not always visible, yet profoundly shape how an experience is perceived, felt and remembered.",
      "Built around five dimensions, The Seen, The Felt, The Human, The Rooted and The Sustained, L’Essence d’Or brings together confidential, experience-based evaluation, education and a Distinction designed to recognise depth, consistency and qualitative excellence.",
      "Made With Love brings this philosophy into the world of celebrations. L’Essence d’Or extends it across luxury hospitality, through the service, culture and standards that shape truly memorable experiences."
    ],
    fclose:"Across both ventures, Ana’s approach is guided by the belief that true luxury is not defined by excess, but by relevance, coherence, care and the quality of how an experience makes people feel.",
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
    ab2:"Trabalhamos com propriedades e marcas que compreendem que a verdadeira excelência não se define apenas pela infraestrutura, pelo preço ou pela estética, mas pela profundidade da presença, antecipação e cuidado que moldam cada momento.",
    ab3:"O nosso trabalho abrange três áreas: avaliação qualitativa com base num framework proprietário de cinco dimensões, consultoria confidencial para propriedades que procuram elevação, e programas de formação que transformam equipas a partir de dentro.",
    ab4:"A Distinction de L’Essence d’Or é atribuída a quem demonstra excelência sustentada em todas as dimensões. Não é dada sistematicamente. É conquistada.",
    vc:"Não é a perfeição que procuramos, mas presença, consistência e intenção.",
    dt:"As Cinco Dimensões",
    di:"Avaliamos o que os outros não avaliam. Cinco dimensões interligadas que captam não apenas o que é visível, mas o que é sentido e o que perdura.",
    dims:[
      {n:"I",nm:"The Seen",s:"Qualidade Visível",d:"Estética, materialidade, mise en place, coerência visual, iluminação, apresentação e fluidez operacional.",v:"Um hóspede faz o check-in ao entardecer. As cortinas já foram corridas para enquadrar o ângulo exacto em que o sol se põe. Ninguém falou da vista. O quarto simplesmente sabia que horas eram."},
      {n:"II",nm:"The Felt",s:"Qualidade Invisível",d:"Atmosfera, ritmo, antecipação, calibração sensorial, densidade da experiência e a sensação de cuidado antes de alguma vez ser pedido.",v:"Ao fim de três dias, uma hóspede percebe que não olhou para o telemóvel uma única vez. Não porque não houvesse rede. Porque nada faltava."},
      {n:"III",nm:"The Human",s:"Qualidade Relacional",d:"Postura, escuta, leitura do contexto, discrição, empatia calibrada, personalização e elegância em cada interacção.",v:"Um casal chega em silêncio. A equipa lê-o. Nenhum comentário animado ao jantar. Apenas presença, calor, e um bilhete manuscrito deixado no quarto: estamos aqui se precisarem de alguma coisa."},
      {n:"IV",nm:"The Rooted",s:"Qualidade Cultural",d:"Autenticidade, sentido de lugar, património, coerência narrativa, sofisticação sem deslocamento.",v:"O pequeno-almoço não apresenta um ingrediente local como decoração. A avó da aldeia ainda coze o pão. A história não se conta. Prova-se."},
      {n:"V",nm:"The Sustained",s:"Qualidade Sistémica",d:"Padrões internos, consistência, formação contínua, cultura de liderança, resiliência e compromisso com a elevação.",v:"Uma nova colaboradora, na segunda semana, resolve um pedido difícil com a mesma calma e a mesma graça do director. Não é sorte. É cultura."}
    ],
    ft:"Para",
    fwho:["Hotéis de Luxo & Resorts","Aviação Privada","Yachting & Superiates","Clubes Privados de Membros","Retiros de Wellness","Destinos de Fine Dining"],
    st:"Os Nossos Serviços",
    sh:"Três formas de trabalhar connosco.",
    svcs:[
      {t:"Avaliação & Distinction",d:"Uma avaliação rigorosa, em várias camadas, da sua experiência face às cinco dimensões. Combina análise documental, mystery experience anónima, observação no local e diálogo com as equipas. Culmina num relatório confidencial e, quando merecida, na Distinction de L’Essence d’Or."},
      {t:"Consultoria",d:"Para propriedades e marcas que aspiram à elevação mas não estão ainda prontas para avaliação formal. Trabalhamos lado a lado com a liderança para identificar lacunas, redesenhar a filosofia de serviço e construir a cultura interna que sustenta a excelência."},
      {t:"The Sense",d:"The Sense treina a percepção. L’Essence d’Or mede o resultado. De imersões executivas para a liderança a workshops sensoriais para equipas operacionais: pessoas formadas para sentir, não apenas para executar."}
    ],
    sn:"A Distinction é rara por princípio e, na sua fase inaugural, funciona por convite. The Sense e a Consultoria existem para quem aspira a ela, e estão disponíveis mediante pedido.",
    at:"A Abordagem",
    ah:"Rigor sob contenção.",
    steps:[
      {n:"01",t:"Convite",d:"Começamos pelo alinhamento. Propriedades e experiências são avaliadas quanto à compatibilidade com o Método antes de qualquer avaliação começar."},
      {n:"02",t:"Avaliação",d:"Um processo em várias camadas que combina análise documental, avaliação experiencial anónima, observação técnica e diálogo estruturado com as equipas."},
      {n:"03",t:"Relatório",d:"Um dossier confidencial entregue exclusivamente à liderança: análise por dimensão, reconhecimento dos pontos fortes e recomendações concretas de elevação."},
      {n:"04",t:"Distinction",d:"Atribuída apenas quando a excelência sustentada é confirmada nas cinco dimensões. Nem todos a receberão. A maioria não a receberá."}
    ],
    dst:"A Distinção",
    dsh:"A maior parte do luxo é desenhada. Muito pouco é verdadeiramente compreendido.",
    dsb:"A Distinction de L’Essence d’Or não é atribuída sistematicamente. Só é concedida quando o painel confirma profundidade sustentada nas cinco dimensões.",
    dsc:"A Distinction não se persegue. Reconhece-se.",
    dsv:[["As classificações por estrelas medem a infraestrutura.","Nós medimos como a experiência é sentida."],["Os prémios editoriais medem a popularidade.","Nós medimos profundidade e consistência."],["Os rankings medem a satisfação declarada.","Nós medimos a qualidade invisível."]],
    dsr:["Válida por dois anos, sujeita a reavaliação. Rara por princípio.","As propriedades e experiências reconhecidas entram no The Circle."],
    enter:"Entrar",withSound:"com som",silence:"entrar em silêncio",sound:"Som",
    gkt:"O Nosso Símbolo",
    gks1:"O Ginkgo Biloba tem mais de 200 milhões de anos. A árvore viva mais antiga da Terra. Sobreviveu a eras glaciares, a extinções em massa, a incêndios e a catástrofes que apagaram espécies inteiras. Em Hiroshima, seis árvores de ginkgo a menos de dois quilómetros do epicentro voltaram a brotar na primavera seguinte. Na filosofia oriental, o ginkgo simboliza longevidade, resiliência, esperança e paz interior.",
    gks2:"A sua folha, dois lóbulos simétricos unidos por um único ponto, encarna o equilíbrio das dualidades: visível e invisível, tangível e sentido, forma e essência. Yin e yang. Não em oposição, mas em harmonia serena.",
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
    frole:"Fundadora e Directora Criativa da Made With Love Events, e a mente por detrás de L’Essence d’Or, The Invisible Measure.",
    fs:[
      "A maior parte das experiências de luxo é bem executada. Muito poucas são inesquecíveis. A diferença raramente está no que se pode contar, e quase sempre no que se sente: uma necessidade antecipada, um momento no instante certo, uma atmosfera que parece não exigir esforço, a sensação de ser genuinamente considerado.",
      "Esta convicção formou-se ao longo de mais de uma década no sector dos eventos com a Made With Love, onde Ana cria destination weddings, celebrações privadas e eventos de hospitalidade em Portugal e a nível internacional.",
      "Foi aprofundada pela formação executiva em Management of Fashion and Luxury Companies, na Università Bocconi, e em Mastering Luxury Hospitality: Fundamentals to Leadership, na EDHEC Business School, a par de masterclasses com líderes internacionais do sector.",
      "Este percurso conduziu à criação de L’Essence d’Or, The Invisible Measure: uma metodologia proprietária concebida para avaliar, elevar e distinguir a hospitalidade de luxo através dos elementos que nem sempre são visíveis, mas que moldam profundamente a forma como uma experiência é percebida, sentida e recordada.",
      "Construída em torno de cinco dimensões, The Seen, The Felt, The Human, The Rooted e The Sustained, L’Essence d’Or reúne avaliação confidencial baseada na experiência, formação e uma Distinction concebida para reconhecer profundidade, consistência e excelência qualitativa.",
      "A Made With Love leva esta filosofia ao mundo das celebrações. L’Essence d’Or estende-a à hospitalidade de luxo, através do serviço, da cultura e dos padrões que moldam experiências verdadeiramente memoráveis."
    ],
    fclose:"Em ambos os projectos, a abordagem de Ana é guiada pela convicção de que o verdadeiro luxo não se define pelo excesso, mas pela relevância, pela coerência, pelo cuidado e pela qualidade daquilo que uma experiência faz as pessoas sentir.",
    cta:"Solicitar uma Conversa Confidencial",
    ce:"Para pedidos de informação",
    fo:"Sediada na Europa, ao serviço da excelência em todo o mundo.",
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
  const ref=useRef(null);const v=useInView(ref)||PRERENDER;const d=delay||0;
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

/* The Five Dimensions: vertical panels that open like spines.
   Desktop: hover/click, glow follows the cursor, slow auto-cycle until touched.
   Mobile: stacked, tap to open. */
function Dimensions({dims,mobile}){
  const [active,setActive]=useState(0);
  const [auto,setAuto]=useState(true);
  const [glow,setGlow]=useState({x:50,y:40});
  const ref=useRef(null);
  const seen=useInView(ref);
  useEffect(function(){
    if(!auto||!seen||mobile)return;
    var id=setInterval(function(){setActive(function(a){return (a+1)%dims.length;});},4200);
    return function(){clearInterval(id);};
  },[auto,seen,mobile,dims.length]);
  var pick=function(i){setAuto(false);setActive(i);};
  var move=function(e){
    var r=e.currentTarget.getBoundingClientRect();
    setGlow({x:Math.round((e.clientX-r.left)/r.width*100),y:Math.round((e.clientY-r.top)/r.height*100)});
  };
  var glowBg=function(on){return on?"radial-gradient(circle at "+glow.x+"% "+glow.y+"%, rgba(201,165,92,0.18) 0%, rgba(201,165,92,0.05) 32%, transparent 60%), "+COCOA:"transparent";};

  if(mobile){
    return (
      <div ref={ref} style={{maxWidth:820,margin:"48px auto 0",borderTop:"1px solid "+LINE}}>
        {dims.map(function(d,i){
          var on=active===i;
          return (
            <div key={d.n} role="button" tabIndex={0} onClick={function(){pick(on?-1:i);}} onKeyDown={function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(on?-1:i);}}}
              style={{borderBottom:"1px solid "+LINE,padding:"22px 18px",background:on?"linear-gradient(180deg,rgba(201,165,92,0.10),rgba(201,165,92,0.02)), "+COCOA:"transparent",transition:"background .6s ease",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:18}}>
                <span style={{fontFamily:F,fontSize:15,letterSpacing:".2em",color:GOLD_L,minWidth:28}}>{d.n}</span>
                <span style={{fontFamily:F,fontSize:26,fontWeight:300,color:on?GOLD_L:CREAM,transition:"color .4s"}}>{d.nm}</span>
              </div>
              <div style={{fontFamily:F,fontSize:12,letterSpacing:".18em",textTransform:"uppercase",color:CREAM_M,marginTop:6,paddingLeft:46,fontStyle:"italic"}}>{d.s}</div>
              <div style={{maxHeight:on?520:0,overflow:"hidden",transition:"max-height .8s ease, opacity .5s ease",opacity:on?1:0}}>
                <p style={{fontFamily:F,fontSize:17,color:CREAM_D,lineHeight:1.8,paddingTop:14,paddingLeft:46}}>{d.d}</p>
                {d.v&&<p style={{fontFamily:F,fontSize:16,color:GOLD_L,fontStyle:"italic",lineHeight:1.7,paddingTop:12,paddingLeft:46}}>{d.v}</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} onMouseLeave={function(){}} style={{maxWidth:1120,margin:"56px auto 0",display:"flex",height:"clamp(520px,64vh,660px)",borderTop:"1px solid "+LINE,borderBottom:"1px solid "+LINE}}>
      {dims.map(function(d,i){
        var on=active===i;
        return (
          <div key={d.n} role="button" tabIndex={0} aria-expanded={on}
            onMouseEnter={function(){pick(i);}} onMouseMove={on?move:undefined} onFocus={function(){pick(i);}}
            onKeyDown={function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(i);}}}
            style={{flex:on?"3.4 1 0":"1 1 0",position:"relative",overflow:"hidden",cursor:"pointer",borderRight:i<dims.length-1?"1px solid "+LINE:"none",background:glowBg(on),transition:"flex .9s cubic-bezier(.2,.7,.2,1), background .7s ease",outline:"none"}}>
            {/* numeral */}
            <span style={{position:"absolute",top:28,left:28,fontFamily:F,fontSize:on?"clamp(44px,5vw,64px)":22,fontWeight:300,color:GOLD,opacity:on?.9:.7,letterSpacing:".1em",lineHeight:1,transition:"font-size .9s cubic-bezier(.2,.7,.2,1), opacity .5s"}}>{d.n}</span>
            {/* spine label (closed) */}
            <div style={{position:"absolute",left:0,right:0,bottom:34,display:"flex",justifyContent:"center",opacity:on?0:1,transition:"opacity .35s ease"}}>
              <span style={{writingMode:"vertical-rl",transform:"rotate(180deg)",fontFamily:F,fontSize:"clamp(17px,1.5vw,21px)",letterSpacing:".2em",color:CREAM_D,textTransform:"uppercase",whiteSpace:"nowrap"}}>{d.nm}</span>
            </div>
            {/* open content */}
            <div style={{position:"absolute",left:0,right:0,bottom:0,padding:"0 34px 34px",opacity:on?1:0,transform:on?"translateY(0)":"translateY(14px)",transition:"opacity .7s ease .25s, transform .8s cubic-bezier(.2,.7,.2,1) .25s",pointerEvents:on?"auto":"none"}}>
              <div style={{fontFamily:F,fontSize:12,letterSpacing:".3em",textTransform:"uppercase",color:GOLD_L,marginBottom:10}}>{d.s}</div>
              <h3 style={{fontFamily:F,fontSize:"clamp(30px,3.2vw,42px)",fontWeight:300,color:CREAM,lineHeight:1.1,whiteSpace:"nowrap"}}>{d.nm}</h3>
              <div style={{width:48,height:1,background:"linear-gradient(90deg,"+GOLD+",transparent)",margin:"18px 0 16px"}}/>
              <p style={{fontFamily:F,fontSize:"clamp(16px,1.35vw,19px)",color:CREAM_D,lineHeight:1.75,maxWidth:460}}>{d.d}</p>
              {d.v&&<p style={{fontFamily:F,fontSize:"clamp(15px,1.25vw,18px)",color:GOLD_L,fontStyle:"italic",lineHeight:1.7,maxWidth:460,marginTop:18}}>{d.v}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Small gold plus that turns into a minus when open */
function Plus({on}){
  return <span aria-hidden="true" style={{position:"relative",display:"inline-block",width:12,height:12,flexShrink:0,opacity:on?1:.6,transition:"opacity .3s"}}>
    <span style={{position:"absolute",left:0,right:0,top:5.5,height:1,background:GOLD_L}}/>
    <span style={{position:"absolute",top:0,bottom:0,left:5.5,width:1,background:GOLD_L,transform:on?"scaleY(0)":"scaleY(1)",transition:"transform .35s ease"}}/>
  </span>;
}
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
  const [menu,setMenu]=useState(false);
  const [openSvc,setOpenSvc]=useState(-1);
  const [openStep,setOpenStep]=useState(-1);
  const [sound,setSound]=useState(false);
  const audioRef=useRef(null);
  var fadeTo=function(a,target,ms){
    var start=a.volume, t0=Date.now();
    var step=function(){var k=Math.min(1,(Date.now()-t0)/ms);a.volume=start+(target-start)*k;if(k<1)requestAnimationFrame(step);else if(target===0)a.pause();};
    requestAnimationFrame(step);
  };
  var startSound=function(){
    var a=audioRef.current;if(!a)return;
    a.volume=0;a.loop=true;
    var pr=a.play();
    if(pr&&pr.then){pr.then(function(){setSound(true);fadeTo(a,0.5,3000);}).catch(function(){setSound(false);});}
    else{setSound(true);fadeTo(a,0.5,3000);}
  };
  var toggleSound=function(){
    var a=audioRef.current;if(!a)return;
    if(sound){setSound(false);fadeTo(a,0,900);}else{startSound();}
  };
  var enter=function(withSound){
    if(withSound)startSound();
    setSplash(false);
    try{window.sessionStorage.setItem("ld_seen","1");}catch(e){}
  };
  const mobile=useIsMobile();
  const t=T[lang];

  useEffect(()=>{
    var h=function(){setSc(window.scrollY>60);};
    window.addEventListener("scroll",h);
    return function(){window.removeEventListener("scroll",h);};
  },[]);


  var go=function(id){setMenu(false);var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"});};
  var S=function(text,color){return <h2 style={{fontFamily:F,fontSize:"clamp(28px,4vw,42px)",fontWeight:300,color:color||GOLD_L,letterSpacing:".15em",textAlign:"center",textTransform:"uppercase"}}>{text}</h2>;};
  var P=function(text,extra){return <p style={Object.assign({},{fontFamily:F,fontSize:"clamp(17px,2vw,20px)",lineHeight:1.85,color:CREAM_D,maxWidth:680,margin:"0 auto",textAlign:"center"},extra||{})}>{text}</p>;};

  var pad="clamp(70px,9vw,120px) clamp(24px,6vw,80px)";

  return (
    <div style={{fontFamily:F,background:CHOC,color:CREAM,overflowX:"hidden"}}>
      <style>{"*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:"+CHOC+";-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}section{display:block;position:relative}::selection{background:"+GOLD+";color:"+DEEP+"}a{transition:opacity .3s ease}a:hover{opacity:.75}button{transition:opacity .3s ease}button:hover{opacity:.75}"+
      "@keyframes fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes br{0%,100%{opacity:.25}50%{opacity:.75}}@keyframes xl{from{width:0}to{width:110px}}@keyframes sf{from{opacity:1}to{opacity:0;pointer-events:none}}@keyframes sl{0%{opacity:0;transform:scale(.96)}40%{opacity:1;transform:scale(1)}100%{opacity:1;transform:scale(1)}}"+
      "@keyframes eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}@keyframes foil{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes kb{from{transform:scale(1)}to{transform:scale(1.07)}}"+
      "@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}video{display:none!important}}"}</style>

      {/* Film grain: tactile warmth */}
      <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:90,pointerEvents:"none",opacity:.07,mixBlendMode:"soft-light",backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"}}/>

      <audio ref={audioRef} src="/ambient.mp3" preload="none"/>

      {/* Entrance: logo, one word. A gesture is what lets the music begin. */}
      {splash&&<div style={{position:"fixed",inset:0,background:DEEP,zIndex:9999,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:24,animation:PRERENDER?"sf .7s ease 1.2s forwards":"none"}}>
        <div style={{width:"clamp(220px,40vw,360px)",animation:"sl 1.4s ease forwards"}}><Logo width="100%" drift={false}/></div>
        <div style={{marginTop:"clamp(44px,7vh,72px)",textAlign:"center",animation:"fu 1.2s ease 1.1s both"}}>
          <button onClick={function(){enter(true);}} style={{background:"none",border:"1px solid rgba(201,165,92,0.55)",color:GOLD_L,fontFamily:F,fontSize:14,letterSpacing:".38em",textTransform:"uppercase",padding:"16px 44px 15px 48px",cursor:"pointer"}}>{t.enter}</button>
          <p style={{fontFamily:F,fontSize:12,letterSpacing:".2em",textTransform:"uppercase",color:CREAM_M,marginTop:14}}>{t.withSound}</p>
          <button onClick={function(){enter(false);}} style={{background:"none",border:"none",color:CREAM_M,fontFamily:F,fontSize:13,fontStyle:"italic",cursor:"pointer",marginTop:26,textDecoration:"underline",textUnderlineOffset:4,textDecorationColor:"rgba(251,246,238,0.25)"}}>{t.silence}</button>
        </div>
      </div>}

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
            <button onClick={toggleSound} aria-label={t.sound} aria-pressed={sound} title={t.sound} style={{background:"none",border:"none",cursor:"pointer",padding:"6px 8px",display:"flex",alignItems:"flex-end",gap:3,height:28,opacity:sound?1:.5,transition:"opacity .3s"}}>
              {[0,1,2].map(function(i){return <span key={i} style={{display:"block",width:2,height:sound?14:6,background:GOLD_L,transformOrigin:"bottom",animation:sound?"eq "+(0.9+i*0.25)+"s ease-in-out "+(i*0.15)+"s infinite alternate":"none"}}/>;})}
            </button>
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
        <Dimensions dims={t.dims} mobile={mobile}/>

        {/* FOR: thin gold capsules, revealed one by one */}
        <div style={{marginTop:90}}>
          <FI type="fade">
            <div style={{width:1,height:34,background:"linear-gradient(to bottom,transparent,"+GOLD+")",margin:"0 auto 22px"}}/>
            <p style={{fontFamily:F,fontSize:13,letterSpacing:".4em",color:GOLD_L,textTransform:"uppercase",textAlign:"center",marginBottom:30}}>{t.ft}</p>
          </FI>
          <div style={{maxWidth:760,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"14px"}}>
            {t.fwho.map(function(w,i){
              return (
                <FI key={i} delay={0.15+i*0.12}>
                  <div style={{padding:"11px 26px",borderRadius:40,border:"1px solid rgba(201,165,92,0.55)",background:"rgba(176,136,56,0.04)",transition:"border-color .5s ease, background .5s ease"}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor=GOLD_L;e.currentTarget.style.background="rgba(176,136,56,0.10)";}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(201,165,92,0.55)";e.currentTarget.style.background="rgba(176,136,56,0.04)";}}>
                    <p style={{fontFamily:F,fontSize:"clamp(15px,1.6vw,17px)",letterSpacing:".06em",color:CREAM,whiteSpace:"nowrap"}}>{w}</p>
                  </div>
                </FI>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES: three titles, each opening on click */}
      <section id="services" style={{padding:pad,background:CHOC}}>
        <FI>{S(t.st)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(20px,2.4vw,26px)",fontWeight:300,color:CREAM,textAlign:"center",maxWidth:560,margin:"0 auto 48px"}}>{t.sh}</p></FI>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          {t.svcs.map(function(x,i){
            var on=openSvc===i||PRERENDER;
            return (<FI key={i} delay={0.1+i*0.1} type="fade">
              <div role="button" tabIndex={0} aria-expanded={on} onClick={function(){setOpenSvc(on&&!PRERENDER?-1:i);}}
                onKeyDown={function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();setOpenSvc(on?-1:i);}}}
                style={{cursor:"pointer",padding:"22px 0",textAlign:"center",outline:"none"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:16}}>
                  <h3 style={{fontFamily:F,fontSize:"clamp(26px,3vw,38px)",fontWeight:300,color:on?GOLD_L:CREAM,letterSpacing:".04em",transition:"color .4s ease"}}>{x.t}</h3>
                  <Plus on={on}/>
                </div>
                <div style={{maxHeight:on?300:0,overflow:"hidden",transition:"max-height .7s ease, opacity .5s ease",opacity:on?1:0}}>
                  <div style={{width:40,height:1,background:"linear-gradient(90deg,transparent,"+GOLD+",transparent)",margin:"18px auto 18px"}}/>
                  <p style={{fontFamily:F,fontSize:"clamp(16px,1.8vw,19px)",color:CREAM_D,lineHeight:1.8,maxWidth:600,margin:"0 auto"}}>{x.d}</p>
                </div>
              </div>
            </FI>);
          })}
        </div>
        <FI delay={0.4}>
          <p style={{fontFamily:F,fontSize:15,color:CREAM_M,fontStyle:"italic",textAlign:"center",maxWidth:620,margin:"56px auto 0",lineHeight:1.7}}>{t.sn}</p>
        </FI>
      </section>

      {/* FOUNDER: portrait and story, on cocoa */}
      <section id="founder" style={{padding:pad,background:COCOA}}>
        <FI>{S(t.fdt)}<GL/></FI>
        <div style={{maxWidth:1040,margin:"40px auto 0",display:"grid",gridTemplateColumns:mobile?"1fr":"minmax(260px,0.8fr) 1.2fr",gap:mobile?40:"clamp(40px,6vw,88px)",alignItems:"start"}}>
          <FI type="scale">
            <div style={{position:mobile?"static":"sticky",top:110,maxWidth:mobile?340:"none",margin:mobile?"0 auto":"0"}}>
              <div style={{position:"relative",padding:12}}>
                <div style={{position:"absolute",inset:0,border:"1px solid "+LINE,pointerEvents:"none"}}/>
                <img src="/founder.jpg" alt="Ana Cunha" style={{display:"block",width:"100%",aspectRatio:"4 / 5",objectFit:"cover"}}/>
              </div>
              <p style={{fontFamily:F,fontSize:13,letterSpacing:".3em",color:GOLD_L,textTransform:"uppercase",textAlign:"center",marginTop:22}}>Ana Cunha</p>
              <p style={{fontFamily:F,fontSize:14,color:CREAM_M,textAlign:"center",marginTop:8,lineHeight:1.6,fontStyle:"italic"}}>{t.frole}</p>
            </div>
          </FI>
          <div style={{textAlign:"left"}}>
            {t.fs.map(function(x,i){
              return <FI key={i} delay={0.1+i*0.08}>
                <p style={{fontFamily:F,fontSize:i===0?"clamp(21px,2.4vw,27px)":"clamp(17px,1.9vw,19px)",lineHeight:i===0?1.55:1.85,color:i===0?CREAM:CREAM_D,fontWeight:i===0?300:400,marginBottom:i===0?34:22}}>{x}</p>
              </FI>;
            })}
            <FI delay={0.6}>
              <div style={{width:60,height:1,background:"linear-gradient(90deg,"+GOLD+",transparent)",margin:"12px 0 26px"}}/>
              <p style={{fontFamily:F,fontSize:"clamp(17px,1.9vw,20px)",lineHeight:1.75,color:GOLD_L,fontStyle:"italic"}}>{t.fclose}</p>
            </FI>
          </div>
        </div>
      </section>

      {/* APPROACH: four steps, each opening on click */}
      <section id="approach" style={{padding:pad,background:DEEP}}>
        <FI>{S(t.at)}<GL/></FI>
        <FI delay={0.15}><p style={{fontFamily:F,fontSize:"clamp(20px,2.4vw,26px)",fontWeight:300,color:CREAM_D,textAlign:"center",maxWidth:560,margin:"0 auto 40px"}}>{t.ah}</p></FI>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          {t.steps.map(function(x,i){
            var on=openStep===i||PRERENDER;
            return (<FI key={x.n} delay={i*0.1} type="fade">
              <div role="button" tabIndex={0} aria-expanded={on} onClick={function(){setOpenStep(on&&!PRERENDER?-1:i);}}
                onKeyDown={function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();setOpenStep(on?-1:i);}}}
                style={{cursor:"pointer",padding:"22px 0",outline:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:"clamp(18px,4vw,40px)"}}>
                  <span style={{fontFamily:F,fontSize:"clamp(34px,4.5vw,50px)",fontWeight:300,color:GOLD,lineHeight:1,minWidth:"1.6em",opacity:on?1:.75,transition:"opacity .4s"}}>{x.n}</span>
                  <h3 style={{fontFamily:F,fontSize:"clamp(24px,2.8vw,34px)",fontWeight:300,color:on?GOLD_L:CREAM,letterSpacing:".04em",flex:1,transition:"color .4s ease"}}>{x.t}</h3>
                  <Plus on={on}/>
                </div>
                <div style={{maxHeight:on?300:0,overflow:"hidden",transition:"max-height .7s ease, opacity .5s ease",opacity:on?1:0}}>
                  <p style={{fontFamily:F,fontSize:"clamp(16px,1.8vw,19px)",color:CREAM_D,lineHeight:1.8,paddingTop:14,paddingLeft:"calc(1.6em * 1.3 + clamp(18px,4vw,40px))",maxWidth:640}}>{x.d}</p>
                </div>
              </div>
            </FI>);
          })}
        </div>
      </section>

      {/* DISTINCTION: one statement, the contrast, the terms */}
      <section id="distinction" style={{padding:"clamp(90px,11vw,150px) clamp(24px,6vw,80px)",background:"radial-gradient(ellipse at 50% 40%,"+COCOA+" 0%,"+CHOC+" 70%)"}}>
        <FI type="fade">{S(t.dst)}<GL/></FI>
        <FI delay={0.2}>
          <p style={{fontFamily:F,fontSize:"clamp(24px,3vw,38px)",fontWeight:300,lineHeight:1.35,color:CREAM,textAlign:"center",maxWidth:560,margin:"24px auto 0"}}>{t.dsh}</p>
        </FI>
        <div style={{maxWidth:680,margin:"56px auto 0"}}>
          {t.dsv.map(function(pair,i){
            return <FI key={i} delay={0.3+i*0.12} type="fade">
              <div style={{textAlign:"center",padding:"14px 0"}}>
                <p style={{fontFamily:F,fontSize:"clamp(15px,1.5vw,17px)",color:CREAM_M,letterSpacing:".02em"}}>{pair[0]}</p>
                <p style={{fontFamily:F,fontSize:"clamp(18px,2vw,22px)",color:CREAM,marginTop:4}}>{pair[1]}</p>
              </div>
            </FI>;
          })}
        </div>
        <div style={{height:52}}/>
        <FI delay={0.35}>{P(t.dsb,{maxWidth:620})}</FI>
        <div style={{height:22}}/>
        <FI delay={0.45}>
          {t.dsr.map(function(x,i){return <p key={i} style={{fontFamily:F,fontSize:"clamp(14px,1.4vw,16px)",color:CREAM_M,textAlign:"center",lineHeight:1.9,letterSpacing:".03em"}}>{x}</p>;})}
        </FI>
        <div style={{height:30}}/>
        <FI delay={0.55}>{P(t.dsc,{fontStyle:"italic",color:GOLD_L,fontSize:"clamp(18px,2vw,22px)"})}</FI>
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
            <ContactForm lang={lang} />
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
