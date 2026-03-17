const fs = require('fs');

const files = [
    'index.html',
    'metrix mind.html'
];

const finalResponsiveCss = `
/* ========== CLEAN RESPONSIVE ENGINE ========== */

/* Hide hamburger on desktop by default */
.hamburger { display: none !important; }

/* TABLET (1024px & below) */
@media screen and (max-width: 1024px) {
  nav { padding: 15px 25px !important; }
  .nav-links { display: none !important; }
  .hamburger { display: flex !important; }
  .nav-logo-img { height: 40px !important; }
  
  .hero { padding: 100px 30px 60px !important; min-height: auto !important; }
  .hero-title { font-size: clamp(50px, 9vw, 90px) !important; }
  .hero-stats { position: relative !important; right: auto !important; bottom: auto !important; flex-direction: row !important; gap: 30px !important; margin-top: 40px !important; }
  
  .section, .why-section, .process-section, .results-section, .testimonials, .cta-section { padding: 80px 30px !important; }
  
  .services-grid, .portfolio-grid, .pricing-grid, .team-grid { grid-template-columns: 1fr 1fr !important; gap: 15px !important; }
  .process-steps, .results-grid { grid-template-columns: 1fr 1fr !important; }
}

/* MOBILE (640px & below) */
@media screen and (max-width: 640px) {
  .hero-title { font-size: clamp(40px, 11vw, 65px) !important; }
  .section-title { font-size: clamp(34px, 8vw, 52px) !important; }
  
  .services-grid, .portfolio-grid, .pricing-grid, .team-grid, .process-steps, .results-grid { 
    grid-template-columns: 1fr !important; 
    gap: 20px !important;
  }
  
  .service-card, .process-step, .result-card, .testi-card, .pricing-card, .team-card {
    padding: 30px 20px !important;
  }
  
  .hero-stats { flex-wrap: wrap !important; justify-content: flex-start !important; }
  .contact-form { grid-template-columns: 1fr !important; }
  
  .footer-links { flex-direction: column !important; align-items: center !important; gap: 15px !important; }
  .cta-title { font-size: clamp(36px, 10vw, 54px) !important; }
}

/* SMALL MOBILE (380px & below) */
@media screen and (max-width: 380px) {
  .hero-title { font-size: 38px !important; }
  .nav-logo { font-size: 18px !important; }
  .nav-logo-img { height: 32px !important; }
  .btn-primary { width: 100% !important; text-align: center !important; }
}
`;

files.forEach(path => {
    let content = fs.readFileSync(path, 'utf8');

    // Strip previous failed attempts
    const markers = [
        '/* ========== FULL RESPONSIVE OVERHAUL ========== */',
        '/* ========== CLEAN RESPONSIVE ENGINE ========== */'
    ];

    markers.forEach(marker => {
        const idx = content.indexOf(marker);
        if (idx !== -1) {
            content = content.substring(0, idx);
        }
    });

    // Remove messy tail
    content = content.replace(/\.portfolio-grid,.pricing-grid\{[\s\S]*?\}\s*\}\s*<\/style>/g, '</style>');

    // Inject clean version
    content = content.replace('</style>', finalResponsiveCss + '\n</style>');

    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed Responsive CSS for:', path);
});
