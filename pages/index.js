import { useState, useEffect } from 'react';
import Head from 'next/head';

// ── DATA ──
const LESSONS = [
  { id: "Ciy6r9ipwe8", title: "Yarn types & choosing the right hook", tag: "Lesson 1 · Getting Started", desc: "Hook #7 or #9? T-shirt yarn or macaron? Before you pick up your hook — see what works for what and save yourself the headache. 🧶", free: true },
  { id: "g841Ep-z834", title: "Magic ring + Invisible join", tag: "Lesson 2 · Start", desc: "The two techniques without which nothing gets going. The magic ring looks scary — it's actually easy. The invisible join will make your work look professional. ✨", free: true },
  { id: "BOlz_MiFUf0", title: "Second round of a circular base", tag: "Lesson 3 · Circle Base", desc: "Round one is behind you. Now comes the second — and this is exactly where most people make mistakes. Watch carefully where the hook goes. 👀", free: true },
  { id: "gQFpI-fgbNY", title: "How to crochet a circular base", tag: "Lesson 4 · Circle Base", desc: "Once you get the principle — you'll be able to make a circular base of any size without counting from a chart. By heart. 🎯", free: true },
  { id: "FJXBAoBMmjE", title: "How to crochet a triangular base", tag: "Lesson 5 · Triangle Base", desc: "Three corners, three increase points and endless interesting projects. The triangle is easier than it looks! 🔺", free: true },
  { id: "IKMsXQQdaIE", title: "How to crochet a square base", tag: "Lesson 6 · Square Base", desc: "Magic ring with 8 stitches and four corners — here's how the perfect square base is born. Symmetrical, flat, no buckling. ⬛", free: true },
  { id: "RpPcD6Rso4k", title: "Starting a rectangular or oval base", tag: "Lesson 7 · Rectangle Base", desc: "The chain stitch is just the beginning — but it determines everything else. See how to calculate it correctly before you start. 📏", free: true },
  { id: "xax-xhEmKZM", title: "How to crochet a rectangular base", tag: "Lesson 8 · Rectangle Base", desc: "Four corners, 3 stitches in one place and one principle that works for any size. Rectangles have no more secrets. ▬", free: true },
  { id: "CvvWgcUkvU0", title: "How to crochet an oval base", tag: "Lesson 9 · Oval Base", desc: "Almost like the rectangle, just more rounded. The two ends grow like two semicircles — just like a circular base. 🥚", free: true },
  { id: "EJxBoeTbuDw", title: "Finishing round of the base", tag: "Lesson 10 · Technique", desc: "The last round makes all the difference. Learn how to close the base so the end doesn't show — looks like magic. 🪄", free: true },
  { id: "k4tycPMYS3w", title: "What to do when you run out of yarn?", tag: "Bonus 1", desc: "Ran out of yarn in the middle? Don't unravel! There's a technique for invisible joining that no one will notice. 🧵", free: true },
  { id: "-jZlnGqpKwk", title: "Filling holes in the center of rectangular & oval bases", tag: "Bonus 2", desc: "Those annoying little holes in the middle of the base? Here's how to deal with them quickly and easily. 🕳️✅", free: true },
  { id: "JnS4PZB-HD8", title: "Trick for bases that curl and won't lie flat", tag: "Bonus 3", desc: "Base curling up and won't lie flat? One trick and the problem disappears. You'll wonder why you didn't know this sooner! 😅", free: true },
  { id: "D50SO2_wKoc", title: "How to crochet the corners of baskets & bags", tag: "Bonus 4", desc: "The technique for beautiful, tight corners on square and rectangular bases. 📐", free: true },
  { id: "Aecl3DL_ZoA", title: "How to start the walls of your basket", tag: "Bonus 5", desc: "The principle of transitioning from base to walls — how to bring the basket up beautifully and evenly. 📦", free: true },
  { id: "z53Z2Y_e7hc", title: "How to crochet the walls of a basket", tag: "Bonus 6", desc: "How to crochet evenly upward for a beautiful and stable basket. 📦", free: true },
  { id: "aNw89Dr9mhM", title: "Starting a basket with a round wooden base", tag: "Bonus 7", desc: "How to start a basket directly on a round wooden base — step by step. 🪵", free: true },
  { id: "I8pRogfctz8", title: "Filling the holes of a wooden base", tag: "Bonus 8", desc: "How to fill the holes of the wooden base before you start crocheting the walls. 🕳️", free: true },
  { id: "_sHvsdDCI4U", title: "Starting a basket with a square or rectangular wooden base", tag: "Bonus 9", desc: "How to start a basket on a square or rectangular wooden base. 📐", free: true },
  { id: "P78srrHJwNY", title: "Starting a basket with a narrow-hole base", tag: "Bonus 10", desc: "Special technique for bases with narrower holes — no more tangled fingers! 🧵", free: true },
  { id: "pAEyUNAs-eE", title: "How to change colors", tag: "Bonus 11", desc: "Learn how to change yarn colors beautifully and without visible knots. 🌈", free: true },
  { id: "sOB5yXzReQI", title: "Heart-shaped color change", tag: "Bonus 12", desc: "Special technique for changing colors in a heart shape — for unique and beautiful projects. 💙", free: true },
];

