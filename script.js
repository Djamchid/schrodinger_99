document.addEventListener("DOMContentLoaded", () => {
  // Accordéon simple
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  // Interaction SVG -> texte
  const svg = document.querySelector(".mindmap-svg");
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
    el.addEventListener("click", () => {
      const targetId = el.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (!target) return;

      clearHighlights();

      // highlight SVG element
      el.classList.add("svg-active");
      // highlight text block
      target.classList.add("detail-highlight");

      // ouvrir la bonne section (nœuds ou arêtes)
      openGroupForTarget(targetId);

      // scroll vers le bloc
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  });
});
