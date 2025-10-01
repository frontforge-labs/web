import type { TScrollAnimationConfig } from "./types";

export const defaultScrollAnimationConfig: TScrollAnimationConfig = {
  animationType: "fade-up",
  trigger: "onEnter",
  threshold: 0.2,
  duration: 0.6,
  delay: 0,
  easingFunction: "ease-out",
  translateX: "0",
  translateY: "40px",
  scale: "1",
  rotate: "0deg",
  opacity: 0,
  stagger: 0.1,
  once: true,
};

export const scrollAnimationPresets: Record<
  string,
  Partial<TScrollAnimationConfig>
> = {
  "Fade In": {
    animationType: "fade",
    translateX: "0",
    translateY: "0",
    scale: "1",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Fade Up": {
    animationType: "fade-up",
    translateX: "0",
    translateY: "40px",
    scale: "1",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Fade Down": {
    animationType: "fade-down",
    translateX: "0",
    translateY: "-40px",
    scale: "1",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Fade Left": {
    animationType: "fade-left",
    translateX: "40px",
    translateY: "0",
    scale: "1",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Fade Right": {
    animationType: "fade-right",
    translateX: "-40px",
    translateY: "0",
    scale: "1",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Scale Up": {
    animationType: "scale-up",
    translateX: "0",
    translateY: "0",
    scale: "0.8",
    rotate: "0deg",
    opacity: 0,
    duration: 0.5,
  },
  "Zoom In": {
    animationType: "zoom",
    translateX: "0",
    translateY: "0",
    scale: "0.5",
    rotate: "0deg",
    opacity: 0,
    duration: 0.6,
  },
  "Flip Up": {
    animationType: "flip",
    translateX: "0",
    translateY: "0",
    scale: "1",
    rotate: "-180deg",
    opacity: 0,
    duration: 0.8,
  },
};

export const generateScrollAnimationCSS = (
  config: TScrollAnimationConfig
): string => {
  return `/* Scroll Animation Setup */

/* Initial state (before scroll trigger) */
.scroll-animate {
  opacity: ${config.opacity};
  transform: translateX(${config.translateX})
             translateY(${config.translateY})
             scale(${config.scale})
             rotate(${config.rotate});
  transition: all ${config.duration}s ${config.easingFunction} ${config.delay}s;
}

/* Animated state (after scroll trigger) */
.scroll-animate.is-visible {
  opacity: 1;
  transform: translateX(0) translateY(0) scale(1) rotate(0deg);
}

/* JavaScript Implementation Example */
/*
const observerOptions = {
  threshold: ${config.threshold},
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * ${config.stagger * 1000}); // Stagger delay

      ${config.once ? "observer.unobserve(entry.target); // Animate once" : "// Animate every time"}
    }${!config.once ? " else {\n      entry.target.classList.remove('is-visible');\n    }" : ""}
  });
}, observerOptions);

// Observe all elements
document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});
*/

/* CSS Scroll Timeline (Experimental) */
/*
@supports (animation-timeline: scroll()) {
  .scroll-animate {
    animation: fadeIn ${config.duration}s ${config.easingFunction};
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }

  @keyframes fadeIn {
    from {
      opacity: ${config.opacity};
      transform: translateX(${config.translateX})
                 translateY(${config.translateY})
                 scale(${config.scale})
                 rotate(${config.rotate});
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0) scale(1) rotate(0deg);
    }
  }
}
*/`;
};
