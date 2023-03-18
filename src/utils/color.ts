type RGB = {
  red: number
  green: number
  blue: number
}

type HSL = {
  hue: number
  saturation: number
  lightness: number
}

function isValidHex(hex: string): boolean {
  const validHexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return validHexPattern.test(hex);
}

function expandShortHex(hex: string): string {
  if (hex.length !== 4)
    return hex;

  let expandedHex = "#";
  for (let i = 1; i < hex.length; i++) {
    expandedHex += hex.charAt(i) + hex.charAt(i);
  }

  return expandedHex;
}

function normalize(value: number, factor: number): number {
  return Math.round(value * factor);
}

export function hexToRgb(hex: string): RGB {
  if (!isValidHex(hex))
    throw new Error('Invalid hexadecimal color')

  hex = expandShortHex(hex);

  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return { red, green, blue };
}

export function rgbToHsl(rgb: RGB): HSL {
  const red = rgb.red / 255;
  const green = rgb.green / 255;
  const blue = rgb.blue / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  let hue: number;
  let saturation: number;
  let lightness: number;

  lightness = (max + min) / 2;

  if (max === min) {
    hue = 0;
    saturation = 0;
  } else {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      case blue:
        hue = (red - green) / d + 4;
        break;
      default:
        hue = 0;
    }

    hue /= 6;
  }

  return {
    hue: normalize(hue, 360),
    saturation: normalize(saturation, 100),
    lightness: normalize(lightness, 100),
  };
}

export function hexToHsl(hex: string): HSL {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb);
}
