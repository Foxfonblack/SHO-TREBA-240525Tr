document.addEventListener("mouseover", (event) => {
  // Сразу удаляем все существующие тултипы при любом клике
  document.querySelectorAll(".tooltip-js").forEach(el => el.remove());

  const trigger = event.target.closest("[data-tooltip]");
  if (!trigger) return;
  // Создаём div для тултипа
  const tip = document.createElement("div");
  tip.className = "tooltip-js";
  tip.textContent = trigger.getAttribute("data-tooltip");
  document.body.appendChild(tip);

  // Вычисляем позицию: над триггером по центру
  const rect = trigger.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();

  // Ставим так, чтобы тултип был над элементом:
  const top = window.scrollY + rect.top - tipRect.height - 8;
  const left = window.scrollX + rect.left + rect.width / 2 - tipRect.width / 2;

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;

  // Плавно показываем
  requestAnimationFrame(() => {
    tip.style.opacity = "1";
  });
});

// Убираем тултип, когда кликают вне элемента (найденного выше)
document.addEventListener("scroll", () => {
  document.querySelectorAll(".tooltip-js").forEach(el => el.remove());
});
