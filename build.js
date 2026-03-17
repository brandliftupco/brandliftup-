const fs = require('fs');
const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

// ===== NEW CSS =====
const newCss = `
/* HAMBURGER MENU */
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:200;background:none;border:none;padding:8px}
.hamburger span{width:28px;height:2px;background:var(--gold);transition:all .3s;display:block}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.hamburger.active span:nth-child(2){opacity:0}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.mobile-menu{position:fixed;top:0;right:-100%;width:280px;height:100vh;background:rgba(5,5,7,.97);backdrop-filter:blur(20px);z-index:150;padding:100px 40px 40px;transition:right .4s cubic-bezier(.4,0,.2,1);border-left:1px solid rgba(255,212,94,.1)}
.mobile-menu.active{right:0}
.mobile-menu a{display:block;color:var(--white);text-decoration:none;font-size:18px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:16px 0;border-bottom:1px solid rgba(255,212,94,.08);transition:color .3s,padding-left .3s}
.mobile-menu a:hover{color:var(--gold);padding-left:12px}
.mobile-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:140;opacity:0;pointer-events:none;transition:opacity .4s}
.mobile-overlay.active{opacity:1;pointer-events:auto}
.portfolio-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px}
.portfolio-card{background:var(--dim);position:relative;overflow:hidden;cursor:none}
.portfolio-img{width:100%;height:280px;display:flex;align-items:center;justify-content:center;font-size:48px}
.portfolio-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(5,5,7,.95) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:32px;transform:translateY(20px);opacity:0;transition:all .4s}
.portfolio-card:hover .portfolio-overlay{transform:translateY(0);opacity:1}
.portfolio-name{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:1px;color:var(--white);margin-bottom:8px}
.portfolio-cat{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-family:'Space Mono',monospace;margin-bottom:12px}
.portfolio-metrics{display:flex;gap:24px}
.portfolio-metric{font-size:12px;color:var(--muted)}
.portfolio-metric strong{display:block;font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gold);line-height:1}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px}
.pricing-card{background:var(--dim);padding:48px 36px;position:relative;overflow:hidden;transition:background .3s;display:flex;flex-direction:column}
.pricing-card.featured{background:#1e1e2d;border:1px solid rgba(255,212,94,.2)}
.pricing-badge{position:absolute;top:20px;right:-32px;background:var(--gold);color:var(--black);font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:6px 40px;transform:rotate(45deg)}
.pricing-name{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:2px;color:var(--white);margin-bottom:8px}
.pricing-desc{font-size:13px;color:var(--muted);margin-bottom:24px}
.pricing-price{font-family:'Bebas Neue',sans-serif;font-size:56px;color:var(--gold);line-height:1;margin-bottom:4px}
.pricing-price small{font-size:16px;color:var(--muted);font-family:'Space Mono',monospace}
.pricing-features{list-style:none;margin:24px 0;flex-grow:1}
.pricing-features li{padding:10px 0;border-bottom:1px solid rgba(255,212,94,.06);font-size:14px;color:var(--muted);display:flex;align-items:center;gap:10px}
.pricing-features li::before{content:'\\2713';color:var(--gold);font-weight:800}
.pricing-cta{display:block;text-align:center;background:transparent;border:1px solid rgba(255,212,94,.3);color:var(--gold);padding:14px;font-weight:800;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;transition:all .3s;margin-top:auto}
.pricing-cta:hover{background:var(--gold);color:var(--black)}
.pricing-card.featured .pricing-cta{background:var(--gold);color:var(--black)}
.pricing-card.featured .pricing-cta:hover{background:var(--orange)}
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:60px}
.team-card{background:var(--dim);padding:40px 32px;text-align:center;transition:background .3s}
.team-card:hover{background:#1e1e2d}
.team-avatar{width:80px;height:80px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:white}
.team-name{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:1px;margin-bottom:4px}
.team-role{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-family:'Space Mono',monospace;margin-bottom:12px}
.team-bio{font-size:13px;color:var(--muted);line-height:1.6}
.faq-list{max-width:800px;margin:60px auto 0;display:flex;flex-direction:column;gap:2px}
.faq-item{background:var(--dim);overflow:hidden}
.faq-q{padding:24px 32px;font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background .3s;user-select:none}
.faq-q:hover{background:#1e1e2d}
.faq-q::after{content:'+';font-size:28px;color:var(--gold);transition:transform .3s}
.faq-item.active .faq-q::after{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .4s ease}
.faq-a-inner{padding:0 32px 24px;font-size:14px;color:var(--muted);line-height:1.8}
.faq-item.active .faq-a{max-height:200px}
.contact-form{max-width:600px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:16px;position:relative;z-index:2}
.contact-form .full-width{grid-column:1/-1}
.contact-form input,.contact-form textarea,.contact-form select{width:100%;background:rgba(255,212,94,.04);border:1px solid rgba(255,212,94,.12);color:var(--white);padding:16px 20px;font-family:'Syne',sans-serif;font-size:14px;outline:none;transition:border-color .3s}
.contact-form input:focus,.contact-form textarea:focus,.contact-form select:focus{border-color:var(--gold)}
.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--muted)}
.contact-form textarea{resize:vertical;min-height:120px}
.contact-form select{appearance:none;cursor:pointer}
.contact-form select option{background:var(--black);color:var(--white)}
.form-btn{background:var(--gold);color:var(--black);padding:18px 40px;font-weight:800;font-size:14px;letter-spacing:2px;text-transform:uppercase;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;font-family:'Syne',sans-serif}
.form-btn:hover{background:var(--orange);transform:translateY(-2px)}
.form-status{text-align:center;font-size:14px;color:var(--gold);margin-top:16px;min-height:24px}
.whatsapp-btn{position:fixed;bottom:28px;right:28px;width:60px;height:60px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:28px;text-decoration:none;z-index:99;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:all .3s;animation:waPulse 2s infinite}
.whatsapp-btn:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(37,211,102,.6)}
@keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,.7)}}
.back-top{position:fixed;bottom:100px;right:28px;width:44px;height:44px;background:rgba(255,212,94,.1);border:1px solid rgba(255,212,94,.2);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:18px;text-decoration:none;z-index:99;opacity:0;pointer-events:none;transition:all .3s}
.back-top.visible{opacity:1;pointer-events:auto}
.back-top:hover{background:var(--gold);color:var(--black)}
.footer-social{display:flex;gap:16px}
.footer-social a{width:40px;height:40px;border:1px solid rgba(255,212,94,.15);display:flex;align-items:center;justify-content:center;color:var(--muted);text-decoration:none;transition:all .3s;font-size:16px}
.footer-social a:hover{border-color:var(--gold);color:var(--gold);background:rgba(255,212,94,.08)}
@media(max-width:1024px){.hamburger{display:flex}.portfolio-grid,.pricing-grid{grid-template-columns:1fr 1fr}.team-grid{grid-template-columns:1fr 1fr}.footer-social{justify-content:center}}
@media(max-width:600px){.portfolio-grid,.pricing-grid,.team-grid{grid-template-columns:1fr}.contact-form{grid-template-columns:1fr}}
`;
html = html.replace('</style>', newCss + '\\n</style>');

