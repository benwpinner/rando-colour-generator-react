export interface Colour {
  rgb: string[];
  hex: string[];
  luminance: number;
  contrastColour: string[];
  name: string;
}

export interface MainColour extends Colour {
  tints: Colour[];
  shades: Colour[];
}
