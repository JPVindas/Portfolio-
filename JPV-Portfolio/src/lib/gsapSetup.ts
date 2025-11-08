// src/lib/gsapSetup.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      markers: false,
      toggleActions: "play none none reverse",
    });
    registered = true;
  }
}

export { gsap, ScrollTrigger };
