// Shared across index.html, cases.html and highlights.html.
// Each page includes only the data files it needs, and only has the
// container elements it uses — the render functions no-op otherwise.

// How many entries the landing-page card rails show before "View all".
// They scroll horizontally, so this can be higher than a stacked list.
const PREVIEW_COUNT = 5;

function renderMockBadge(value) {
  if (
    value === "OK" ||
    value === "Assigned" ||
    value === "Chosen" ||
    value === "Verified accuracy" ||
    value === "Complete" ||
    value === "Closed"
  ) {
    return `<span class="badge badge-ok">${value}</span>`;
  }
  if (
    value === "Over-allocated" ||
    value === "No lead assigned" ||
    value === "Not tested" ||
    value === "Blocker"
  ) {
    return `<span class="badge badge-risk">${value}</span>`;
  }
  if (
    value === "Planned" ||
    value === "Skipped" ||
    value === "Verified presentation" ||
    value === "Partial" ||
    value === "Accepted risk" ||
    value === "Documented"
  ) {
    return `<span class="badge badge-neutral">${value}</span>`;
  }
  return value;
}

function renderMockPanel(mock) {
  if (!mock) return "";

  const headerRow = mock.table.columns.map((col) => `<th>${col}</th>`).join("");
  const bodyRows = mock.table.rows
    .map((row) => {
      const cells = row
        .map(
          (cell, i) =>
            `<td data-label="${mock.table.columns[i]}">${renderMockBadge(cell)}</td>`
        )
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  const leadStatusPills = (mock.leadStatus || [])
    .map(
      (ls) =>
        `<span class="lead-pill">${ls.project}: ${renderMockBadge(ls.status)}</span>`
    )
    .join("");

  return `
    <div class="mock-panel">
      <p class="mock-caption">${mock.caption}</p>
      <div class="mock-table-wrap">
        <table class="mock-table">
          <thead><tr>${headerRow}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      ${leadStatusPills ? `<div class="lead-status-row">${leadStatusPills}</div>` : ""}
      <p class="mock-footnote">${mock.footnote}</p>
    </div>
  `;
}

// Shortens text at a word boundary for the preview teaser.
function truncateText(text, maxLen) {
  if (!text || text.length <= maxLen) return text || "";
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + "…";
}

// Reads the hash for a requested detail view, e.g. "#case-003".
function parseDetailHash() {
  const hash = window.location.hash || "";
  let m = hash.match(/^#case-(\d+)$/);
  if (m) return { type: "case", id: m[1] };
  m = hash.match(/^#highlight-(\d+)$/);
  if (m) return { type: "highlight", id: m[1] };
  return null;
}

/* ---------- Case study markup ---------- */

function buildCaseDetailHTML(c) {
  return `
    <div class="case-head">
      <span class="case-id">Case ${c.id}</span>
      <h3 class="case-title">${c.title}</h3>
    </div>
    <p class="case-meta">${c.project} — ${c.period}</p>
    <span class="case-tag">${c.tag}</span>
    <dl class="case-fields">
      <div class="case-field">
        <dt>Context</dt>
        <dd>${c.context}</dd>
      </div>
      <div class="case-field is-risk">
        <dt>Risk</dt>
        <dd>${c.risk}</dd>
      </div>
      <div class="case-field is-mitigation">
        <dt>Mitigation</dt>
        <dd>${c.mitigation}</dd>
      </div>
      <div class="case-field is-mitigation">
        <dt>Outcome</dt>
        <dd>${c.outcome}</dd>
      </div>
    </dl>
    ${renderMockPanel(c.mock)}
  `;
}

function buildCasePreviewHTML(c, href) {
  return `
    <div class="case-head">
      <span class="case-id">Case ${c.id}</span>
      <h3 class="case-title">${c.title}</h3>
    </div>
    <p class="case-meta">${c.project} — ${c.period}</p>
    <span class="case-tag">${c.tag}</span>
    <p class="case-preview-teaser">${truncateText(c.context, 170)}</p>
    <a class="more-link" href="${href}">More →</a>
  `;
}

/* ---------- Highlight markup ---------- */

function buildHighlightDetailHTML(h) {
  const bulletItems = (h.highlights || [])
    .map((item) => `<li>${item}</li>`)
    .join("");
  return `
    <div class="case-head">
      <span class="case-id">Project ${h.id}</span>
      <h3 class="case-title">${h.title}</h3>
    </div>
    <p class="case-meta">${h.project} — ${h.period}</p>
    <p class="highlight-story">${h.story}</p>
    ${bulletItems ? `<ul class="highlight-bullets">${bulletItems}</ul>` : ""}
    ${renderMockPanel(h.mock)}
  `;
}

function buildHighlightPreviewHTML(h, href) {
  return `
    <div class="case-head">
      <span class="case-id">Project ${h.id}</span>
      <h3 class="case-title">${h.title}</h3>
    </div>
    <p class="case-meta">${h.project} — ${h.period}</p>
    <p class="case-preview-teaser">${truncateText(h.story, 170)}</p>
    <a class="more-link" href="${href}">More →</a>
  `;
}

/* ---------- Renderers ---------- */

function appendEmptyNote(list) {
  const empty = document.createElement("p");
  empty.className = "case-log-intro";
  empty.textContent = "No entries yet — check back soon.";
  list.appendChild(empty);
}

// Landing page: first few entries as previews, linking off to the full page.
function renderLandingPreviews(cases, highlights) {
  const caseList = document.getElementById("case-list-preview");
  if (caseList) {
    caseList.innerHTML = "";
    if (!cases || cases.length === 0) {
      appendEmptyNote(caseList);
    } else {
      cases.slice(0, PREVIEW_COUNT).forEach((c) => {
        const card = document.createElement("article");
        card.className = "case case-preview";
        card.innerHTML = buildCasePreviewHTML(c, `cases.html#case-${c.id}`);
        caseList.appendChild(card);
      });
    }
  }

  const highlightList = document.getElementById("highlight-list-preview");
  if (highlightList) {
    highlightList.innerHTML = "";
    if (!highlights || highlights.length === 0) {
      appendEmptyNote(highlightList);
    } else {
      highlights.slice(0, PREVIEW_COUNT).forEach((h) => {
        const card = document.createElement("article");
        card.className = "case highlight-card case-preview";
        card.innerHTML = buildHighlightPreviewHTML(h, `highlights.html#highlight-${h.id}`);
        highlightList.appendChild(card);
      });
    }
  }
}

// cases.html: full list, or one case's detail when the hash asks for it.
function renderCasesPage(cases) {
  const list = document.getElementById("case-list");
  if (!list) return;
  list.innerHTML = "";

  if (!cases || cases.length === 0) {
    appendEmptyNote(list);
    return;
  }

  const detail = parseDetailHash();
  if (detail && detail.type === "case") {
    const match = cases.find((c) => c.id === detail.id);
    if (match) {
      const back = document.createElement("a");
      back.className = "back-link";
      back.href = "cases.html";
      back.textContent = "← Back to all case studies";
      list.appendChild(back);

      const card = document.createElement("article");
      card.className = "case";
      card.innerHTML = buildCaseDetailHTML(match);
      list.appendChild(card);
      return;
    }
  }

  cases.forEach((c) => {
    const card = document.createElement("article");
    card.className = "case case-preview";
    card.innerHTML = buildCasePreviewHTML(c, `#case-${c.id}`);
    list.appendChild(card);
  });
}

// highlights.html: full list, or one highlight's detail.
function renderHighlightsPage(highlights) {
  const list = document.getElementById("highlight-list");
  if (!list) return;
  list.innerHTML = "";

  if (!highlights || highlights.length === 0) {
    appendEmptyNote(list);
    return;
  }

  const detail = parseDetailHash();
  if (detail && detail.type === "highlight") {
    const match = highlights.find((h) => h.id === detail.id);
    if (match) {
      const back = document.createElement("a");
      back.className = "back-link";
      back.href = "highlights.html";
      back.textContent = "← Back to all project highlights";
      list.appendChild(back);

      const card = document.createElement("article");
      card.className = "case highlight-card";
      card.innerHTML = buildHighlightDetailHTML(match);
      list.appendChild(card);
      return;
    }
  }

  highlights.forEach((h) => {
    const card = document.createElement("article");
    card.className = "case highlight-card case-preview";
    card.innerHTML = buildHighlightPreviewHTML(h, `#highlight-${h.id}`);
    list.appendChild(card);
  });
}

function renderAll() {
  const cases = typeof caseStudies !== "undefined" ? caseStudies : [];
  const highlights = typeof projectHighlights !== "undefined" ? projectHighlights : [];
  renderLandingPreviews(cases, highlights);
  renderCasesPage(cases);
  renderHighlightsPage(highlights);
}

// Wires the ← / → buttons next to each card rail, and keeps them disabled
// at the ends so they don't look clickable when there's nowhere to go.
function setupRails() {
  document.querySelectorAll(".card-rail").forEach((rail) => {
    const prev = document.querySelector(`[data-rail-prev="${rail.id}"]`);
    const next = document.querySelector(`[data-rail-next="${rail.id}"]`);
    if (!prev && !next) return;

    const step = () => {
      const card = rail.querySelector(".case");
      if (!card) return rail.clientWidth * 0.8;
      const gap = parseFloat(getComputedStyle(rail).columnGap || "20") || 20;
      return card.getBoundingClientRect().width + gap;
    };

    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth - 1;
      if (prev) prev.disabled = rail.scrollLeft <= 0;
      if (next) next.disabled = rail.scrollLeft >= max;
    };

    if (prev) prev.addEventListener("click", () => rail.scrollBy({ left: -step() }));
    if (next) next.addEventListener("click", () => rail.scrollBy({ left: step() }));
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  });
}

function animateStats() {
  const row = document.querySelector("[data-animate-stats]");
  if (!row) return;
  const numbers = row.querySelectorAll("[data-count-to]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = () => {
    numbers.forEach((el) => {
      const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      if (prefersReduced) {
        el.textContent = target;
        return;
      }
      const duration = 900;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(row);
  } else {
    run();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  setupRails();
  animateStats();
});

// Switching between the list and a detail view only changes the hash,
// so re-render on that (covers back/forward buttons too).
window.addEventListener("hashchange", renderAll);
