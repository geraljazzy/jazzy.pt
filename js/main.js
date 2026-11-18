(() => {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = n => String(n).padStart(2, "0");

  /* ---------- Contactos ---------- */
  const waLink = (msg = S.mensagemWhatsapp || "Olá, gostaria de pedir um orçamento.") =>
    `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
  const ext = a => { a.target = "_blank"; a.rel = "noopener"; };

  $$("[data-whatsapp]").forEach(a => { a.href = waLink(); ext(a); });
  $$("[data-whatsapp-review]").forEach(a => { a.href = waLink("Olá, gostaria de deixar o meu testemunho sobre o trabalho realizado:"); ext(a); });
  $$("[data-phone]").forEach(a => { a.textContent = S.telefone; a.href = "tel:" + (S.telefone || "").replace(/\s/g, ""); });
  $$("[data-email]").forEach(a => { a.textContent = S.email; a.href = "mailto:" + S.email; });
  $$("[data-area]").forEach(el => el.textContent = S.zona);
  $$("[data-hours]").forEach(el => el.textContent = S.horario);
  $$("[data-instagram]").forEach(a => a.href = "https://www.instagram.com/" + S.instagram);
  $$("[data-instagram-handle]").forEach(el => el.textContent = "@" + S.instagram);
  $$("[data-email],[data-area],[data-hours]").forEach(el => { if (!el.textContent.trim()) (el.closest("dl > div, li") || el).style.display = "none"; });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Menu (telemóvel) ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const toggleNav = open => {
    nav.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("no-scroll", open);
  };
  burger.addEventListener("click", () => toggleNav(!nav.classList.contains("is-open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => toggleNav(false)));

  /* ---------- Comparador antes/depois ---------- */
  function fillCompare(container, p) {
    $$(".ba__img", container).forEach(el => el.remove());
    container.insertAdjacentHTML("afterbegin", `
      <div class="ba__img ba__img--after">
        <img src="${esc(p.depois)}" alt="${esc(p.titulo)}: depois" draggable="false">
        <div class="ba__ph"><span>Foto depois</span></div>
      </div>
      <div class="ba__img ba__img--before">
        <img src="${esc(p.antes)}" alt="${esc(p.titulo)}: antes" draggable="false">
        <div class="ba__ph"><span>Foto antes</span></div>
      </div>`);
    $$("img", container).forEach(img => {
      const mark = () => img.parentElement.classList.add("is-missing");
      img.addEventListener("error", mark);
      if (img.complete && !img.naturalWidth) mark();
    });
  }

  function buildCompare(container, p, onInteract) {
    container.innerHTML = `
      <span class="ba__tag ba__tag--before">Antes</span>
      <span class="ba__tag ba__tag--after">Depois</span>
      <div class="ba__handle" role="slider" tabindex="0" aria-label="Comparar antes e depois" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
        <span class="ba__knob"><svg viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></span>
      </div>`;
    fillCompare(container, p);

    const handle = $(".ba__handle", container);
    const set = pct => {
      pct = Math.max(0, Math.min(100, pct));
      container.style.setProperty("--pos", pct + "%");
      handle.setAttribute("aria-valuenow", Math.round(pct));
    };
    set(50);

    let dragging = false;
    const fromEvent = e => {
      const r = container.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    container.addEventListener("pointerdown", e => {
      dragging = true; container.setPointerCapture(e.pointerId); fromEvent(e); onInteract?.();
    });
    container.addEventListener("pointermove", e => dragging && fromEvent(e));
    const stop = () => { dragging = false; };
    container.addEventListener("pointerup", stop);
    container.addEventListener("pointercancel", stop);
    handle.addEventListener("keydown", e => {
      const cur = parseFloat(handle.getAttribute("aria-valuenow"));
      if (e.key === "ArrowLeft") { set(cur - 5); e.preventDefault(); onInteract?.(); }
      if (e.key === "ArrowRight") { set(cur + 5); e.preventDefault(); onInteract?.(); }
    });
    return set;
  }

  const projetos = S.projetos || [];

  /* ---------- Abertura: trabalhos em rotação ---------- */
  const hero = $("#heroCompare");
  if (hero && projetos.length) {
    const every = Math.max(5, S.rotacaoSegundos || 30) * 1000;
    const bar = $("#heroProgress");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hi = 0, timer, anim;

    const restart = () => {
      clearTimeout(timer); anim?.cancel();
      if (projetos.length < 2) return;
      if (!reduce) anim = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: every, easing: "linear", fill: "forwards" });
      timer = setTimeout(() => show(hi + 1), every);
    };
    const setPos = buildCompare(hero, projetos[0], restart);
    const label = () => {
      const p = projetos[hi];
      $("#heroCount").textContent = `${pad(hi + 1)} / ${pad(projetos.length)}`;
      $("#heroTitle").textContent = p.titulo;
      $("#heroPlace").textContent = [p.categoria, p.local].filter(Boolean).join(" · ");
    };
    function show(n) {
      hi = (n + projetos.length) % projetos.length;
      hero.classList.add("is-swapping");
      setTimeout(() => {
        fillCompare(hero, projetos[hi]); setPos(50); label();
        hero.classList.remove("is-swapping");
      }, reduce ? 0 : 350);
      restart();
    }
    $("#heroPrev").addEventListener("click", () => show(hi - 1));
    $("#heroNext").addEventListener("click", () => show(hi + 1));
    if (projetos.length < 2) $(".hero__arrows").hidden = true;
    label(); restart();
  }

  /* ---------- Trabalhos + filtros ---------- */
  const grid = $("#projects"), filters = $("#filters");
  const cats = ["Todos", ...new Set(projetos.map(p => p.categoria).filter(Boolean))];
  filters.innerHTML = cats.map((c, i) =>
    `<button class="chip${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

  let visible = [];
  function renderProjects(cat = "Todos") {
    visible = projetos.map((p, i) => ({ p, i })).filter(({ p }) => cat === "Todos" || p.categoria === cat).map(x => x.i);
    grid.innerHTML = "";
    visible.forEach((idx, n) => {
      const p = projetos[idx];
      const el = document.createElement("article");
      el.className = "project";
      el.innerHTML = `
        <div class="ba"></div>
        <div class="project__body">
          <div>
            <h3>${esc(p.titulo)}</h3>
            ${p.descricao ? `<p>${esc(p.descricao)}</p>` : ""}
          </div>
          <div class="project__meta">
            <span>${[p.categoria, p.local].filter(Boolean).map(esc).join(" · ")}</span>
            <button class="project__open">Ampliar</button>
          </div>
        </div>`;
      buildCompare($(".ba", el), p);
      $(".project__open", el).addEventListener("click", () => openLightbox(n));
      grid.appendChild(el);
    });
  }
  filters.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip", filters).forEach(c => { c.classList.toggle("is-active", c === b); c.setAttribute("aria-selected", c === b); });
    renderProjects(b.dataset.cat);
  });
  renderProjects();

  /* ---------- Ampliar ---------- */
  const lb = $("#lightbox"), lbCompare = $("#lightboxCompare"), lbCap = $("#lightboxCaption");
  let lbPos = 0, lastFocus = null;
  function showLb(n) {
    lbPos = (n + visible.length) % visible.length;
    const p = projetos[visible[lbPos]];
    buildCompare(lbCompare, p);
    lbCap.innerHTML = `<strong>${esc(p.titulo)}</strong><span>${[p.categoria, p.local].filter(Boolean).map(esc).join(" · ")}</span>`;
  }
  function openLightbox(n) {
    lastFocus = document.activeElement;
    showLb(n);
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $("#lightboxClose").focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lastFocus?.focus();
  }
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", () => showLb(lbPos - 1));
  $("#lightboxNext").addEventListener("click", () => showLb(lbPos + 1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("is-open")) closeLightbox(); });

  /* ---------- Testemunhos ---------- */
  const tWrap = $("#testimonials");
  const tList = (S.testemunhos || []).filter(t => t && t.texto);
  if (tList.length) {
    tWrap.innerHTML = tList.map(t => `
      <figure class="testimonial">
        <blockquote>${esc(t.texto)}</blockquote>
        <figcaption>
          ${t.foto ? `<img class="testimonial__photo" src="${esc(t.foto)}" alt="" loading="lazy">` : ""}
          <span><strong>${esc(t.nome)}</strong><small>${[t.servico, t.local].filter(Boolean).map(esc).join(" · ")}</small></span>
        </figcaption>
      </figure>`).join("");
  } else {
    tWrap.innerHTML = Array.from({ length: S.espacosTestemunhos || 3 }, (_, i) => `
      <div class="testimonial testimonial--empty">
        <blockquote>Espaço para o testemunho ${i + 1}</blockquote>
        <figcaption><span><strong>Nome do cliente</strong><small>Serviço · Localidade</small></span></figcaption>
      </div>`).join("");
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = $("#quoteForm"), note = $("#formNote");
  $$("[data-servico]").forEach(a => a.addEventListener("click", () => { form.servico.value = a.dataset.servico; }));
  form.addEventListener("submit", e => {
    e.preventDefault();
    const req = $$("[required]", form), bad = req.filter(f => !f.value.trim());
    req.forEach(f => f.classList.toggle("is-invalid", bad.includes(f)));
    if (bad.length) { note.textContent = "Preencha os campos assinalados."; note.className = "form__note is-error"; bad[0].focus(); return; }
    const d = Object.fromEntries(new FormData(form));
    const msg = `Olá, gostaria de pedir um orçamento.\n\nNome: ${d.nome}\nTelefone: ${d.telefone}\nServiço: ${d.servico}${d.local ? `\nLocalidade: ${d.local}` : ""}\n\n${d.mensagem}`;
    window.open(waLink(msg), "_blank", "noopener");
    note.textContent = "A abrir o WhatsApp com o seu pedido.";
    note.className = "form__note is-ok";
    form.reset();
  });
})();
