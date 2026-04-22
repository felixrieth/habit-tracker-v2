(function () {
  const MOBILE_QUERY = "(max-width: 920px)";
  const media = window.matchMedia(MOBILE_QUERY);

  function injectStyles() {
    if (document.querySelector("#mobile-fixes-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "mobile-fixes-style";
    style.textContent = `
      @media (max-width: 920px) {
        .monthly-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .monthly-cards .day-card {
          padding: 0;
          overflow: hidden;
        }

        .monthly-cards .day-card-header {
          position: relative;
          align-items: center;
          min-height: 58px;
          margin: 0;
          padding: 14px 46px 14px 14px;
          cursor: pointer;
          user-select: none;
        }

        .monthly-cards .day-card-header::after {
          content: "⌄";
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          color: var(--muted);
          font-size: 1.15rem;
          transition: transform 160ms ease;
        }

        .monthly-cards .day-card.is-expanded .day-card-header::after {
          transform: translateY(-50%) rotate(0deg);
        }

        .monthly-cards .day-card-title {
          font-size: 1rem;
        }

        .monthly-cards .day-card-meta {
          border-radius: 999px;
          padding: 6px 10px;
          background: rgba(47, 106, 87, 0.09);
          color: var(--ink);
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .monthly-cards .day-card:not(.is-expanded) .day-card-grid,
        .monthly-cards .day-card:not(.is-expanded) .day-card-note {
          display: none;
        }

        .monthly-cards .day-card-grid,
        .monthly-cards .day-card-note {
          padding: 0 14px 14px;
        }

        .monthly-cards .day-card-item {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(112px, 42%);
          align-items: center;
          gap: 10px;
        }

        .monthly-cards .day-card-label {
          margin: 0;
        }

        .bedtime-input.mobile-time-text {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          text-align: center;
        }

        .today-bedtime-input.mobile-time-text,
        .today-inline-entry .bedtime-input.mobile-time-text {
          width: 100%;
          min-width: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeTime(value) {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 4);
    if (!digits) {
      return "";
    }

    const padded = digits.length <= 2 ? digits.padStart(2, "0") + "00" : digits.padStart(4, "0");
    const hours = Math.min(23, Number(padded.slice(0, 2)) || 0);
    const minutes = Math.min(59, Number(padded.slice(2, 4)) || 0);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  function enhanceTimeInput(input) {
    if (input.dataset.mobileTimeEnhanced === "true") {
      return;
    }

    input.dataset.mobileTimeEnhanced = "true";
    input.type = "text";
    input.inputMode = "numeric";
    input.placeholder = "23:30";
    input.maxLength = 5;
    input.autocomplete = "off";
    input.classList.add("mobile-time-text");

    input.addEventListener("input", () => {
      const raw = input.value.replace(/\D/g, "").slice(0, 4);
      input.value = raw.length > 2 ? `${raw.slice(0, 2)}:${raw.slice(2)}` : raw;
    });

    input.addEventListener("blur", () => {
      const nextValue = normalizeTime(input.value);
      if (input.value !== nextValue) {
        input.value = nextValue;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  function enhanceDayCard(card) {
    if (card.dataset.mobileAccordionEnhanced === "true") {
      return;
    }

    const header = card.querySelector(".day-card-header");
    if (!header) {
      return;
    }

    card.dataset.mobileAccordionEnhanced = "true";
    card.classList.remove("is-expanded");
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-expanded", "false");

    const toggle = () => {
      const isExpanded = card.classList.toggle("is-expanded");
      header.setAttribute("aria-expanded", String(isExpanded));
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  }

  function enhanceMobileUi() {
    if (!media.matches) {
      return;
    }

    injectStyles();
    document.querySelectorAll(".monthly-cards .day-card").forEach(enhanceDayCard);
    document.querySelectorAll(".bedtime-input, .today-bedtime-input").forEach(enhanceTimeInput);
  }

  const observer = new MutationObserver(() => enhanceMobileUi());

  function start() {
    enhanceMobileUi();
    const monthlyCards = document.querySelector("#monthly-cards");
    if (monthlyCards) {
      observer.observe(monthlyCards, { childList: true, subtree: true });
    }
    media.addEventListener("change", enhanceMobileUi);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
