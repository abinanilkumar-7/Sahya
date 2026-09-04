import gsap from 'gsap';

export const isReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const animateHeroSequence = (elements: {
  navbar?: HTMLElement | null;
  badge?: HTMLElement | null;
  heading?: HTMLElement | null;
  subtext?: HTMLElement | null;
  searchBar?: HTMLElement | null;
  ctaContainer?: HTMLElement | null;
  heroVisual?: HTMLElement | null;
  floatingCards?: (HTMLElement | null)[];
}) => {
  if (isReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (elements.navbar) {
    tl.fromTo(elements.navbar, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 });
  }

  if (elements.badge) {
    tl.fromTo(elements.badge, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
  }

  if (elements.heading) {
    tl.fromTo(elements.heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3');
  }

  if (elements.subtext) {
    tl.fromTo(elements.subtext, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
  }

  if (elements.searchBar) {
    tl.fromTo(elements.searchBar, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '-=0.3');
  }

  if (elements.ctaContainer) {
    tl.fromTo(elements.ctaContainer, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
  }

  if (elements.heroVisual) {
    tl.fromTo(elements.heroVisual, { scale: 0.9, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.9 }, '-=0.6');
  }

  if (elements.floatingCards && elements.floatingCards.length > 0) {
    elements.floatingCards.forEach((card, index) => {
      if (card) {
        tl.fromTo(
          card,
          { y: 30 + index * 10, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          `-=${0.4 - index * 0.1}`
        );
      }
    });
  }

  return tl;
};
