// ── Pivt Sports — Shared App JS ────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // ── Sidebar toggle (mobile) ─────────────────────────────────
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Close sidebar on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });

  // ── Active nav link ─────────────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Filter buttons (roster, etc.) ───────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-bar');
      group?.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const target = btn.dataset.target || '.player-card';
      const container = btn.closest('.filter-section') || document;

      container.querySelectorAll(target).forEach(card => {
        if (!filter || filter === 'all') {
          card.style.display = '';
        } else {
          const pos = card.dataset.pos || '';
          const yr  = card.dataset.year || '';
          const match = (filter === pos) || (filter === yr);
          card.style.display = match ? '' : 'none';
        }
      });
    });
  });

  // ── Roster search ────────────────────────────────────────────
  const rosterSearch = document.getElementById('roster-search');
  if (rosterSearch) {
    rosterSearch.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.player-card').forEach(card => {
        const name = card.dataset.name?.toLowerCase() || '';
        const hs   = card.dataset.hs?.toLowerCase() || '';
        const city = card.dataset.city?.toLowerCase() || '';
        const vis  = !q || name.includes(q) || hs.includes(q) || city.includes(q);
        card.style.display = vis ? '' : 'none';
      });
    });
  }

  // ── Tabs ─────────────────────────────────────────────────────
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tab-group') || tab.parentElement;
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      const panel  = document.getElementById(`tab-${target}`);
      document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
      if (panel) panel.style.display = '';
    });
  });

  // ── Animate stat counters ─────────────────────────────────────
  const animateCounters = () => {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target  = parseFloat(el.dataset.count);
      const isFloat = el.dataset.count.includes('.');
      const decimals = isFloat ? (el.dataset.count.split('.')[1]?.length || 1) : 0;
      const duration = 900;
      const step     = 16;
      const steps    = Math.ceil(duration / step);
      let   current  = 0;
      let   tick     = 0;

      const timer = setInterval(() => {
        tick++;
        current = target * (tick / steps);
        el.textContent = isFloat
          ? current.toFixed(decimals)
          : Math.round(current).toString();
        if (tick >= steps) {
          clearInterval(timer);
          el.textContent = isFloat ? target.toFixed(decimals) : target.toString();
        }
      }, step);
    });
  };

  // Trigger counters when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  });

  const statsRoot = document.querySelector('.stats-root');
  if (statsRoot) observer.observe(statsRoot);
  else animateCounters();

  // ── Film category tabs ────────────────────────────────────────
  document.querySelectorAll('.film-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.film-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      document.querySelectorAll('.film-card').forEach(card => {
        if (!cat || cat === 'all') {
          card.style.display = '';
        } else {
          card.style.display = card.dataset.cat === cat ? '' : 'none';
        }
      });
    });
  });

  // ── Recruiting form (demo) ────────────────────────────────────
  const reqForm = document.getElementById('recruit-form');
  if (reqForm) {
    reqForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = reqForm.querySelector('[type="submit"]');
      btn.textContent = '✓ Submitted';
      btn.disabled = true;
      btn.style.background = 'var(--success)';
      btn.style.color = '#111';
      setTimeout(() => {
        btn.textContent = 'Submit Inquiry';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        reqForm.reset();
      }, 3000);
    });
  }

  // ── Upload button (demo placeholder) ─────────────────────────
  const uploadBtn = document.getElementById('upload-btn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      alert('Upload functionality available in full Pivt platform.\n\nThis is a prototype demo.');
    });
  }

});
