export interface TTransitionConfig {
  property: string;
  duration: number;
  timingFunction: string;
  delay: number;
  isHovered: boolean;
  // State values
  initialState: {
    width: string;
    height: string;
    backgroundColor: string;
    transform: string;
    opacity: number;
    borderRadius: string;
  };
  hoverState: {
    width: string;
    height: string;
    backgroundColor: string;
    transform: string;
    opacity: number;
    borderRadius: string;
  };
}
