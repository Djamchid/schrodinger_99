document.addEventListener("DOMContentLoaded", () => {
  // ========== ZOOM ET PAN ==========

  const svg = document.querySelector(".mindmap-svg");
  const zoomableContent = document.getElementById("zoomable-content");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const zoomResetBtn = document.getElementById("zoom-reset");

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isPanning = false;
  let startX, startY;

  const ZOOM_STEP = 0.2;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;

  function updateTransform() {
    zoomableContent.setAttribute(
      "transform",
      `translate(${translateX}, ${translateY}) scale(${scale})`
    );
  }

  function zoom(delta) {
    const oldScale = scale;
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));

    // Ajuster la translation pour zoomer vers le centre
    const svgRect = svg.getBoundingClientRect();
    const centerX = svgRect.width / 2;
    const centerY = svgRect.height / 2;

    const scaleRatio = scale / oldScale;
    translateX = centerX - (centerX - translateX) * scaleRatio;
    translateY = centerY - (centerY - translateY) * scaleRatio;

    updateTransform();
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  // Boutons de zoom
  zoomInBtn.addEventListener("click", () => zoom(ZOOM_STEP));
  zoomOutBtn.addEventListener("click", () => zoom(-ZOOM_STEP));
  zoomResetBtn.addEventListener("click", resetZoom);

  // Zoom avec la molette
  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;

    const oldScale = scale;
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));

    // Zoomer vers la position de la souris
    const svgRect = svg.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;

    const scaleRatio = scale / oldScale;
    translateX = mouseX - (mouseX - translateX) * scaleRatio;
    translateY = mouseY - (mouseY - translateY) * scaleRatio;

    updateTransform();
  });

  // Pan avec glisser-déposer
  svg.addEventListener("mousedown", (e) => {
    // Ne pas activer le pan si on clique sur un élément cliquable
    if (e.target.closest("[data-target]")) return;

    isPanning = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  });

  svg.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  svg.addEventListener("mouseup", () => {
    isPanning = false;
  });

  svg.addEventListener("mouseleave", () => {
    isPanning = false;
  });

  // ========== ACCORDÉONS ==========

  const accordionItems = document.querySelectorAll(".accordion-item");

  // Ouvrir tous les accordéons par défaut
  accordionItems.forEach((item) => {
    item.classList.add("open");

    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  // ========== INTERACTION SVG → TEXTE ==========

  const clickable = svg.querySelectorAll("[data-target]");
  const detailBlocks = document.querySelectorAll(".detail-block");

  function clearHighlights() {
    svg.querySelectorAll(".svg-active").forEach((el) => {
      el.classList.remove("svg-active");
    });
    detailBlocks.forEach((block) => {
      block.classList.remove("detail-highlight");
    });
  }

  function openGroupForTarget(targetId) {
    const isNode = targetId.startsWith("node-");
    const groupName = isNode ? "nodes" : "edges";
    accordionItems.forEach((item) => {
      if (item.dataset.group === groupName) {
        item.classList.add("open");
      }
    });
  }

  clickable.forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", (e) => {
      e.stopPropagation(); // Empêcher le pan

      const targetId = el.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (!target) return;

      clearHighlights();

      // Highlight SVG element
      el.classList.add("svg-active");
      // Highlight text block
      target.classList.add("detail-highlight");

      // Ouvrir la bonne section (nœuds ou arêtes)
      openGroupForTarget(targetId);

      // Scroll vers le bloc
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  });
});
