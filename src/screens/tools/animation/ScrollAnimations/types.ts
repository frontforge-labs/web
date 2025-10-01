export interface TScrollAnimationConfig {
  animationType: string;
  trigger: string;
  threshold: number;
  duration: number;
  delay: number;
  easingFunction: string;
  // Animation properties
  translateX: string;
  translateY: string;
  scale: string;
  rotate: string;
  opacity: number;
  // Advanced
  stagger: number;
  once: boolean;
}
