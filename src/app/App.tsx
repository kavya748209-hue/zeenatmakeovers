import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Menu, X, Star, Phone, MapPin, Instagram, MessageCircle,
  Sparkles, Heart, Award, Clock, Users, Camera, ChevronRight,
  ChevronDown, Check, Calendar, Quote, Gem
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ── Photos — ZEENAT Makeup Studio ─────────────────────────────────────────────
import heroPhoto  from "@/imports/zeenat-01.png";
import imgP1      from "@/imports/zeenat-02.png";
import imgP2      from "@/imports/zeenat-03.png";
import imgP3      from "@/imports/zeenat-04.png";
import imgP4      from "@/imports/zeenat-05.png";
import imgP5      from "@/imports/zeenat-06.png";
import imgP6      from "@/imports/zeenat-07.png";
import imgP7      from "@/imports/zeenat-08.png";
import imgP8      from "@/imports/zeenat-09.png";
import imgP9      from "@/imports/zeenat-10.png";
import imgP10     from "@/imports/zeenat-11.png";

// ── Brand constants ────────────────────────────────────────────────────────────
const BRAND        = "ZEENAT Makeup Studio";
const TAGLINE      = "Professional Makeup Artist in Chittorgarh";
const ADDR_FULL    = "100, Fit Ring Road, Sector No. 5, Gandhi Nagar, Chittorgarh, Rajasthan 312001";
const PHONE_DISP   = "06378913760";
const PHONE_TEL    = "+916378913760";
const PHONE_WA     = "916378913760";
const INSTA_URL    = "https://instagram.com";
const INSTA_HANDLE = "instagram.com";
const MAP_SRC      = "https://www.google.com/maps?q=100%2C%20Fit%20Ring%20Road%2C%20Sector%20No.%205%2C%20Gandhi%20Nagar%2C%20Chittorgarh%2C%20Rajasthan%20312001&output=embed";

// ── Nav ────────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home",     href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Gallery",  href: "#gallery" },
  { label: "Why Us",   href: "#whyus" },
  { label: "Reviews",  href: "#reviews" },
  { label: "Book Now", href: "#appointment" },
  { label: "Contact",  href: "#contact" },
];

// ── Services ───────────────────────────────────────────────────────────────────
const services = [
  { icon: "💍", title: "Bridal Makeup",          price: "₹7,000 onwards",  tag: "Most Popular", desc: "Flawless, long-lasting bridal looks — from classic Rajasthani traditions to contemporary styles — crafted for the most important day of your life." },
  { icon: "✨", title: "HD & Airbrush Makeup",   price: "₹4,500 onwards",  tag: "Premium",      desc: "Camera-perfect, weightless finish with professional airbrush technology. Stays flawless through every ceremony, photo, and video moment." },
  { icon: "💎", title: "Engagement Makeup",      price: "₹4,000 onwards",  tag: "",             desc: "Radiant, glowing looks that make you shine with confidence as you step into your most beautiful new chapter." },
  { icon: "🌸", title: "Party & Event Makeup",   price: "₹2,000 onwards",  tag: "",             desc: "Bold and glamorous for cocktail parties, sangeet, mehndi, and all festive events that deserve a show-stopping look." },
  { icon: "🪷", title: "Traditional Look",       price: "₹2,500 onwards",  tag: "",             desc: "Authentic traditional looks for Haldi, Mehndi, and Rajasthani ceremonies with a perfect blend of roots and elegance." },
  { icon: "👑", title: "Pre-Bridal Package",     price: "₹12,000 onwards", tag: "Package",      desc: "Complete pre-bridal pampering — skin prep, hair trial, makeup trial, and a dedicated consultation for your dream bridal day." },
];

// ── Why Us ─────────────────────────────────────────────────────────────────────
const whyUs = [
  { icon: Award,    title: "6+ Years of Expertise",   desc: "Six years perfecting the art of bridal and editorial makeup in Chittorgarh — creating hundreds of flawless looks for brides across Rajasthan." },
  { icon: Sparkles, title: "Luxury Products Only",    desc: "We use MAC, Charlotte Tilbury, NARS, Huda Beauty, and Schwarzkopf exclusively — premium formulas that respect and beautify your skin." },
  { icon: Heart,    title: "Personalized Artistry",   desc: "Each client receives a one-on-one consultation tailored to your face shape, skin tone, outfit, and the story you want to tell." },
  { icon: Camera,   title: "Photo & Video Ready",     desc: "Every technique is precision-tuned for HD photography and videography — so every captured moment looks magazine-perfect." },
  { icon: Clock,    title: "Always On Time",          desc: "We arrive fully equipped and prepared at your home or venue — on schedule, every time — so you can focus purely on your joy." },
  { icon: Users,    title: "400+ Happy Brides",       desc: "A portfolio built on trust, word-of-mouth love, and the pure joy of seeing every bride fall completely in love with her reflection." },
];

// ── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "400+", label: "Happy Brides",       icon: Heart },
  { value: "6+",   label: "Years Experience",   icon: Award },
  { value: "900+", label: "Looks Created",      icon: Camera },
  { value: "99%",  label: "Satisfaction Rate",  icon: Star },
];

// ── Reviews ────────────────────────────────────────────────────────────────────
const reviews = [
  { name: "Priya Yadav",     role: "Bride, March 2025",          rating: 5, avatar: "PY", text: "ZEENAT di is hands down the best makeup artist in Chittorgarh! My bridal look was absolutely breathtaking — exactly what I had visualised, but even more beautiful. The makeup stayed flawless through an 8-hour ceremony. Every guest asked for her number!" },
  { name: "Neha Malik",      role: "Engagement, January 2025",   rating: 5, avatar: "NM", text: "I was so nervous but ZEENAT made me feel so calm and beautiful. My engagement look was glowing, natural yet stunning. She truly understood my personality and my outfit perfectly. Couldn't have asked for anyone better in all of Rajasthan!" },
  { name: "Pooja Sharma",    role: "Sangeet Ceremony, 2024",     rating: 5, avatar: "PS", text: "The Sangeet look ZEENAT created for me was on another level — bold, vibrant, and perfectly matching my lehenga. I danced all night and the makeup didn't budge even once! Incredibly talented and such a warm, professional person." },
  { name: "Ritu Garg",       role: "Bride, November 2024",       rating: 5, avatar: "RG", text: "ZEENAT Makeup Studio is the only name you need in Chittorgarh for bridal makeup. She created the most authentic traditional Rajasthani bridal look for me and I cried happy tears when I saw my reflection. Pure artistry!" },
  { name: "Kavya Ahlawat",   role: "Pre-Bridal Package, 2025",   rating: 5, avatar: "KA", text: "I did the full pre-bridal package and it was worth every rupee. The skin prep sessions, the trial, the consultation — everything was so thorough and professional. On my wedding day I felt like the most beautiful version of myself." },
];