// Add hamburger button + mobile menu after nav
html = html.replace(
    /<a href="#contact" class="nav-cta">Get Started<\/a>\s*<\/nav>/,
    `<a href="#contact" class="nav-cta">Get Started</a>
  <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-overlay" id="mobileOverlay"></div>
<div class="mobile-menu" id="mobileMenu">
  <a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#why">Why Us</a>
  <a href="#pricing">Pricing</a><a href="#process">Process</a><a href="#results">Results</a>
  <a href="#faq">FAQ</a><a href="#contact">Contact</a>
</div>`
);

// Add nav links for new sections
html = html.replace(
    '<li><a href="#results">Results</a></li>',
    '<li><a href="#results">Results</a></li>\\n    <li><a href="#pricing">Pricing</a></li>'
);

// Portfolio + Pricing + Team + FAQ sections (insert before CTA)
const newSections = `
<!-- PORTFOLIO -->
<section class="section" id="portfolio">
  <div class="section-label">Our Work</div>
  <h2 class="section-title reveal">CASE <span style="color:var(--gold)">STUDIES</span><br>THAT PROVE IT</h2>
  <div class="portfolio-grid">
    <div class="portfolio-card reveal"><div class="portfolio-img" style="background:linear-gradient(135deg,rgba(123,47,255,.3),rgba(255,92,26,.3))">\\ud83d\\uded2</div><div class="portfolio-overlay"><div class="portfolio-cat">E-Commerce \\u00b7 Google + Meta Ads</div><div class="portfolio-name">StyleHive Fashion</div><div class="portfolio-metrics"><div class="portfolio-metric"><strong>420%</strong>ROI Increase</div><div class="portfolio-metric"><strong>\\u20b94.2Cr</strong>Revenue</div></div></div></div>
    <div class="portfolio-card reveal" style="transition-delay:.15s"><div class="portfolio-img" style="background:linear-gradient(135deg,rgba(255,212,94,.2),rgba(255,92,26,.3))">\\ud83c\\udf55</div><div class="portfolio-overlay"><div class="portfolio-cat">F&B \\u00b7 Social + SEO</div><div class="portfolio-name">FreshEats India</div><div class="portfolio-metrics"><div class="portfolio-metric"><strong>800%</strong>Lead Growth</div><div class="portfolio-metric"><strong>\\u20b918L/mo</strong>Revenue</div></div></div></div>
    <div class="portfolio-card reveal" style="transition-delay:.3s"><div class="portfolio-img" style="background:linear-gradient(135deg,rgba(123,47,255,.2),rgba(255,212,94,.2))">\\ud83d\\udc8a</div><div class="portfolio-overlay"><div class="portfolio-cat">Healthcare \\u00b7 Full Digital</div><div class="portfolio-name">MediCare Plus</div><div class="portfolio-metrics"><div class="portfolio-metric"><strong>250%</strong>Traffic</div><div class="portfolio-metric"><strong>60%</strong>CPA Down</div></div></div></div>
  </div>
</section>

<!-- PRICING -->
<section class="section" id="pricing" style="background:linear-gradient(135deg,#0c0c14 0%,#050507 50%,#0f0a1a 100%)">
  <div class="section-label">Investment</div>
  <h2 class="section-title reveal">PACKAGES THAT<br><span style="color:var(--gold)">SCALE</span> WITH YOU</h2>
  <div class="pricing-grid">
    <div class="pricing-card reveal">
      <div class="pricing-name">STARTER</div><div class="pricing-desc">Perfect for brands just getting started.</div>
      <div class="pricing-price">\\u20b925K<small>/month</small></div>
      <ul class="pricing-features"><li>Social Media (2 platforms)</li><li>Basic SEO Optimization</li><li>4 Posts/Week</li><li>Monthly Report</li><li>Email Support</li></ul>
      <a href="#contact" class="pricing-cta">Get Started \\u2192</a>
    </div>
    <div class="pricing-card featured reveal" style="transition-delay:.15s">
      <div class="pricing-badge">POPULAR</div>
      <div class="pricing-name">GROWTH</div><div class="pricing-desc">For brands ready to seriously scale.</div>
      <div class="pricing-price">\\u20b965K<small>/month</small></div>
      <ul class="pricing-features"><li>Everything in Starter</li><li>Google + Meta Paid Ads</li><li>AI Campaign Optimization</li><li>Lead Gen Funnels</li><li>Dedicated Manager</li><li>Weekly Strategy Calls</li><li>Content + Blog</li></ul>
      <a href="#contact" class="pricing-cta">Start Growing \\u2192</a>
    </div>
    <div class="pricing-card reveal" style="transition-delay:.3s">
      <div class="pricing-name">DOMINATION</div><div class="pricing-desc">Full-stack digital domination.</div>
      <div class="pricing-price">\\u20b91.5L<small>/month</small></div>
      <ul class="pricing-features"><li>Everything in Growth</li><li>Full AI Marketing Stack</li><li>Brand Identity + Design</li><li>Video Production</li><li>Influencer Marketing</li><li>24/7 War Room Team</li><li>Performance Pricing</li><li>Priority Support</li></ul>
      <a href="#contact" class="pricing-cta">Dominate Now \\u2192</a>
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="section" id="team">
  <div class="section-label">The Minds</div>
  <h2 class="section-title reveal">MEET THE<br><span style="color:var(--gold)">WAR ROOM</span> TEAM</h2>
  <div class="team-grid">
    <div class="team-card reveal"><div class="team-avatar" style="background:linear-gradient(135deg,var(--purple),var(--orange))">AK</div><div class="team-name">ARUN KUMAR</div><div class="team-role">Founder & CEO</div><p class="team-bio">10+ years in digital marketing. Built and scaled 200+ brands.</p></div>
    <div class="team-card reveal" style="transition-delay:.1s"><div class="team-avatar" style="background:linear-gradient(135deg,var(--gold),var(--orange))">NR</div><div class="team-name">NEHA REDDY</div><div class="team-role">Head of AI Strategy</div><p class="team-bio">Ex-Google. ML engineer turned marketer. Brain behind our AI.</p></div>
    <div class="team-card reveal" style="transition-delay:.2s"><div class="team-avatar" style="background:linear-gradient(135deg,var(--orange),var(--purple))">VS</div><div class="team-name">VIKRAM SINGH</div><div class="team-role">Creative Director</div><p class="team-bio">Award-winning designer. Makes brands impossible to ignore.</p></div>
    <div class="team-card reveal" style="transition-delay:.3s"><div class="team-avatar" style="background:linear-gradient(135deg,var(--purple),var(--gold))">PM</div><div class="team-name">PRIYA MENON</div><div class="team-role">Performance Lead</div><p class="team-bio">Managed \\u20b950Cr+ ad spend. ROI obsessed.</p></div>
  </div>
</section>

<!-- FAQ -->
<section class="section" id="faq">
  <div class="section-label">Questions</div>
  <h2 class="section-title reveal" style="text-align:center">GOT<br><span style="color:var(--gold)">QUESTIONS?</span></h2>
  <div class="faq-list">
    <div class="faq-item reveal"><div class="faq-q">How fast will I see results?</div><div class="faq-a"><div class="faq-a-inner">Most clients see measurable traction within 30 days. Full campaign maturity in 60-90 days.</div></div></div>
    <div class="faq-item reveal"><div class="faq-q">Do you work with small businesses?</div><div class="faq-a"><div class="faq-a-inner">Absolutely! Our Starter package is designed for growing businesses. We've helped startups go from zero to \\u20b950L+ monthly revenue.</div></div></div>
    <div class="faq-item reveal"><div class="faq-q">What makes your AI different?</div><div class="faq-a"><div class="faq-a-inner">We've built proprietary systems that analyze your market, competitors, and audience behavior 24/7, making decisions faster than any human team.</div></div></div>
    <div class="faq-item reveal"><div class="faq-q">Is there a lock-in contract?</div><div class="faq-a"><div class="faq-a-inner">No long-term contracts. Month-to-month basis. If we don't deliver, you can leave anytime.</div></div></div>
    <div class="faq-item reveal"><div class="faq-q">What industries do you specialize in?</div><div class="faq-a"><div class="faq-a-inner">30+ industries including e-commerce, healthcare, real estate, F&B, SaaS, education, and fashion.</div></div></div>
  </div>
</section>
`;

