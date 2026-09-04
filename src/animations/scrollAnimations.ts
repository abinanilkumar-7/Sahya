import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './heroAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initCounterAnimation = (
  element: HTMLElement,
  endValue: number,
  prefix: string = '',
  suffix: string = ''
) => {
  if (isReducedMotion()) {
    element.innerText = `${prefix}${endValue.toLocaleString()}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: endValue,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
    onUpdate: () => {
      element.innerText = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
    },
  });
};

export const initParallaxBackground = (container: HTMLElement, bgElement: HTMLElement) => {
  if (isReducedMotion()) return;

  gsap.to(bgElement, {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};
