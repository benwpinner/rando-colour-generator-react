export interface Colour {
  rgb: string[];
  hex: string[];
  luminance: number;
  contrastColour: string[];
  name: string;
}

export interface MainColour extends Colour {
  rgb: string[];
  hex: string[];
  luminance: number;
  tints: Colour[];
  shades: Colour[];
  contrastColour: string[];
}