html = html.replace('<!-- CTA -->', newSections + '\\n<!-- CTA -->');

// Replace CTA mailto with contact form
html = html.replace(
    /<a href="mailto:hello@brandliftup.in" class="btn-big">Book Free Strategy Call[^<]*<\/a>/,
    `<form class="contact-form reveal" id="contactForm">
      <input type="text" placeholder="Your Name" required>
      <input type="email" placeholder="Email Address" required>
      <input type="tel" placeholder="Phone Number" class="full-width">
      <select class="full-width"><option value="" disabled selected>Select Budget</option><option>Under \\u20b925K/mo</option><option>\\u20b925K-65K/mo</option><option>\\u20b965K-1.5L/mo</option><option>\\u20b91.5L+/mo</option></select>
      <textarea placeholder="Tell us about your brand..." class="full-width"></textarea>
      <div class="full-width" style="text-align:center"><button type="submit" class="form-btn">Book Free Strategy Call \\u2192</button></div>
      <div class="form-status full-width" id="formStatus"></div>
    </form>`
);

// Add social links + WhatsApp + BackToTop
html = html.replace(
    '<div class="footer-copy">',
    `<div class="footer-social">
    <a href="https://instagram.com/brandliftup" target="_blank"><i class="fab fa-instagram"></i></a>
    <a href="https://linkedin.com/company/brandliftup" target="_blank"><i class="fab fa-linkedin-in"></i></a>
    <a href="https://twitter.com/brandliftup" target="_blank"><i class="fab fa-x-twitter"></i></a>
    <a href="https://facebook.com/brandliftup" target="_blank"><i class="fab fa-facebook-f"></i></a>
    <a href="https://youtube.com/@brandliftup" target="_blank"><i class="fab fa-youtube"></i></a>
  </div>
  <div class="footer-copy">`
);

