import type { GradientConfig, BoxShadowLayer, BorderRadiusConfig } from '../types';

export function buildGradient(config: GradientConfig): string {
  const { type, angle, stops } = config;

  if (stops.length === 0) return '';

  const stopsString = stops
    .sort((a, b) => a.position - b.position)
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ');

  if (type === 'linear') {
    return `background: linear-gradient(${angle}deg, ${stopsString});`;
  } else {
    return `background: radial-gradient(circle, ${stopsString});`;
  }
}

export function buildBoxShadow(layers: BoxShadowLayer[]): string {
  if (layers.length === 0) return '';

  const shadowStrings = layers.map(layer => {
    const { x, y, blur, spread, color, inset } = layer;
    const insetStr = inset ? 'inset ' : '';
    return `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${color}`;
  });

  return `box-shadow: ${shadowStrings.join(', ')};`;
}

export function buildBorderRadius(config: BorderRadiusConfig): string {
  const { topLeft, topRight, bottomRight, bottomLeft, locked } = config;

  if (locked) {
    return `border-radius: ${topLeft}px;`;
  }

  if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
    return `border-radius: ${topLeft}px;`;
  }

  return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
}

export function buildTextShadow(layers: Array<Omit<BoxShadowLayer, 'spread' | 'inset'>>): string {
  if (layers.length === 0) return '';

  const shadowStrings = layers.map(layer => {
    const { x, y, blur, color } = layer;
    return `${x}px ${y}px ${blur}px ${color}`;
  });

  return `text-shadow: ${shadowStrings.join(', ')};`;
}

export function buildTransform(transforms: {
  rotate?: number;
  scale?: number;
  skewX?: number;
  skewY?: number;
  translateX?: number;
  translateY?: number;
}): string {
  const transformParts: string[] = [];

  if (transforms.translateX !== undefined || transforms.translateY !== undefined) {
    const x = transforms.translateX || 0;
    const y = transforms.translateY || 0;
    transformParts.push(`translate(${x}px, ${y}px)`);
  }

  if (transforms.rotate !== undefined && transforms.rotate !== 0) {
    transformParts.push(`rotate(${transforms.rotate}deg)`);
  }

  if (transforms.scale !== undefined && transforms.scale !== 1) {
    transformParts.push(`scale(${transforms.scale})`);
  }

  if (transforms.skewX !== undefined && transforms.skewX !== 0) {
    transformParts.push(`skewX(${transforms.skewX}deg)`);
  }

  if (transforms.skewY !== undefined && transforms.skewY !== 0) {
    transformParts.push(`skewY(${transforms.skewY}deg)`);
  }

  if (transformParts.length === 0) return '';

  return `transform: ${transformParts.join(' ')};`;
}