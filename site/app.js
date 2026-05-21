// ============ SERVICIOS ============
const SERVICIOS = [
  {
    title: "Regularización de predio",
    desc: "Trámites para tener tu terreno en regla y con escrituras.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M10 21v-6h4v6"/></svg>`,
    msg: "Hola Lic. Sergio, me interesa regularizar un predio."
  },
  {
    title: "Herencia y testamento",
    desc: "Protege a tu familia y deja todo en orden.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7"/><path d="M9 17h5"/></svg>`,
    msg: "Hola Lic. Sergio, necesito orientación con herencia y testamento."
  },
  {
    title: "Divorcio",
    desc: "Proceso claro y sin complicaciones innecesarias.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3.5"/><circle cx="16" cy="9" r="3.5"/><path d="M8 12.5V20"/><path d="M16 12.5V20"/><path d="M11 16h2"/></svg>`,
    msg: "Hola Lic. Sergio, quisiera asesoría para un divorcio."
  },
  {
    title: "Concubinato",
    desc: "Reconocimiento legal de tu relación de pareja.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-6.5-4.2-8.5-8A5 5 0 0 1 12 7a5 5 0 0 1 8.5 5C18.5 15.8 12 20 12 20z"/></svg>`,
    msg: "Hola Lic. Sergio, me interesa orientación sobre concubinato."
  },
  {
    title: "Despidos",
    desc: "Defensa ante despidos injustificados y liquidación.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>`,
    msg: "Hola Lic. Sergio, fui despedido(a) y necesito asesoría."
  },
  {
    title: "Contratos",
    desc: "Revisión y redacción de contratos de arrendamiento y más.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h8l4 4v14H7z"/><path d="M9 12h7"/><path d="M9 16h7"/><path d="M9 8h4"/></svg>`,
    msg: "Hola Lic. Sergio, necesito revisar/redactar un contrato."
  },
  {
    title: "Manutención",
    desc: "Pensión alimenticia para tus hijos, de forma justa.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="10" r="2"/><path d="M14 20c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5"/></svg>`,
    msg: "Hola Lic. Sergio, me interesa asesoría sobre pensión alimenticia."
  },
  {
    title: "Penal",
    desc: "Asesoría y representación en asuntos penales.",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg>`,
    msg: "Hola Lic. Sergio, necesito asesoría en un asunto penal."
  }
];

const WA_BASE = "https://wa.me/526636991338?text=";

(function renderServicios(){
  const grid = document.getElementById('serviciosGrid');
  if(!grid) return;
  grid.innerHTML = SERVICIOS.map(s => `
    <a class="service-card" href="${WA_BASE}${encodeURIComponent(s.msg)}" target="_blank" rel="noopener">
      <span class="service-ico">${s.icon}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </a>
  `).join('');
})();

// ============ MOBILE NAV ============
(function nav(){
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMobile');
  if(!burger || !menu) return;
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  }));
})();

// ============ ANALYTICS / META PIXEL EVENTS ============
// Fires both GA4 and Meta Pixel events on key interactions so you can see
// conversions in Google Analytics → Eventos and Meta Events Manager.
(function tracking(){
  const track = (eventName, params = {}) => {
    try { if (window.gtag) gtag('event', eventName, params); } catch(e){}
    try {
      if (window.fbq) {
        // Standard events Meta recognizes:
        if (eventName === 'click_whatsapp') fbq('track', 'Contact', params);
        else fbq('trackCustom', eventName, params);
      }
    } catch(e){}
  };

  // Detect section from a WhatsApp link's surroundings
  const findSection = (el) => {
    const section = el.closest('section, header, footer');
    if (!section) return 'unknown';
    if (section.id) return section.id;
    if (section.classList.contains('nav')) return 'navbar';
    if (section.classList.contains('hero')) return 'hero';
    if (section.classList.contains('final-cta')) return 'final-cta';
    if (section.classList.contains('footer')) return 'footer';
    return section.tagName.toLowerCase();
  };

  // WhatsApp click tracking (all .wa-link buttons + floating button)
  document.querySelectorAll('.wa-link, .wa-float').forEach(el => {
    el.addEventListener('click', () => {
      const location = el.classList.contains('wa-float') ? 'float' : findSection(el);
      const label = (el.textContent || '').trim().slice(0, 60);
      track('click_whatsapp', {
        event_category: 'engagement',
        location: location,
        button_label: label
      });
    });
  });

  // Service card clicks (each service has its own card linking to WhatsApp)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.service-card');
    if (!card) return;
    const name = card.querySelector('h3');
    track('click_service', {
      event_category: 'engagement',
      service_name: name ? name.textContent.trim() : 'unknown'
    });
  });

  // FAQ open tracking
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      const q = item.querySelector('summary h3');
      track('open_faq', {
        event_category: 'engagement',
        question: q ? q.textContent.trim() : 'unknown'
      });
    });
  });

  // Email link tracking
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', () => {
      track('click_email', { event_category: 'engagement' });
    });
  });

  // Google Maps link tracking
  document.querySelectorAll('a[href*="share.google"], a[href*="maps.google"]').forEach(a => {
    a.addEventListener('click', () => {
      track('click_maps', { event_category: 'engagement' });
    });
  });

  // Social link tracking (Facebook / Instagram)
  document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"]').forEach(a => {
    a.addEventListener('click', () => {
      const network = a.href.includes('facebook.com') ? 'facebook' : 'instagram';
      track('click_social', { event_category: 'engagement', network });
    });
  });
})();
