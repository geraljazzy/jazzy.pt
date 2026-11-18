(() => {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Contactos ---------- */
  const waLink = (msg = S.mensagemWhatsapp || "Olá, gostaria de pedir um orçamento.") =>
    `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;

  $$("[data-whatsapp]").forEach(a => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-whatsapp-review]").forEach(a => { a.href = waLink("Olá, gostaria de deixar o meu testemunho sobre o trabalho realizado:"); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-phone]").forEach(a => { a.textContent = S.telefone; a.href = "tel:" + (S.telefone || "").replace(/\s/g, ""); });
  $$("[data-email]").forEach(a => { a.textContent = S.email; a.href = "mailto:" + S.email; });
  $$("[data-area]").forEach(el => el.textContent = S.zona);
  $$("[data-hours]").forEach(el => el.textContent = S.horario);
  $$("[data-instagram]").forEach(a => a.href = "https://www.instagram.com/" + S.instagram);
  $$("[data-instagram-handle]").forEach(el => el.textContent = "@" + S.instagram);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Cabeçalho / menu ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const toggleNav = open => {
    nav.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("no-scroll", open);
  };
  burger.addEventListener("click", () => toggleNav(!nav.classList.contains("is-open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => toggleNav(false)));

  /* ---------- Comparador Antes/Depois ---------- */
  function buildCompare(container, p, { interactive = true } = {}) {
    container.innerHTML = `
      <div class="ba__img ba__img--after">
        <img src="${esc(p.depois)}" alt="${esc(p.titulo)} — depois" loading="lazy" draggable="false">
        <div class="ba__ph"><span>Foto depois</span><small>${esc(p.depois)}</small></div>
      </div>
      <div class="ba__img ba__img--before">
        <img src="${esc(p.antes)}" alt="${esc(p.titulo)} — antes" loading="lazy" draggable="false">
        <div class="ba__ph"><span>Foto antes</span><small>${esc(p.antes)}</small></div>
      </div>
      <span class="ba__tag ba__tag--before">Antes</span>
      <span class="ba__tag ba__tag--after">Depois</span>
      <div class="ba__handle" role="slider" tabindex="0" aria-label="Comparar antes e depois" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
        <span class="ba__knob">⟷</span>
      </div>`;
    $$("img", container).forEach(img => {
      const mark = () => img.parentElement.classList.add("is-missing");
      img.addEventListener("error", mark);
      if (img.complete && !img.naturalWidth) mark();
    });

    const handle = $(".ba__handle", container);
    const set = pct => {
      pct = Math.max(0, Math.min(100, pct));
      container.style.setProperty("--pos", pct + "%");
      handle.setAttribute("aria-valuenow", Math.round(pct));
    };
    set(50);
    if (!interactive) return set;

    let dragging = false;
    const fromEvent = e => {
      const r = container.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };
    container.addEventListener("pointerdown", e => {
      dragging = true; container.setPointerCapture(e.pointerId); fromEvent(e);
      container.classList.add("is-dragging");
      e.stopPropagation();
    });
    container.addEventListener("pointermove", e => dragging && fromEvent(e));
    const stop = () => { dragging = false; container.classList.remove("is-dragging"); };
    container.addEventListener("pointerup", stop);
    container.addEventListener("pointercancel", stop);
    handle.addEventListener("keydown", e => {
      const cur = parseFloat(handle.getAttribute("aria-valuenow"));
      if (e.key === "ArrowLeft") { set(cur - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { set(cur + 5); e.preventDefault(); }
    });
    return set;
  }

  const projetos = S.projetos || [];

  /* Início: primeiro trabalho em destaque */
  const hero = $("#heroCompare");
  if (hero && projetos[0]) {
    buildCompare(hero, projetos[0]);
    $("#heroCaption").textContent = projetos[0].titulo + (projetos[0].local ? ", " + projetos[0].local : "");
  }

  /* ---------- Portefólio + filtros ---------- */
  const grid = $("#projects"), filters = $("#filters");
  const cats = ["Todos", ...new Set(projetos.map(p => p.categoria).filter(Boolean))];
  filters.innerHTML = cats.map((c, i) =>
    `<button class="chip${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

  let visible = projetos.map((_, i) => i);

  function renderProjects(cat = "Todos") {
    visible = projetos.map((p, i) => ({ p, i })).filter(({ p }) => cat === "Todos" || p.categoria === cat).map(x => x.i);
    grid.innerHTML = "";
    visible.forEach((idx, n) => {
      const p = projetos[idx];
      const card = document.createElement("article");
      card.className = "project";
      card.innerHTML = `
        <div class="ba"></div>
        <div class="project__body">
          <div>
            <span class="project__cat">${esc(p.categoria)}${p.local ? " · " + esc(p.local) : ""}</span>
            <h3>${esc(p.titulo)}</h3>
            ${p.descricao ? `<p>${esc(p.descricao)}</p>` : ""}
          </div>
          <button class="project__open" aria-label="Ver em ecrã inteiro: ${esc(p.titulo)}">⤢</button>
        </div>`;
      buildCompare($(".ba", card), p);
      $(".project__open", card).addEventListener("click", () => openLightbox(n));
      grid.appendChild(card);
    });
  }
  filters.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip", filters).forEach(c => { c.classList.toggle("is-active", c === b); c.setAttribute("aria-selected", c === b); });
    renderProjects(b.dataset.cat);
  });
  renderProjects();

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbCompare = $("#lightboxCompare"), lbCap = $("#lightboxCaption");
  let lbPos = 0, lastFocus = null;
  function showLb(n) {
    lbPos = (n + visible.length) % visible.length;
    const p = projetos[visible[lbPos]];
    buildCompare(lbCompare, p);
    lbCap.innerHTML = `<strong>${esc(p.titulo)}</strong><span>${esc(p.categoria)}${p.local ? " · " + esc(p.local) : ""}</span>${p.descricao ? `<p>${esc(p.descricao)}</p>` : ""}`;
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
  addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "PageUp") showLb(lbPos - 1);
    if (e.key === "PageDown") showLb(lbPos + 1);
  });

  /* ---------- Testemunhos ---------- */
  const tWrap = $("#testimonials");
  const tList = (S.testemunhos || []).filter(t => t && t.texto);
  if (tList.length) {
    tWrap.innerHTML = tList.map(t => `
      <figure class="testimonial">
        <blockquote>${esc(t.texto)}</blockquote>
        <footer>
          ${t.foto ? `<img class="testimonial__photo" src="${esc(t.foto)}" alt="${esc(t.nome)}" loading="lazy">` : `<span class="testimonial__initial">${esc((t.nome || "?").charAt(0))}</span>`}
          <span><strong>${esc(t.nome)}</strong><small>${[t.servico, t.local].filter(Boolean).map(esc).join(" · ")}</small></span>
        </footer>
      </figure>`).join("");
  } else {
    tWrap.innerHTML = Array.from({ length: S.espacosTestemunhos || 3 }, () => `
      <div class="testimonial testimonial--empty">
        <strong>Espaço para testemunho</strong>
        <span>Os testemunhos dos nossos clientes vão aparecer aqui.</span>
      </div>`).join("");
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  const form = $("#quoteForm"), note = $("#formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const bad = $$("[required]", form).filter(f => !f.value.trim());
    $$("[required]", form).forEach(f => f.classList.toggle("is-invalid", bad.includes(f)));
    if (bad.length) { note.textContent = "Por favor preencha os campos assinalados."; note.className = "form__note is-error"; bad[0].focus(); return; }
    const d = Object.fromEntries(new FormData(form));
    const msg = `Olá, gostaria de pedir um orçamento.\n\n• Nome: ${d.nome}\n• Telefone: ${d.telefone}\n• Serviço: ${d.servico}${d.local ? `\n• Localidade: ${d.local}` : ""}\n\n${d.mensagem}`;
    window.open(waLink(msg), "_blank", "noopener");
    note.textContent = "A abrir o WhatsApp com o seu pedido.";
    note.className = "form__note is-ok";
    form.reset();
  });

})();