const CIRC_SIZES = [3.5, 6.0, 7.8, 9.8, 11.5, 13.3, 15.2, 17.0, 18.9, 20.6];
const SQ_SIZES = [4, 6, 8.5, 10.5, 13, 15, 17.5, 19.5, 21.5, 24];

export default function Home() {
  const [section, setSection] = useState('lessons');
  const [shape, setShape] = useState('circle');
  const [yarn, setYarn] = useState('standard');
  const [unit, setUnit] = useState('cm');
  const [inputVal, setInputVal] = useState(20);
  const [inputVal2, setInputVal2] = useState(15);
  const [result, setResult] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Convert inches to cm if needed
  const toCm = (val) => unit === 'inch' ? val * 2.54 : val;
  const fromCm = (val) => unit === 'inch' ? (val / 2.54).toFixed(1) : val.toFixed(1);
  const unitLabel = unit === 'cm' ? 'cm' : 'inches';

  const yarnMult = { thin: 0.75, standard: 1.0, thick: 1.45 }[yarn] || 1;
  const HOOKS = {
    circle: { thin: 'hook #4, 5, 6', standard: 'hook #6, 7, 8', thick: 'hook #8, 9, 10' },
    square: { thin: 'hook #5, 6, 7', standard: 'hook #7, 8, 9', thick: 'hook #9, 10' },
    triangle: { thin: 'hook #5, 6', standard: 'hook #6, 7, 8', thick: 'hook #8, 9, 10' },
    oval: { thin: 'hook #4, 5', standard: 'hook #6, 7', thick: 'hook #8, 9' },
    rectangle: { thin: 'hook #4, 5', standard: 'hook #6, 7', thick: 'hook #8, 9' },
  };
  const yarnHook = HOOKS[shape]?.[yarn] || '';

  function circSize(r) { return r <= CIRC_SIZES.length ? CIRC_SIZES[r-1] : +(CIRC_SIZES[9]+(r-10)*1.91).toFixed(1); }
  function sqSize(r) { return r <= SQ_SIZES.length ? SQ_SIZES[r-1] : SQ_SIZES[9]+(r-10)*2.2; }
  function circRound(cm) {
    for (let i=0; i<CIRC_SIZES.length; i++) if (CIRC_SIZES[i] >= cm) return i+1;
    return CIRC_SIZES.length + Math.ceil((cm-CIRC_SIZES[9])/1.91);
  }
  function sqRound(cm) {
    for (let i=0; i<SQ_SIZES.length; i++) if (SQ_SIZES[i] >= cm) return i+1;
    return SQ_SIZES.length + Math.ceil((cm-SQ_SIZES[9])/2.2);
  }

  function generate() {
    const v1 = toCm(inputVal);
    const v2 = toCm(inputVal2);
    const rows = [];

    if (shape === 'circle') {
      const n = circRound(v1 / yarnMult);
      for (let r = 1; r <= n; r++) {
        const d = +(circSize(r) * yarnMult).toFixed(1);
        const b = r === 1 ? 6 : 6 + (r-1)*6;
        rows.push({ r, total: b, size: `≈ ${fromCm(d)} ${unitLabel}`, pattern: r===1 ? 'Make a magic ring with 6 sc. Close the round.' : `${b} sc — increase in every ${r}th stitch (2 sc in one, ${r-1} sc in each between)`, tip: r===1 ? '💡 Magic ring = no hole in the center. Pull tight!' : `💡 Round ${r}: 6 increases evenly spread = +6 stitches per round.`, target: r===n });
      }
    } else if (shape === 'square') {
      const n = sqRound(v1 / yarnMult);
      for (let r = 1; r <= n; r++) {
        const s = +(sqSize(r) * yarnMult).toFixed(1);
        const b = r === 1 ? 8 : 8 + (r-1)*8;
        rows.push({ r, total: b, size: `≈ ${fromCm(s)} × ${fromCm(s)} ${unitLabel}`, pattern: r===1 ? 'Magic ring with 8 sc. Each corner = 2 sc in one place.' : `${b} sc — 2 sc in the corner stitches (4 corners × 2 = +8 per round)`, tip: r===1 ? '💡 8 stitches in magic ring = perfect square start.' : `💡 Always increase in the same 4 corner stitches.`, target: r===n });
      }
    } else if (shape === 'triangle') {
      const n = Math.ceil((v1/yarnMult - 4) / 2.1) + 1;
      for (let r = 1; r <= n; r++) {
        const s = +((4 + (r-1)*2.1) * yarnMult).toFixed(1);
        const b = r === 1 ? 9 : 9 + (r-1)*6;
        rows.push({ r, total: b, size: `≈ ${fromCm(s)} ${unitLabel} per side`, pattern: r===1 ? 'Magic ring with 9 sc (3 per corner). 3 sc in each corner stitch.' : `${b} sc — 3 sc in each of the 3 corner stitches`, tip: r===1 ? '💡 Triangle: 3 corners × 3 stitches = 9 start stitches.' : `💡 +6 per round: 3 corners × 2 extra stitches each.`, target: r===n });
      }
    } else if (shape === 'rectangle') {
      const rawL = v1, rawW = v2;
      const targetL = Math.max(rawL, rawW);
      const targetW = Math.min(rawL, rawW);
      const rParams = {
        thin:     { dL: 2.0, dW: 1.5, row1W: 3.0, cmPerSt: 0.83 },
        standard: { dL: 2.5, dW: 2.1, row1W: 4.0, cmPerSt: 1.0  },
        thick:    { dL: 3.0, dW: 2.5, row1W: 4.5, cmPerSt: 1.25 },
      }[yarn] || { dL: 2.5, dW: 2.1, row1W: 4.0, cmPerSt: 1.0 };
      const { dL, dW, row1W, cmPerSt } = rParams;
      let chainSt = 5, bestN = 1;
      for (let ch = 5; ch <= 80; ch++) {
        const n = Math.ceil((targetW - row1W) / dW) + 1;
        const finalL = ch * cmPerSt + (n-1)*dL;
        const finalW = row1W + (n-1)*dW;
        if (finalL >= targetL && finalW >= targetW) { chainSt = ch; bestN = n; break; }
      }
      const n = bestN;
      const longSide = Math.max(1, chainSt - 4);
      for (let r = 1; r <= n; r++) {
        const l = +(chainSt * cmPerSt + (r-1)*dL).toFixed(1);
        const w = +(row1W + (r-1)*dW).toFixed(1);
        const b = r===1 ? chainSt*2-2 : (chainSt*2-2)+(r-1)*8;
        let pattern = '', tip = '';
        if (r===1) { pattern=`Chain ${chainSt} stitches. Important: the first loop on your hook doesn't count — it's just your starting loop. This is your first round.`; tip=`💡 Chain of ${chainSt} = the difference between length and width.`; }
        else if (r===2) { pattern=`Skip 1st hole, start from 2nd. Crochet ${longSide} sc along the top, 3 sc in one place at the corner, ${longSide} sc along the bottom. In the last hole you already have 2 stitches from the start — add only 1 sc to make 3.`; tip=`💡 2 corners with 3 sc each. In the last hole add only 1 — the other 2 are already there.`; }
        else if (r===3) { pattern=`All sc — except at the corners: ${longSide} sc, 3 sc in 1st stitch of the triple, 1 sc in middle, 3 sc in 3rd stitch of the triple, ${longSide} sc. Repeat on other side.`; tip=`💡 Increases on 1st and 3rd stitch of each triple. Middle stays single.`; }
        else { const mid=(r-3)*2+3; const sides=longSide+(r-3); pattern=`All sc — except at 4 corner points: ${sides} sc, 3 sc in middle (2nd) of the triple, ${mid} sc, 3 sc in middle (2nd) of the triple, ${sides} sc. Repeat on other side.`; tip=`💡 From round 4+: triple only on the 2nd stitch of each group. Singles between grow +2 each round.`; }
        rows.push({ r, total: b, size: `≈ ${fromCm(l)} × ${fromCm(w)} ${unitLabel}`, pattern, tip, target: r===n });
      }
    } else if (shape === 'oval') {
      const targetL = v1, targetW = v2;
      const oParams = {
        thin:     { dL: 1.7, dW: 1.5, row1W: 3.0, cmPerSt: 0.83 },
        standard: { dL: 2.3, dW: 2.5, row1W: 4.0, cmPerSt: 1.125 },
        thick:    { dL: 2.5, dW: 2.5, row1W: 4.5, cmPerSt: 1.257 },
      }[yarn] || { dL: 2.3, dW: 2.5, row1W: 4.0, cmPerSt: 1.125 };
      const { dL, dW, row1W, cmPerSt } = oParams;
      let chainSt = 5, bestN = 1;
      for (let ch = 5; ch <= 80; ch++) {
        const n = Math.ceil((targetW - row1W) / dW) + 1;
        const finalL = ch*cmPerSt+(n-1)*dL;
        const finalW = row1W+(n-1)*dW;
        if (finalL >= targetL && finalW >= targetW) { chainSt = ch; bestN = n; break; }
      }
      const n = bestN;
      const longSide = Math.max(1, chainSt - 4);
      for (let r = 1; r <= n; r++) {
        const l = +(chainSt*cmPerSt+(r-1)*dL).toFixed(1);
        const w = +(row1W+(r-1)*dW).toFixed(1);
        const b = r===1 ? chainSt*2-2 : (chainSt*2-2)+(r-1)*6;
        let pattern = '', tip = '';
        if (r===1) { pattern=`Chain ${chainSt} stitches. Important: the first loop on your hook doesn't count. This is your first round.`; tip=`💡 Chain = the difference between length and width.`; }
        else if (r===2) { pattern=`Skip 1st hole, start from 2nd. Crochet ${longSide} sc along the top, 3 sc in one place at the end. Crochet ${longSide} sc along the bottom. In the last hole add only 1 sc (you already have 2 from the start = 3 total).`; tip=`💡 The two rounded ends are like two semicircles — they grow just like a circular base.`; }
        else if (r===3) { pattern=`All sc everywhere. When you reach the rounded ends — in each of the 3 stitches of the previous triple, make 2 sc. Repeat on the other end.`; tip=`💡 3 stitches in the triple × 2 sc each = 6 new stitches total on both ends.`; }
        else { const mid=r-3; pattern=`All sc everywhere. At each rounded end: 2 sc in one, ${mid} sc, 2 sc in one, ${mid} sc, 2 sc in one, ${mid} sc. Repeat on the other end.`; tip=`💡 Each round add 1 more sc between the increases. Straight sides always stay the same.`; }
        rows.push({ r, total: b, size: `≈ ${fromCm(l)} × ${fromCm(w)} ${unitLabel}`, pattern, tip, target: r===n });
      }
    }
    setResult(rows);
  }

  const ytSrc = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;

  const C = {
    cream: '#FDFAF5', blush: '#F2E4DD', gold: '#C9A96E', brown: '#6B4C3B', brown2: '#A8968A',
    line: 'rgba(107,76,59,.15)',
  };

  return (
    <>
      <Head>
        <title>PillowPoint Crochet | Learn to Crochet Baskets with T-Shirt Yarn</title>
        <meta name="description" content="Learn to crochet beautiful baskets with t-shirt yarn. 22 video lessons, interactive base calculator for 5 shapes, and step-by-step instructions. PillowPoint method by Kristina." />
        <meta name="keywords" content="crochet basket, t-shirt yarn, crochet base calculator, learn crochet, basket pattern, macaron yarn, crochet for beginners" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZGCJ6R85GM"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-ZGCJ6R85GM');` }} />
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0;}
          body{font-family:'Montserrat',sans-serif;background:${C.cream};color:${C.brown};}
          :root{--cream:${C.cream};--blush:${C.blush};--gold:${C.gold};--brown:${C.brown};--brown2:${C.brown2};--line:${C.line};}
          @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
          .reveal{animation:fadeUp .7s cubic-bezier(.22,.61,.36,1) forwards;}
          .btn{transition:transform .25s,box-shadow .25s,background .25s;cursor:pointer;}
          .btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px -10px rgba(107,76,59,.4);}
          .btn:active{transform:scale(.98);}
          .card{transition:transform .3s,box-shadow .3s;}
          .card:hover{transform:translateY(-4px);box-shadow:0 24px 50px -24px rgba(107,76,59,.4);}
          html{scroll-behavior:smooth;}
          ::selection{background:rgba(201,169,110,.3);color:${C.brown};}
          ::-webkit-scrollbar{width:8px;}
          ::-webkit-scrollbar-thumb{background:rgba(201,169,110,.4);border-radius:999px;}
          @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
        `}</style>
      </Head>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>

        {/* SIDEBAR */}
        {!isMobile && (
          <aside style={{ width: 230, flexShrink: 0, background: `linear-gradient(180deg,#fff,${C.blush})`, borderRight: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', padding: '28px 0 20px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
            <div style={{ padding: '0 20px 24px', borderBottom: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: 'Dancing Script,cursive', fontSize: 26, fontWeight: 700, color: C.brown }}>Pillow<span style={{ color: C.gold }}>Point</span></div>
              <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 600, marginTop: 2 }}>CROCHET</div>
            </div>
            <nav style={{ padding: '20px 12px', flex: 1 }}>
              {[['lessons', '🎬', 'Video Lessons'], ['generator', '🧮', 'Base Calculator']].map(([s, icon, label]) => (
                <button key={s} onClick={() => setSection(s)} className="btn" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, border: 'none', background: section === s ? C.brown : 'transparent', color: section === s ? C.cream : C.brown2, fontFamily: 'Montserrat', fontSize: 13, fontWeight: 600, marginBottom: 6, textAlign: 'left' }}>
                  <span>{icon}</span>{label}
                </button>
              ))}
            </nav>
            <div style={{ padding: '16px 16px 0', borderTop: `1px solid ${C.line}`, fontSize: 11, color: C.brown2, lineHeight: 1.6 }}>
              © 2026 PillowPoint<br />Made with ❤️ by Kristina
            </div>
          </aside>
        )}

        {/* MOBILE HEADER */}
        {isMobile && (
          <header style={{ background: '#fff', borderBottom: `1px solid ${C.line}`, padding: '14px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Dancing Script,cursive', fontSize: 24, fontWeight: 700, color: C.brown }}>Pillow<span style={{ color: C.gold }}>Point</span> <span style={{ fontSize: 12, letterSpacing: '.15em', color: C.gold }}>CROCHET</span></div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['lessons', '🎬 Lessons'], ['generator', '🧮 Calculator']].map(([s, label]) => (
                <button key={s} onClick={() => setSection(s)} className="btn" style={{ flex: 1, padding: '9px', borderRadius: 10, border: `1.5px solid ${section===s ? C.brown : C.line}`, background: section===s ? C.brown : '#fff', color: section===s ? C.cream : C.brown2, fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </header>
        )}

        {/* MAIN */}
        <main style={{ flex: 1, overflowY: 'auto' }}>

          {/* LESSONS */}
          {section === 'lessons' && (
            <div style={{ padding: isMobile ? '24px 16px 60px' : '40px 48px 80px', maxWidth: 900 }}>
              <h1 className="reveal" style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 32, fontWeight: 600, marginBottom: 6 }}>Video Lessons</h1>
              <p style={{ fontSize: 13, color: C.brown2, marginBottom: 36 }}>Arranged in logical order — from choosing yarn to mastering all base shapes.</p>

              {LESSONS.map((l, i) => (
                <div key={i} className="card" style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden', marginBottom: 24, boxShadow: '0 8px 32px -16px rgba(107,76,59,.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '22px 26px 18px' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg,${C.gold},#d4a96a)`, display: 'grid', placeItems: 'center', fontFamily: 'Cormorant Garamond,serif', fontSize: 18, color: '#fff', flexShrink: 0, fontWeight: 600 }}>{i+1}</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', color: C.gold, fontWeight: 600, display: 'block', marginBottom: 3 }}>{l.tag}</span>
                      <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 21, fontWeight: 600, lineHeight: 1.2, color: C.brown, marginBottom: 6 }}>{l.title}</h3>
                      <p style={{ fontSize: 13, color: C.brown2, lineHeight: 1.6 }}>{l.desc}</p>
                    </div>
                  </div>
                  {playingId === l.id ? (
                    <div style={{ position: 'relative', paddingTop: '56.25%', margin: '0 16px 16px' }}>
                      <iframe src={`${ytSrc(l.id)}&autoplay=1`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, borderRadius: 12 }} allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
                    </div>
                  ) : (
                    <div onClick={() => setPlayingId(l.id)} style={{ position: 'relative', paddingTop: '56.25%', margin: '0 16px 16px', cursor: 'pointer', backgroundImage: `url(https://i.ytimg.com/vi/${l.id}/hqdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 12, overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.3)', display: 'grid', placeItems: 'center' }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,.95)', display: 'grid', placeItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,.3)' }}>
                          <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `20px solid ${C.brown}`, marginLeft: 4 }} />
                        </div>
                      </div>
                    </div>
                  )}
                  {playingId === l.id && (
                    <div style={{ margin: '0 16px 16px', padding: '10px 14px', background: `linear-gradient(90deg,rgba(201,169,110,.08),rgba(201,169,110,.03))`, borderRadius: 10, border: `1px solid rgba(201,169,110,.15)` }}>
                      <p style={{ fontSize: 11.5, color: C.brown2, lineHeight: 1.7, margin: 0 }}>
                        💡 Press <strong style={{ color: C.brown }}>CC</strong> in the top right corner of the video for subtitles in your language. To slow down the video - press <strong style={{ color: C.brown }}>⚙️</strong> and choose a pace that is most comfortable for you. That way you can follow every step in your own rhythm.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* GENERATOR */}
          {section === 'generator' && (
            <div style={{ padding: isMobile ? '24px 16px 60px' : '40px 48px 80px', maxWidth: 860 }}>
              <h1 className="reveal" style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 32, fontWeight: 600, marginBottom: 6 }}>Base Calculator</h1>
              <p style={{ fontSize: 13, color: C.brown2, marginBottom: 36 }}>Choose your shape and size — get exact stitch counts for every round. Based on the PillowPoint method.</p>

              <div style={{ background: '#fff', borderRadius: 20, padding: isMobile ? '24px 18px' : '36px 40px', boxShadow: '0 16px 48px -20px rgba(107,76,59,.18)', border: `1px solid ${C.line}` }}>

                {/* Units */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>Unit of measurement</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[['cm', 'Centimeters (cm)'], ['inch', 'Inches (in)']].map(([u, label]) => (
                      <button key={u} onClick={() => setUnit(u)} className="btn" style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1.5px solid ${unit===u ? C.brown : C.line}`, background: unit===u ? C.brown : '#fff', color: unit===u ? C.cream : C.brown2, fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600 }}>{label}</button>
                    ))}
                  </div>
                </div>

                {/* Shape */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>Base shape</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[['circle','⭕','Circle'],['oval','🥚','Oval'],['square','⬛','Square'],['rectangle','▬','Rectangle'],['triangle','🔺','Triangle']].map(([s,icon,label]) => (
                      <button key={s} onClick={() => { setShape(s); setResult(null); }} className="btn" style={{ padding: '12px 18px', borderRadius: 14, border: `2px solid ${shape===s ? C.gold : C.line}`, background: shape===s ? `linear-gradient(135deg,${C.gold},#d9b87f)` : '#fff', color: shape===s ? '#fff' : C.brown2, fontFamily: 'Montserrat', fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, boxShadow: shape===s ? `0 8px 20px -8px rgba(201,169,110,.5)` : 'none', transform: shape===s ? 'translateY(-1px)' : 'none' }}>
                        <span style={{ fontSize: 15 }}>{icon}</span>{label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Yarn */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>Yarn thickness</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                    {[['thin','Thin','~1 cm / 0.4"'],['standard','Standard','~2 cm / 0.8"'],['thick','Thick','~3 cm / 1.2"']].map(([key,name,sub]) => (
                      <button key={key} onClick={() => setYarn(key)} className="btn" style={{ flex: 1, minWidth: 100, padding: '12px 10px', border: `1.5px solid ${yarn===key ? C.brown : C.line}`, borderRadius: 12, background: yarn===key ? C.brown : '#fff', color: yarn===key ? C.cream : C.brown, fontFamily: 'Montserrat', textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: 13, fontWeight: 600 }}>{name}</span>
                        <span style={{ display: 'block', fontSize: 11, opacity: .7, marginTop: 2 }}>{sub}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(201,169,110,.08)', borderRadius: 10, padding: '10px 14px', border: `1px solid rgba(201,169,110,.2)` }}>
                    <p style={{ fontSize: 12, color: C.brown2, margin: 0, lineHeight: 1.6 }}>
                      💡 <strong style={{ color: C.brown }}>Using high-quality yarn?</strong> Even if it's slightly thinner than usual, choose <strong style={{ color: C.brown }}>Standard</strong> — quality yarn behaves closer to standard measurements.
                    </p>
                  </div>
                  <p style={{ fontSize: 12.5, color: C.gold, fontWeight: 600, marginTop: 12 }}>🪡 Recommended: <strong>{yarnHook}</strong></p>
                </div>

                {/* Size input */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>
                    {{ circle: `Desired diameter (${unitLabel})`, oval: `Desired length (${unitLabel})`, square: `Desired side (${unitLabel})`, rectangle: `Desired length (${unitLabel})`, triangle: `Desired side (${unitLabel})` }[shape]}
                  </p>
                  <input type="number" value={inputVal} onChange={e => setInputVal(Math.min(100, Math.max(1, +e.target.value)))} min={1} max={100} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.line}`, borderRadius: 10, fontFamily: 'Montserrat', fontSize: 14, color: C.brown, marginBottom: 14 }} />
                  {(shape === 'rectangle' || shape === 'oval') && (
                    <>
                      <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.gold, marginBottom: 10 }}>Desired width ({unitLabel})</p>
                      <input type="number" value={inputVal2} onChange={e => setInputVal2(Math.min(100, Math.max(1, +e.target.value)))} min={1} max={100} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.line}`, borderRadius: 10, fontFamily: 'Montserrat', fontSize: 14, color: C.brown, marginBottom: 14 }} />
                    </>
                  )}
                  <button onClick={generate} className="btn" style={{ width: '100%', padding: 13, border: 'none', borderRadius: 10, background: C.brown, color: C.cream, fontFamily: 'Montserrat', fontSize: 13, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                    Calculate →
                  </button>
                </div>

                {/* Results */}
                {result && (
                  <div style={{ marginTop: 28 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${C.line}` }}>
                          {['Round','Stitches','Size','Instructions'].map(h => (
                            <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: C.gold, fontFamily: 'Montserrat', fontWeight: 600 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.map((row, i) => (
                          <tr key={i} style={{ background: row.target ? `linear-gradient(90deg,rgba(201,169,110,.12),rgba(201,169,110,.04))` : i%2===0 ? 'rgba(253,250,245,.6)' : '#fff', borderBottom: `1px solid ${C.line}` }}>
                            <td style={{ padding: '14px 12px', fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, color: row.target ? C.gold : C.brown }}>{row.r}{row.target ? ' ✓' : ''}</td>
                            <td style={{ padding: '14px 12px', fontSize: 15, fontWeight: 700, color: C.brown }}>{row.total}</td>
                            <td style={{ padding: '14px 12px', fontSize: 13, color: C.brown2, whiteSpace: 'nowrap' }}>{row.size}</td>
                            <td style={{ padding: '14px 12px' }}>
                              <p style={{ fontSize: 12.5, color: C.brown, lineHeight: 1.6, marginBottom: 4 }}>{row.pattern}</p>
                              <p style={{ fontSize: 11.5, color: C.brown2, lineHeight: 1.5 }}>{row.tip}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 20, padding: '14px 18px', background: `linear-gradient(90deg,rgba(201,169,110,.1),rgba(201,169,110,.04))`, borderRadius: 12, border: `1px solid rgba(201,169,110,.2)` }}>
                      <p style={{ fontSize: 12, color: C.brown2, lineHeight: 1.7, margin: 0 }}>
                        ✨ <strong style={{ color: C.brown }}>These calculations are based on my personal formula</strong>, tested across different yarn sizes and measurements. Small variations of up to 1 cm are completely normal — every yarn is different, everyone crochets differently, with different hooks and different tension. The calculator gives you the closest possible result, but 100% precision isn't possible unless we all crochet with the exact same yarn, hook, and tension. 😊 Always check your size before the last round!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