// ── Compliment data ────────────────────────────────────────────────────────────
const featuredQuotes = [
  { text: "Walking into ZEENAT's studio feels like entering a different world. Her hands are magic — she looked at my face and immediately knew what would make me shine. On my wedding day, I felt like an absolute queen. Chittorgarh's finest, without a doubt.", name: "Divya Hooda",   role: "Bride · December 2024", photo: imgP3 },
  { text: "I had my bridal makeup done by three different artists for trials. The moment ZEENAT worked on me, I cancelled the rest. There was simply no comparison. Her understanding of skin tones, lighting, and traditional jewellery is extraordinary.", name: "Sonia Chaudhary", role: "Bride · February 2025",  photo: imgP8 },
];

const loveLetters = [
  { text: "The most natural-looking HD makeup I have ever seen — glowing perfection.", name: "Anjali S., Chittorgarh" },
  { text: "Still getting DMs about my engagement look two months later!", name: "Taruna R., Jhajjar" },
  { text: "She arrived 30 minutes early, fully prepared — absolute professional.", name: "Meena K., Hisar" },
  { text: "Chittorgarh's best. My entire family now books only ZEENAT for every event.", name: "Reena V., Chittorgarh" },
  { text: "The airbrush makeup was so light I forgot I was wearing any — but it was flawless!", name: "Pinky D., Bahadurgarh" },
  { text: "She matched my look to my lehenga perfectly. Pure genius.", name: "Sapna J., Chittorgarh" },
  { text: "My mother-in-law said it was the best bridal makeup she had ever seen in 40 years!", name: "Komal M., Sonipat" },
  { text: "I trust no one else with my face. ZEENAT is my forever artist.", name: "Nisha P., Chittorgarh" },
];

const pressQuotes = [
  { outlet: "Chittorgarh Tribune",  quote: "ZEENAT Makeup Studio has quietly become Chittorgarh's most sought-after bridal makeup destination — known for flawless artistry and unmatched client care." },
  { outlet: "Bridal Rajasthan",  quote: "A name that every Rajasthan bride should know — ZEENAT creates looks that balance tradition, elegance, and modern glamour beautifully." },
  { outlet: "Gandhi Nagar Buzz", quote: "The go-to studio in Gandhi Nagar — ZEENAT's work speaks through the glowing faces of hundreds of brides across the region." },
];

// ── Gallery ────────────────────────────────────────────────────────────────────
const galleryImages = [
  { src: imgP1,  alt: "Award-winning beauty artist at the Beauty Icon Award Show" },
  { src: imgP2,  alt: "Elegant purple bridal makeup look" },
  { src: imgP3,  alt: "Colorful festive makeup and hair look" },
  { src: imgP4,  alt: "Classic red bridal makeup look" },
  { src: imgP5,  alt: "Natural glam bridal portrait" },
  { src: imgP6,  alt: "Royal purple bridal portrait" },
  { src: imgP7,  alt: "Traditional red bridal jewellery look" },
  { src: imgP8,  alt: "Contemporary festive fashion and makeup" },
  { src: imgP9,  alt: "Outdoor festive beauty portrait" },
  { src: imgP10, alt: "Signature bridal glam portrait" },
  { src: heroPhoto, alt: "ZEENAT Makeup Studio signature beauty portrait" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

function Ornament() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, margin:"4px 0" }}>
      <div style={{ width:28, height:1, background:"linear-gradient(90deg,transparent,#C9963A)" }} />
      <div style={{ width:5, height:5, background:"#C9963A", transform:"rotate(45deg)", flexShrink:0 }} />
      <div style={{ width:14, height:1, background:"#C9963A" }} />
      <div style={{ width:6, height:6, borderRadius:"50%", border:"1.5px solid #C9963A", flexShrink:0 }} />
      <div style={{ width:14, height:1, background:"#C9963A" }} />
      <div style={{ width:5, height:5, background:"#C9963A", transform:"rotate(45deg)", flexShrink:0 }} />
      <div style={{ width:28, height:1, background:"linear-gradient(90deg,#C9963A,transparent)" }} />
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:7, marginBottom:10 }}>
      <Ornament />
      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"#C9963A", fontWeight:700 }}>{children}</span>
      <Ornament />
    </div>
  );
}