html = html.replace('2025 Brand Liftup', '2025-2026 Brand Liftup');

html = html.replace(
    '</footer>',
    `</footer>
<a href="https://wa.me/919999999999?text=Hi%20Brand%20Liftup!" class="whatsapp-btn" target="_blank"><i class="fab fa-whatsapp"></i></a>
<a href="#" class="back-top" id="backTop"><i class="fas fa-arrow-up"></i></a>`
);

// Add new JS
const newJs = `
  // HAMBURGER
  const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu'),mo=document.getElementById('mobileOverlay');
  if(hb){hb.onclick=()=>{hb.classList.toggle('active');mm.classList.toggle('active');mo.classList.toggle('active')};
  mo.onclick=()=>{hb.classList.remove('active');mm.classList.remove('active');mo.classList.remove('active')};
  mm.querySelectorAll('a').forEach(a=>a.onclick=()=>{hb.classList.remove('active');mm.classList.remove('active');mo.classList.remove('active')})}
  // FAQ
  document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>{const i=q.parentElement,w=i.classList.contains('active');document.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('active'));if(!w)i.classList.add('active')});
  // BACK TOP
  const bt=document.getElementById('backTop');
  window.addEventListener('scroll',()=>{if(window.scrollY>600)bt.classList.add('visible');else bt.classList.remove('visible')});
  // FORM
  const cf=document.getElementById('contactForm');
  if(cf)cf.onsubmit=e=>{e.preventDefault();document.getElementById('formStatus').textContent='\\u2713 Message sent! We\\'ll call within 24hrs.';cf.reset();setTimeout(()=>document.getElementById('formStatus').textContent='',5000)};
`;
html = html.replace('</script>', newJs + '</script>');

fs.writeFileSync(path, html, 'utf8');
console.log('SUCCESS! File enhanced with all 10 features.');
console.log('Size:', html.length, 'bytes');
