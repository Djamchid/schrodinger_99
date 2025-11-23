*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "DejaVu Sans", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
}

body {
  margin: 0;
  background: #f3f4f6;
  color: #111827;
}

.app-header {
  padding: 1.5rem 1.75rem 1rem;
  background: #111827;
  color: #f9fafb;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 1rem;
  padding: 1rem 1.5rem 2rem;
}

#mindmap-section,
#details-section {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(15,23,42,0.12);
}

#mindmap-section h2,
#details-section h2 {
  margin-top: 0;
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

.hint {
  margin: 0 0 0.6rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.mindmap-wrapper {
  width: 100%;
  overflow: auto;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: radial-gradient(circle at top, #f9fafb 0, #ffffff 60%);
}

.mindmap-svg {
  display: block;
  max-width: none; /* scroll si trop large */
}

/* Accordéon */

.accordion {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.accordion-item {
  border-radius: 0.6rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  text-align: left;
  background: #e5e7eb;
  border: none;
  padding: 0.6rem 0.9rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.accordion-header::after {
  content: "▾";
  font-size: 0.8rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.accordion-item.open .accordion-header::after {
  transform: rotate(-180deg);
}

.accordion-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;
}

.accordion-item.open .accordion-panel {
  max-height: 2000px; /* assez grand pour le contenu */
}

.accordion-panel article {
  padding: 0.6rem 0.9rem;
  border-top: 1px solid #e5e7eb;
}

.accordion-panel article h3 {
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
}

.accordion-panel article p {
  margin: 0 0 0.2rem;
  font-size: 0.9rem;
}

/* Highlight du bloc de détail sélectionné */

.detail-block.detail-highlight {
  background: #e0f2fe;
  box-shadow: inset 0 0 0 1px #93c5fd;
  border-radius: 0.5rem;
}

/* Footer */

.app-footer {
  padding: 0.75rem 1.5rem 1rem;
  text-align: right;
  font-size: 0.8rem;
  color: #6b7280;
}

/* Réactivité */

@media (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }

  #mindmap-section {
    order: 1;
  }

  #details-section {
    order: 2;
  }
}