// colour tokens
const PR = "#722048";   // deep berry-rose
const GD = "#C9963A";   // warm antique gold
const BG = "#FDF8F4";   // warm ivory

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [form,          setForm]          = useState({ name:"", phone:"", email:"", service:"", date:"", time:"", message:"" });
  const [submitted,     setSubmitted]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name:"", phone:"", email:"", service:"", date:"", time:"", message:"" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", background:BG, color:"#090205", overflowX:"hidden" }}>

      {/* ── GLOBAL STYLES ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes orb1  { 0%{transform:translate3d(0,0,0)scale(1)}   45%{transform:translate3d(58px,-72px,38px)scale(1.1)}  100%{transform:translate3d(0,0,0)scale(1)} }
        @keyframes orb2  { 0%{transform:translate3d(0,0,0)scale(1)}   33%{transform:translate3d(-68px,58px,28px)scale(.93)} 66%{transform:translate3d(42px,-48px,-18px)scale(1.07)} 100%{transform:translate3d(0,0,0)scale(1)} }
        @keyframes orb3  { 0%{transform:translate3d(0,0,0)}           50%{transform:translate3d(78px,68px,22px)}             100%{transform:translate3d(0,0,0)} }
        @keyframes orb4  { 0%{transform:translate3d(0,0,0)rotate(0)}  50%{transform:translate3d(-48px,-62px,32px)rotate(180deg)} 100%{transform:translate3d(0,0,0)rotate(360deg)} }
        @keyframes shimG { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes shimW { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes glow  { 0%,100%{box-shadow:0 0 38px rgba(114,32,72,.22),0 0 78px rgba(201,150,58,.1)} 50%{box-shadow:0 0 62px rgba(114,32,72,.44),0 0 125px rgba(201,150,58,.2)} }
        @keyframes floatA{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes floatB{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
        @keyframes mq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes rotR  { from{transform:translate(-50%,-50%)rotate(0)} to{transform:translate(-50%,-50%)rotate(360deg)} }

        .oa{animation:orb1 21s ease-in-out infinite}
        .ob{animation:orb2 27s ease-in-out infinite}
        .oc{animation:orb3 18s ease-in-out infinite}
        .od{animation:orb4 31s ease-in-out infinite}
        .oe{animation:orb1 24s ease-in-out infinite 5s reverse}
        .of{animation:orb3 20s ease-in-out infinite 3s reverse}
        .og{animation:orb2 35s ease-in-out infinite 8s}
        .oh{animation:orb4 17s ease-in-out infinite 2s}

        .sg{background:linear-gradient(90deg,#722048,#C9963A,#E8C07A,#C9963A,#722048);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimG 5s linear infinite}
        .sw{background:linear-gradient(90deg,#fff,rgba(255,255,255,.7),#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimW 4s linear infinite}

        .gl{background:rgba(255,253,250,.66);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid rgba(201,150,58,.18)}
        .gn{background:rgba(253,248,244,.93);backdrop-filter:blur(26px);-webkit-backdrop-filter:blur(26px);border-bottom:1px solid rgba(201,150,58,.17)}

        .cl{transition:transform .42s cubic-bezier(.22,1,.36,1),box-shadow .42s ease}
        .cl:hover{transform:translateY(-7px) scale(1.01);box-shadow:0 28px 56px rgba(114,32,72,.13),0 6px 14px rgba(201,150,58,.1)}

        .hg{animation:glow 4s ease-in-out infinite}
        .fa{animation:floatA 3.5s ease-in-out infinite}
        .fb{animation:floatB 4s ease-in-out infinite}
        .mqt{animation:mq 32s linear infinite}
        .rr{animation:rotR 44s linear infinite}

        .gi{transition:transform .52s cubic-bezier(.22,1,.36,1)}
        .gw:hover .gi{transform:scale(1.07)}
        .go{opacity:0;transition:opacity .32s}
        .gw:hover .go{opacity:1}

        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${BG}}
        ::-webkit-scrollbar-thumb{background:${GD};border-radius:2px}
        input:focus,textarea:focus,select:focus{outline:none;border-color:${PR}!important;box-shadow:0 0 0 3px rgba(114,32,72,.1)}

        .mobile-nav-toggle{display:none}
        nav, nav button{font-family:'Jost',sans-serif!important}

        @media(max-width:768px){
          .dn{display:none!important}
          .mobile-nav-toggle{display:flex!important;align-items:center;justify-content:center;padding:7px 9px}
          .hg2{grid-template-columns:1fr!important}
          .f2c{grid-template-columns:1fr!important}
          .cp{padding:36px 22px!important}
          .sg4{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* ── 3-D ORB BACKGROUND ───────────────────────────────────────────────── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-14%", left:"-8%", width:680, height:680, borderRadius:"50%", background:`radial-gradient(circle at 40% 40%,rgba(201,150,58,.15) 0%,rgba(114,32,72,.07) 50%,transparent 70%)`, filter:"blur(58px)" }} />
        <div style={{ position:"absolute", top:"32%", right:"-11%", width:760, height:620, borderRadius:"50%", background:`radial-gradient(circle at 55% 55%,rgba(248,228,242,.5) 0%,rgba(114,32,72,.05) 55%,transparent 70%)`, filter:"blur(68px)" }} />
        <div style={{ position:"absolute", bottom:"-9%", left:"23%", width:700, height:460, borderRadius:"50%", background:`radial-gradient(circle at 50% 50%,rgba(201,150,58,.13) 0%,transparent 70%)`, filter:"blur(76px)" }} />
        {[
          { cls:"oa", s:128, style:{ top:"7%",    left:"9%" } },
          { cls:"ob", s:88,  style:{ top:"22%",   right:"12%" } },
          { cls:"oc", s:195, style:{ top:"47%",   left:"4%" } },
          { cls:"od", s:62,  style:{ top:"68%",   right:"7%" } },
          { cls:"oe", s:108, style:{ bottom:"21%",left:"27%" } },
          { cls:"of", s:52,  style:{ top:"80%",   right:"21%" } },
          { cls:"og", s:158, style:{ top:"13%",   left:"41%" } },
          { cls:"oh", s:72,  style:{ bottom:"37%",right:"36%" } },
          { cls:"ob", s:33,  style:{ top:"54%",   left:"57%" } },
          { cls:"oa", s:45,  style:{ bottom:"41%",left:"49%" } },
        ].map((o,i) => (
          <div key={i} className={o.cls} style={{ position:"absolute", width:o.s, height:o.s, ...o.style, borderRadius:"50%", background:`radial-gradient(circle at 33% 33%,rgba(255,255,255,.95) 0%,rgba(248,210,232,.75) 35%,rgba(114,32,72,.38) 75%)`, boxShadow:`0 0 ${o.s*.4}px rgba(114,32,72,.3),0 0 ${o.s*.2}px rgba(201,150,58,.18),inset 0 0 ${o.s*.25}px rgba(255,255,255,.22)`, filter:o.s>120?"blur(1.5px)":undefined }} />
        ))}
      </div>

      {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, transition:"all .4s" }} className={scrolled?"gn":""}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:scrolled?"12px 24px":"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"padding .4s" }}>

          <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ duration:.6 }}
            style={{ cursor:"pointer" }} onClick={() => goTo("#hero")}>
            <div className="sg" style={{ fontFamily:"'Jost',sans-serif", fontSize:"1.18rem", fontWeight:800, lineHeight:1.2, letterSpacing:"-0.01em" }}>{BRAND}</div>
            <div style={{ fontSize:"0.57rem", letterSpacing:"0.3em", textTransform:"uppercase", color:GD, fontWeight:700, marginTop:2 }}>Makeup Artist · Chittorgarh, Rajasthan</div>
          </motion.div>

          <ul className="dn" style={{ display:"flex", gap:2, listStyle:"none", margin:0, padding:0 }}>
            {navLinks.slice(0,-1).map(l=>(
              <li key={l.href}>
                <button onClick={() => goTo(l.href)} style={{ padding:"8px 12px", background:"none", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.04em", color:"rgba(9,2,5,.58)", transition:"color .2s", fontFamily:"'Jost',sans-serif" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=PR)} onMouseLeave={e=>(e.currentTarget.style.color="rgba(9,2,5,.58)")}>{l.label}</button>
              </li>
            ))}
          </ul>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={() => goTo("#appointment")} className="dn"
              style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 22px", borderRadius:999, fontSize:"0.76rem", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:"#fff", border:"none", cursor:"pointer", background:`linear-gradient(135deg,${PR},#c8456c,${GD})`, boxShadow:"0 4px 18px rgba(114,32,72,.3)", transition:"transform .2s,box-shadow .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 8px 30px rgba(114,32,72,.44)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 18px rgba(114,32,72,.3)";}}>
              <Sparkles size={12}/> Book Now
            </button>
            <button className="mobile-nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:PR, fontFamily:"'Jost',sans-serif" }}>
              {menuOpen ? <X size={23}/> : <Menu size={23}/>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
              className="gn" style={{ overflow:"hidden" }}>
              <div style={{ padding:"10px 16px 18px", display:"flex", flexDirection:"column", gap:2 }}>
                {navLinks.map(l=>(
                  <button key={l.href} onClick={() => goTo(l.href)}
                    style={{ textAlign:"left", padding:"12px 16px", borderRadius:10, background:"none", border:"none", cursor:"pointer", fontSize:"0.88rem", fontWeight:500, color:"rgba(9,2,5,.72)", fontFamily:"'Jost',sans-serif" }}
                    onMouseEnter={e=>(e.currentTarget.style.background=`rgba(114,32,72,.06)`)} onMouseLeave={e=>(e.currentTarget.style.background="none")}>{l.label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:100, zIndex:1 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", width:"100%" }}>
          <div className="hg2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:52, alignItems:"center", minHeight:"82vh" }}>

            {/* Text */}
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:.55,delay:.12 }}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:999, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.09em", textTransform:"uppercase", color:PR, background:`rgba(114,32,72,.07)`, border:`1px solid rgba(114,32,72,.2)`, marginBottom:22, width:"fit-content" }}>
                <Gem size={12} color={GD}/> Premium Makeup Artist · Chittorgarh, Rajasthan
              </motion.div>

              <motion.h1 initial={{ opacity:0,y:34,filter:"blur(14px)" }} animate={{ opacity:1,y:0,filter:"blur(0)" }} transition={{ duration:1,delay:.22 }}
                style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem,5vw,4.8rem)", fontWeight:900, lineHeight:1.05, marginBottom:8, color:"#090205" }}>
                Where Beauty<br /><em className="sg" style={{ fontStyle:"normal" }}>Meets Art</em>
              </motion.h1>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.6,delay:.36 }} style={{ marginBottom:18 }}>
                <Ornament />
              </motion.div>

              <motion.p initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:.7,delay:.44 }}
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontStyle:"italic", color:`${PR}cc`, marginBottom:16, lineHeight:1.5 }}>
                {BRAND}
              </motion.p>

              <motion.p initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:.7,delay:.54 }}
                style={{ fontSize:"0.96rem", lineHeight:1.78, color:"rgba(9,2,5,.52)", marginBottom:36, maxWidth:460 }}>
                Chittorgarh&apos;s most trusted bridal makeup artist — crafting timeless looks with precision, passion, and premium products. Because your most beautiful moment deserves nothing less than perfection.
              </motion.p>

              <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:.7,delay:.64 }}
                style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:46 }}>
                <button onClick={() => goTo("#appointment")}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 32px", borderRadius:999, fontWeight:700, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:"#fff", background:`linear-gradient(135deg,${PR},#c8456c,${GD})`, border:"none", cursor:"pointer", boxShadow:"0 8px 30px rgba(114,32,72,.32)", transition:"transform .2s,box-shadow .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 16px 44px rgba(114,32,72,.46)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 30px rgba(114,32,72,.32)";}}>
                  <Calendar size={16}/> Book Appointment
                </button>
                <button onClick={() => goTo("#gallery")}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"14px 26px", borderRadius:999, fontWeight:600, fontSize:"0.83rem", letterSpacing:"0.06em", textTransform:"uppercase", color:PR, background:`rgba(114,32,72,.06)`, border:`1.5px solid rgba(114,32,72,.26)`, cursor:"pointer", transition:"background .2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background=`rgba(114,32,72,.12)`)} onMouseLeave={e=>(e.currentTarget.style.background=`rgba(114,32,72,.06)`)}>
                  <Camera size={16}/> View Gallery <ChevronRight size={14}/>
                </button>
              </motion.div>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8,delay:.82 }}
                style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
                {stats.slice(0,3).map(s=>(
                  <div key={s.label}>
                    <div className="sg" style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:800, lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:"0.68rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(9,2,5,.42)", marginTop:4 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Photo */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative" }}>
              {[400,472,544].map(d=>(
                <div key={d} style={{ position:"absolute", width:d, height:d, borderRadius:"50%", border:`1px solid rgba(201,150,58,${d===400?.2:d===472?.12:.07})`, top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
              ))}
              <div className="rr" style={{ position:"absolute", width:458, height:458, borderRadius:"50%", border:"1px dashed rgba(201,150,58,.2)", top:"50%", left:"50%", pointerEvents:"none" }} />

              <motion.div initial={{ opacity:0,scale:.84,y:24 }} animate={{ opacity:1,scale:1,y:0 }} transition={{ duration:1.1,delay:.38,ease:[.22,1,.36,1] }} style={{ position:"relative" }}>
                <div style={{ position:"absolute", inset:0, borderRadius:"2.5rem", background:`radial-gradient(circle at 50% 60%,rgba(201,150,58,.35) 0%,transparent 70%)`, filter:"blur(26px)", transform:"scale(1.1)" }} />

                <div className="hg" style={{ position:"relative", borderRadius:"2.5rem", overflow:"hidden", width:"clamp(260px,32vw,360px)", height:"clamp(340px,44vw,475px)", border:`2px solid rgba(201,150,58,.32)`, background:"rgba(248,228,242,.3)" }}>
                  <ImageWithFallback src={heroPhoto} alt={`${BRAND} — Professional Makeup Artist in Chittorgarh`} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 55%,rgba(114,32,72,.1) 100%)", pointerEvents:"none" }} />
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 18px 14px", background:"linear-gradient(to top,rgba(15,4,9,.72) 0%,transparent 100%)" }}>
                    <div style={{ fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(232,192,122,.9)", fontWeight:600 }}>Chittorgarh&apos;s Most Trusted Studio</div>
                  </div>
                </div>

                <div className="fa gl" style={{ position:"absolute", bottom:-18, left:-26, borderRadius:18, padding:"12px 18px", boxShadow:"0 16px 40px rgba(114,32,72,.18)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${PR},${GD})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Award size={16} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.74rem", color:"#090205" }}>Certified Pro</div>
                      <div style={{ fontSize:"0.63rem", color:GD }}>Makeup Artist</div>
                    </div>
                  </div>
                </div>

                <div className="fb gl" style={{ position:"absolute", top:-16, right:-24, borderRadius:18, padding:"10px 16px", boxShadow:"0 14px 36px rgba(114,32,72,.15)" }}>
                  <div style={{ display:"flex", gap:3, marginBottom:3 }}>
                    {[1,2,3,4,5].map(j=><Star key={j} size={11} style={{ fill:"#f59e0b",color:"#f59e0b" }} />)}
                  </div>
                  <div style={{ fontWeight:700, fontSize:"0.69rem", color:"#090205" }}>400+ Brides</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2.2,repeat:Infinity }} onClick={() => goTo("#services")}
          style={{ position:"absolute", bottom:30, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer", zIndex:2 }}>
          <span style={{ fontSize:"0.63rem", letterSpacing:"0.26em", textTransform:"uppercase", color:"rgba(9,2,5,.32)" }}>Explore</span>
          <ChevronDown size={17} color={GD} />
        </motion.div>
      </section>

      {/* ── COMPLIMENT ZONE 1 — MARQUEE TICKER ──────────────────────────────── */}
      <div style={{ position:"relative", zIndex:1, padding:"22px 0", overflow:"hidden", borderTop:`1px solid rgba(201,150,58,.15)`, borderBottom:`1px solid rgba(201,150,58,.15)`, background:"rgba(255,253,250,.58)", backdropFilter:"blur(8px)" }}>
        <div className="mqt" style={{ display:"flex", gap:48, width:"max-content" }}>
          {[...loveLetters,...loveLetters].map((q,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
              <Star size={10} style={{ fill:GD,color:GD }} />
              <span style={{ fontSize:"0.8rem", fontWeight:500, color:"rgba(9,2,5,.62)", whiteSpace:"nowrap" }}>
                "{q.text}"&nbsp;<span style={{ color:GD }}>— {q.name}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section style={{ position:"relative", zIndex:1, padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <div className="gl" style={{ borderRadius:28, padding:"42px 36px", boxShadow:"0 18px 55px rgba(114,32,72,.08),0 4px 10px rgba(201,150,58,.08)" }}>
              <div className="sg4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
                {stats.map((s,i)=>{
                  const Icon = s.icon;
                  return (
                    <Reveal key={s.label} delay={i*.1}>
                      <div>
                        <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
                          <div style={{ width:44, height:44, borderRadius:14, background:`linear-gradient(135deg,rgba(114,32,72,.1),rgba(201,150,58,.14))`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Icon size={20} color={GD} />
                          </div>
                        </div>
                        <div className="sg" style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,2.8vw,2.5rem)", fontWeight:800, lineHeight:1 }}>{s.value}</div>
                        <div style={{ fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(9,2,5,.42)", marginTop:6 }}>{s.label}</div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section id="services" style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <SectionEyebrow>What We Offer</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Our <span className="sg">Signature Services</span>
            </h2>
            <p style={{ color:"rgba(9,2,5,.48)", marginTop:14, maxWidth:500, margin:"14px auto 0", lineHeight:1.75, fontSize:"0.92rem" }}>
              Professional makeup services in Chittorgarh — from bridal perfection to everyday glamour.
            </p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(282px,1fr))", gap:20 }}>
            {services.map((s,i)=>(
              <Reveal key={s.title} delay={i*.07}>
                <div className="cl gl" style={{ borderRadius:24, padding:"28px 24px", position:"relative", overflow:"hidden" }}>
                  {s.tag && <span style={{ position:"absolute", top:14, right:14, fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 11px", borderRadius:999, color:"#fff", background:`linear-gradient(135deg,${PR},${GD})` }}>{s.tag}</span>}
                  <div style={{ fontSize:"2.2rem", marginBottom:14 }}>{s.icon}</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.12rem", fontWeight:700, color:"#090205", marginBottom:9 }}>{s.title}</h3>
                  <p style={{ fontSize:"0.82rem", lineHeight:1.7, color:"rgba(9,2,5,.52)", marginBottom:16 }}>{s.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:`1px solid rgba(201,150,58,.16)` }}>
                    <span style={{ fontWeight:700, fontSize:"0.85rem", color:PR }}>{s.price}</span>
                    <button onClick={() => goTo("#appointment")} style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.72rem", fontWeight:600, color:GD, background:"none", border:"none", cursor:"pointer" }}>Book <ChevronRight size={12}/></button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section id="whyus" style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent,rgba(242,222,234,.2),transparent)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <SectionEyebrow>Our Promise</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Why Brides <span className="sg">Choose ZEENAT</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(272px,1fr))", gap:18 }}>
            {whyUs.map((item,i)=>{
              const Icon=item.icon;
              return (
                <Reveal key={item.title} delay={i*.07}>
                  <div className="cl gl" style={{ borderRadius:22, padding:"26px 22px", display:"flex", gap:16, alignItems:"flex-start" }}>
                    <div style={{ flexShrink:0, width:46, height:46, borderRadius:14, background:`linear-gradient(135deg,rgba(114,32,72,.1),rgba(201,150,58,.13))`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon size={20} color={PR} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem", color:"#090205", marginBottom:7 }}>{item.title}</h3>
                      <p style={{ fontSize:"0.81rem", lineHeight:1.7, color:"rgba(9,2,5,.52)" }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <section id="gallery" style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <SectionEyebrow>Portfolio</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Our <span className="sg">Gallery</span>
            </h2>
            <p style={{ color:"rgba(9,2,5,.48)", marginTop:14, maxWidth:440, margin:"14px auto 0", lineHeight:1.75, fontSize:"0.92rem" }}>
              Each photograph tells a story of transformation — every bride more beautiful than she imagined.
            </p>
          </Reveal>
          <div style={{ columns:"2 200px", gap:14 }}>
            {galleryImages.map((img,i)=>(
              <Reveal key={i} delay={i*.04}>
                <div className="gw" onClick={() => setActiveGallery(i)}
                  style={{ position:"relative", overflow:"hidden", borderRadius:20, marginBottom:14, cursor:"pointer", breakInside:"avoid", boxShadow:"0 4px 18px rgba(114,32,72,.08)", border:`1px solid rgba(201,150,58,.14)` }}>
                  <ImageWithFallback src={img.src} alt={img.alt} className="gi" style={{ width:"100%", display:"block" }} />
                  <div className="go" style={{ position:"absolute", inset:0, background:`linear-gradient(to top,rgba(114,32,72,.55) 0%,transparent 55%)` }}>
                    <div style={{ position:"absolute", bottom:12, left:12, color:"#fff", fontSize:"0.75rem", fontWeight:500 }}>{img.alt}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeGallery !== null && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setActiveGallery(null)}
              style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20, background:"rgba(9,2,5,.94)", backdropFilter:"blur(14px)" }}>
              <motion.div initial={{ scale:.82 }} animate={{ scale:1 }} exit={{ scale:.82 }} transition={{ type:"spring",damping:22 }} onClick={e=>e.stopPropagation()}
                style={{ position:"relative", borderRadius:26, overflow:"hidden", maxWidth:480, width:"100%", boxShadow:"0 40px 100px rgba(0,0,0,.55)" }}>
                <ImageWithFallback src={galleryImages[activeGallery].src} alt={galleryImages[activeGallery].alt} style={{ width:"100%", display:"block" }} />
                <button onClick={() => setActiveGallery(null)} style={{ position:"absolute", top:12, right:12, width:34, height:34, borderRadius:"50%", border:"none", cursor:"pointer", background:`rgba(114,32,72,.85)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <X size={16}/>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── COMPLIMENT ZONE 2 — REVIEWS ─────────────────────────────────────── */}
      <section id="reviews" style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent,rgba(242,222,234,.18),transparent)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <SectionEyebrow>Client Stories</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              What Our <span className="sg">Brides Say</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(282px,1fr))", gap:18 }}>
            {reviews.map((r,i)=>(
              <Reveal key={r.name} delay={i*.07}>
                <div className="cl gl" style={{ borderRadius:24, padding:"26px 22px", display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ display:"flex", gap:3 }}>
                    {Array.from({length:r.rating}).map((_,j)=><Star key={j} size={13} style={{ fill:"#f59e0b",color:"#f59e0b" }} />)}
                  </div>
                  <Quote size={20} color={`rgba(201,150,58,.4)`} />
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.04rem", lineHeight:1.76, color:"rgba(9,2,5,.68)", flex:1, fontStyle:"italic" }}>{r.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:12, borderTop:`1px solid rgba(201,150,58,.16)` }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${PR},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.78rem", fontWeight:700, color:"#fff", flexShrink:0 }}>{r.avatar}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.83rem", color:"#090205" }}>{r.name}</div>
                      <div style={{ fontSize:"0.69rem", color:GD }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIMENT ZONE 3 — FEATURED SPOTLIGHT QUOTES ───────────────────── */}
      <section style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:52 }}>
            <SectionEyebrow>Client Love</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.4vw,2.7rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Words That <span className="sg">Move Us</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(305px,1fr))", gap:26 }}>
            {featuredQuotes.map((q,i)=>(
              <Reveal key={i} delay={i*.15}>
                <div className="cl" style={{ borderRadius:28, overflow:"hidden", position:"relative", background:`linear-gradient(135deg,#130208,#260918)`, boxShadow:"0 24px 60px rgba(114,32,72,.25)" }}>
                  <div style={{ position:"absolute", inset:0 }}>
                    <ImageWithFallback src={q.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.18 }} />
                    <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,rgba(19,2,8,.92),rgba(38,9,24,.86))` }} />
                  </div>
                  <div style={{ position:"relative", zIndex:2, padding:"40px 34px" }}>
                    <div style={{ width:48, height:3, background:`linear-gradient(90deg,${PR},${GD})`, borderRadius:2, marginBottom:24 }} />
                    <Quote size={24} color="rgba(201,150,58,.5)" style={{ marginBottom:12 }} />
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,1.8vw,1.28rem)", lineHeight:1.82, color:"rgba(255,245,242,.9)", fontStyle:"italic", marginBottom:24 }}>{q.text}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${PR},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.8rem", fontWeight:700, color:"#fff", flexShrink:0 }}>
                        {q.name.split(" ").map(w=>w[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:"0.86rem", color:"rgba(255,245,242,.95)" }}>{q.name}</div>
                        <div style={{ fontSize:"0.69rem", color:GD, letterSpacing:"0.07em" }}>{q.role}</div>
                      </div>
                      <div style={{ marginLeft:"auto", display:"flex", gap:2 }}>
                        {[1,2,3,4,5].map(j=><Star key={j} size={11} style={{ fill:GD,color:GD }} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIMENT ZONE 4 — LOVE LETTERS GRID ───────────────────────────── */}
      <section style={{ position:"relative", zIndex:1, padding:"56px 24px 76px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:46 }}>
            <SectionEyebrow>Love Notes</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.4vw,2.7rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Kind Words from <span className="sg">Our Community</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(218px,1fr))", gap:14 }}>
            {loveLetters.map((l,i)=>(
              <Reveal key={i} delay={i*.05}>
                <div className="cl gl" style={{ borderRadius:18, padding:"20px 18px", position:"relative" }}>
                  <div style={{ position:"absolute", top:12, right:14 }}>
                    <Heart size={13} style={{ fill:`rgba(201,150,58,.45)`,color:`rgba(201,150,58,.45)` }} />
                  </div>
                  <div style={{ display:"flex", gap:2, marginBottom:9 }}>
                    {[1,2,3,4,5].map(j=><Star key={j} size={10} style={{ fill:"#f59e0b",color:"#f59e0b" }} />)}
                  </div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.98rem", fontStyle:"italic", color:"rgba(9,2,5,.7)", lineHeight:1.65, marginBottom:11 }}>"{l.text}"</p>
                  <div style={{ fontSize:"0.69rem", fontWeight:700, color:GD, letterSpacing:"0.06em" }}>— {l.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS RECOGNITION ────────────────────────────────────────────────── */}
      <section style={{ position:"relative", zIndex:1, padding:"52px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:40 }}>
            <SectionEyebrow>Recognition</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              As <span className="sg">Recognized By</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:18 }}>
            {pressQuotes.map((p,i)=>(
              <Reveal key={i} delay={i*.1}>
                <div className="cl gl" style={{ borderRadius:20, padding:"24px 22px" }}>
                  <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:999, background:`rgba(201,150,58,.1)`, border:`1px solid rgba(201,150,58,.22)`, fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:GD, marginBottom:14 }}>{p.outlet}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.02rem", fontStyle:"italic", color:"rgba(9,2,5,.68)", lineHeight:1.7 }}>"{p.quote}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────────────────────────── */}
      <section style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <Reveal>
            <div style={{ position:"relative", borderRadius:36, overflow:"hidden", minHeight:460, display:"flex", alignItems:"center" }}>
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,#090205,#180410 40%,#240815 70%,#180410)` }} />
              <div style={{ position:"absolute", top:"-15%", right:"-4%", width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle at 40% 40%,rgba(201,150,58,.2) 0%,rgba(114,32,72,.14) 50%,transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-15%", left:"-4%", width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle at 60% 60%,rgba(114,32,72,.26) 0%,transparent 70%)`, filter:"blur(50px)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"34%" }} className="dn">
                <ImageWithFallback src={imgP4} alt="ZEENAT Makeup Studio bridal look" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.38 }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,#180410 0%,transparent 60%)" }} />
              </div>

              <div className="cp" style={{ position:"relative", zIndex:2, padding:"56px 52px", maxWidth:660 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px", borderRadius:999, fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:GD, background:`rgba(201,150,58,.12)`, border:`1px solid rgba(201,150,58,.26)`, marginBottom:20 }}>
                  <Sparkles size={11} color={GD} /> Limited Slots · Chittorgarh&apos;s Premier Makeup Studio
                </div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.6vw,3.1rem)", fontWeight:900, color:"#fdf5f0", lineHeight:1.08, marginBottom:14 }}>
                  Ready to Look<br /><em className="sw" style={{ fontStyle:"normal" }}>Absolutely Stunning?</em>
                </h2>
                <div style={{ marginBottom:18 }}><Ornament /></div>
                <p style={{ fontSize:"0.95rem", lineHeight:1.8, color:"rgba(253,245,240,.6)", marginBottom:32, maxWidth:470 }}>
                  Book your appointment with {BRAND} today and step into the most beautiful version of yourself. Whether it is your wedding, engagement, sangeet, or any special event — every moment deserves to be perfect.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:28 }}>
                  <button onClick={() => goTo("#appointment")}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 32px", borderRadius:999, fontWeight:700, fontSize:"0.83rem", letterSpacing:"0.07em", textTransform:"uppercase", color:"#090205", background:`linear-gradient(135deg,${GD},#E8C07A,${GD})`, backgroundSize:"200% auto", border:"none", cursor:"pointer", boxShadow:`0 8px 32px rgba(201,150,58,.38)`, transition:"transform .2s,box-shadow .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow=`0 16px 48px rgba(201,150,58,.54)`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 8px 32px rgba(201,150,58,.38)`;}}>
                    <Calendar size={16}/> Book Appointment
                  </button>
                  <a href={`https://wa.me/${PHONE_WA}`} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:9, padding:"14px 24px", borderRadius:999, fontWeight:600, fontSize:"0.83rem", letterSpacing:"0.05em", textTransform:"uppercase", color:"rgba(253,245,240,.9)", background:"rgba(37,211,102,.12)", border:"1.5px solid rgba(37,211,102,.3)", cursor:"pointer", textDecoration:"none", transition:"background .2s" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="rgba(37,211,102,.22)")} onMouseLeave={e=>(e.currentTarget.style.background="rgba(37,211,102,.12)")}>
                    <MessageCircle size={16}/> WhatsApp
                  </a>
                </div>
                <div style={{ display:"flex", gap:22, flexWrap:"wrap" }}>
                  {["400+ Brides Served","Home & Venue Service","Premium Products Only"].map(t=>(
                    <div key={t} style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <Check size={12} color={GD}/>
                      <span style={{ fontSize:"0.73rem", color:"rgba(253,245,240,.52)", fontWeight:500 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── APPOINTMENT ──────────────────────────────────────────────────────── */}
      <section id="appointment" style={{ position:"relative", zIndex:1, padding:"76px 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:46 }}>
            <SectionEyebrow>Book a Session</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Schedule Your <span className="sg">Appointment</span>
            </h2>
            <p style={{ color:"rgba(9,2,5,.48)", marginTop:14, lineHeight:1.75, fontSize:"0.92rem" }}>
              Fill in the form and {BRAND} will confirm your slot within 24 hours.
            </p>
          </Reveal>
          <Reveal>
            <div className="gl" style={{ borderRadius:30, padding:"42px 34px", boxShadow:"0 22px 55px rgba(114,32,72,.1)" }}>
              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                    style={{ marginBottom:20, display:"flex", gap:14, alignItems:"center", padding:"14px 18px", borderRadius:14, background:`rgba(114,32,72,.07)`, border:`1px solid rgba(114,32,72,.2)` }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${PR},${GD})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Check size={15} color="#fff"/>
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.87rem", color:"#090205" }}>Appointment Request Sent!</div>
                      <div style={{ fontSize:"0.77rem", color:PR }}>{BRAND} will confirm your slot within 24 hours. Thank you!</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={onSubmit} className="f2c" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {([
                  { label:"Full Name",     key:"name",  type:"text",  ph:"Your full name",     req:true },
                  { label:"Phone Number",  key:"phone", type:"tel",   ph:"+91 63789 13760",    req:true },
                  { label:"Email Address", key:"email", type:"email", ph:"you@example.com",    req:false },
                ] as const).map(f=>(
                  <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    <label style={{ fontSize:"0.77rem", fontWeight:700, color:"rgba(9,2,5,.65)", letterSpacing:"0.04em" }}>{f.label}{f.req?" *":""}</label>
                    <input type={f.type} required={f.req} placeholder={f.ph}
                      value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      style={{ padding:"11px 15px", borderRadius:12, fontSize:"0.865rem", color:"#090205", background:`rgba(242,222,234,.35)`, border:`1.5px solid rgba(114,32,72,.15)`, fontFamily:"'Jost',sans-serif", transition:"all .2s" }} />
                  </div>
                ))}

                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  <label style={{ fontSize:"0.77rem", fontWeight:700, color:"rgba(9,2,5,.65)", letterSpacing:"0.04em" }}>Service Required *</label>
                  <select required value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}
                    style={{ padding:"11px 15px", borderRadius:12, fontSize:"0.865rem", color:"#090205", background:`rgba(242,222,234,.35)`, border:`1.5px solid rgba(114,32,72,.15)`, fontFamily:"'Jost',sans-serif", cursor:"pointer", transition:"all .2s" }}>
                    <option value="">Select a service</option>
                    {services.map(s=><option key={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  <label style={{ fontSize:"0.77rem", fontWeight:700, color:"rgba(9,2,5,.65)", letterSpacing:"0.04em" }}>Preferred Date *</label>
                  <input type="date" required value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}
                    style={{ padding:"11px 15px", borderRadius:12, fontSize:"0.865rem", color:"#090205", background:`rgba(242,222,234,.35)`, border:`1.5px solid rgba(114,32,72,.15)`, fontFamily:"'Jost',sans-serif", transition:"all .2s" }} />
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  <label style={{ fontSize:"0.77rem", fontWeight:700, color:"rgba(9,2,5,.65)", letterSpacing:"0.04em" }}>Preferred Time *</label>
                  <select required value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}
                    style={{ padding:"11px 15px", borderRadius:12, fontSize:"0.865rem", color:"#090205", background:`rgba(242,222,234,.35)`, border:`1.5px solid rgba(114,32,72,.15)`, fontFamily:"'Jost',sans-serif", cursor:"pointer", transition:"all .2s" }}>
                    <option value="">Select time slot</option>
                    {["7:00–9:00 AM","9:00–11:00 AM","11:00 AM–1:00 PM","1:00–3:00 PM","3:00–5:00 PM","5:00–7:00 PM"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ gridColumn:"1/-1", display:"flex", flexDirection:"column", gap:5 }}>
                  <label style={{ fontSize:"0.77rem", fontWeight:700, color:"rgba(9,2,5,.65)", letterSpacing:"0.04em" }}>Special Requirements</label>
                  <textarea placeholder="Event details, outfit colour, skin concerns, special requests..." rows={4}
                    value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    style={{ padding:"11px 15px", borderRadius:12, fontSize:"0.865rem", color:"#090205", background:`rgba(242,222,234,.35)`, border:`1.5px solid rgba(114,32,72,.15)`, fontFamily:"'Jost',sans-serif", resize:"none", transition:"all .2s" }} />
                </div>

                <div style={{ gridColumn:"1/-1", display:"flex", flexWrap:"wrap", alignItems:"center", gap:14 }}>
                  <button type="submit"
                    style={{ display:"flex", alignItems:"center", gap:9, padding:"13px 32px", borderRadius:999, fontWeight:700, fontSize:"0.82rem", letterSpacing:"0.08em", textTransform:"uppercase", color:"#fff", background:`linear-gradient(135deg,${PR},#c8456c,${GD})`, border:"none", cursor:"pointer", boxShadow:"0 8px 26px rgba(114,32,72,.28)", transition:"transform .2s,box-shadow .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 14px 38px rgba(114,32,72,.42)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 26px rgba(114,32,72,.28)";}}>
                    <Sparkles size={16}/> Confirm Appointment
                  </button>
                  <p style={{ fontSize:"0.75rem", color:"rgba(9,2,5,.4)" }}>Or call: <a href={`tel:${PHONE_TEL}`} style={{ color:PR, fontWeight:700, textDecoration:"none" }}>{PHONE_DISP}</a></p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MAP / CONTACT ────────────────────────────────────────────────────── */}
      <section id="contact" style={{ position:"relative", zIndex:1, padding:"56px 24px 76px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal style={{ textAlign:"center", marginBottom:46 }}>
            <SectionEyebrow>Find Us</SectionEyebrow>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.7vw,3rem)", fontWeight:800, color:"#090205", marginTop:14, lineHeight:1.12 }}>
              Visit Our <span className="sg">Studio</span>
            </h2>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(278px,1fr))", gap:22, alignItems:"start" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {([
                { icon:MapPin,    title:"Studio Address",      body:<>100, Fit Ring Road, Sector No. 5, Gandhi Nagar,<br/>Chittorgarh, Rajasthan 312001</>, sub:null },
                { icon:Phone,     title:"Call / WhatsApp",     body:<a href={`tel:${PHONE_TEL}`} style={{ color:PR, fontWeight:700, textDecoration:"none" }}>{PHONE_DISP}</a>, sub:"Mon–Sun: 8:00 AM – 8:00 PM" },
                { icon:Instagram, title:"Follow on Instagram", body:<a href={INSTA_URL} target="_blank" rel="noopener noreferrer" style={{ color:PR, fontWeight:700, textDecoration:"none" }}>{INSTA_HANDLE}</a>, sub:"Daily looks, reels & bride reveals" },
              ] as const).map(c=>{
                const Icon=c.icon;
                return (
                  <Reveal key={c.title}>
                    <div className="cl gl" style={{ borderRadius:20, padding:"22px 18px", display:"flex", gap:14, alignItems:"flex-start" }}>
                      <div style={{ width:44, height:44, borderRadius:13, background:`linear-gradient(135deg,rgba(114,32,72,.1),rgba(201,150,58,.13))`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={19} color={PR}/>
                      </div>
                      <div>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.96rem", color:"#090205", marginBottom:5 }}>{c.title}</div>
                        <div style={{ fontSize:"0.81rem", color:"rgba(9,2,5,.58)", lineHeight:1.6 }}>{c.body}</div>
                        {c.sub && <div style={{ fontSize:"0.69rem", color:GD, marginTop:3 }}>{c.sub}</div>}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div style={{ borderRadius:26, overflow:"hidden", boxShadow:"0 18px 55px rgba(114,32,72,.12)", border:`1.5px solid rgba(201,150,58,.2)`, height:410 }}>
                <iframe title={`${BRAND} — Gandhi Nagar, Chittorgarh`} src={MAP_SRC} width="100%" height="410"
                  style={{ border:0, filter:"saturate(1.1) hue-rotate(340deg) brightness(1.02)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ position:"relative", zIndex:1, padding:"42px 24px 26px", borderTop:`1px solid rgba(201,150,58,.16)`, background:"rgba(253,248,244,.68)", backdropFilter:"blur(12px)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:22, marginBottom:24 }}>
            <div>
              <div className="sg" style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:800 }}>{BRAND}</div>
              <div style={{ fontSize:"0.59rem", letterSpacing:"0.24em", textTransform:"uppercase", color:GD, marginTop:3 }}>Professional Makeup Artist · Gandhi Nagar, Chittorgarh</div>
            </div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {navLinks.slice(0,5).map(l=>(
                <button key={l.href} onClick={() => goTo(l.href)}
                  style={{ padding:"5px 10px", borderRadius:8, background:"none", border:"none", cursor:"pointer", fontSize:"0.75rem", fontWeight:500, color:"rgba(9,2,5,.48)", fontFamily:"'Jost',sans-serif", transition:"color .2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color=PR)} onMouseLeave={e=>(e.currentTarget.style.color="rgba(9,2,5,.48)")}>{l.label}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:9 }}>
              {[
                { href:`https://wa.me/${PHONE_WA}`,  bg:"linear-gradient(135deg,#25d366,#128c7e)", el:<MessageCircle size={17}/>, title:"WhatsApp" },
                { href:INSTA_URL,                     bg:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", el:<Instagram size={17}/>, title:"Instagram" },
                { href:`tel:${PHONE_TEL}`,            bg:`linear-gradient(135deg,${PR},${GD})`, el:<Phone size={17}/>, title:"Call" },
              ].map((s,i)=>(
                <a key={i} href={s.href} target={i<2?"_blank":undefined} rel="noopener noreferrer" title={s.title}
                  style={{ width:40, height:40, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", background:s.bg, textDecoration:"none", transition:"transform .2s,box-shadow .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,.2)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
                  {s.el}
                </a>
              ))}
            </div>
          </div>
          <div style={{ textAlign:"center", fontSize:"0.68rem", color:"rgba(9,2,5,.26)", paddingTop:16, borderTop:`1px solid rgba(201,150,58,.1)` }}>
            © 2025 {BRAND} · 100, Fit Ring Road, Sector No. 5, Gandhi Nagar, Chittorgarh, Rajasthan 312001 · Made with <Heart size={9} style={{ display:"inline", fill:GD, color:GD }}/> in Chittorgarh
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ─────────────────────────────────────────────────── */}
      <div style={{ position:"fixed", bottom:22, right:22, zIndex:100, display:"flex", flexDirection:"column", gap:11 }}>
        <motion.a href={INSTA_URL} target="_blank" rel="noopener noreferrer"
          initial={{ opacity:0,scale:0 }} animate={{ opacity:1,scale:1 }} transition={{ delay:1.2,type:"spring" }}
          whileHover={{ scale:1.14 }}
          style={{ width:52, height:52, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", background:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", boxShadow:"0 8px 26px rgba(220,39,67,.4)", textDecoration:"none" }}
          title={`Follow ${INSTA_HANDLE}`}>
          <Instagram size={21}/>
        </motion.a>
        <motion.a href={`https://wa.me/${PHONE_WA}`} target="_blank" rel="noopener noreferrer"
          initial={{ opacity:0,scale:0 }} animate={{ opacity:1,scale:1 }} transition={{ delay:1.4,type:"spring" }}
          whileHover={{ scale:1.14 }}
          style={{ width:52, height:52, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", background:"linear-gradient(135deg,#25d366,#128c7e)", boxShadow:"0 8px 26px rgba(37,211,102,.4)", textDecoration:"none" }}
          title="Chat on WhatsApp">
          <MessageCircle size={21}/>
        </motion.a>
      </div>
    </div>
  );
}
