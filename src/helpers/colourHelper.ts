import colourous from '../colourous';
import ntc from '../nameThatColour';
import { ColoursStatePayload } from '../state/reducers';
import { Colour, MainColour } from '../types';

export const generateNewColour = (colour: string[] | undefined): MainColour => {
  const [rgb, hex] = colour
    ? [colour, colourous.convertRGBToHex(colour)]
    : colourous.generateRandomColour();
  const luminance = colourous.calculateLuminance(rgb);
  const [shadesCodes, tintsCodes] = colourous.generateShadesTints(rgb);
  const contrastColour = colourous.getHigherContrastColour(rgb, [
    ...tintsCodes.map((tint) => tint[0]),
    ...shadesCodes.map((shade) => shade[0]),
  ]);
  const tints = tintsCodes.map(populateVariation);

  const shades = shadesCodes.map(populateVariation);

  // The function name returns an array containing strings and booleans.
  // The element at index 1 will always be a string, so casting to a string
  // on this line is purely to make TypeScript happy
  const name = ntc.name(colourous.getHexFromHueList(hex))[1] as string;

  return { rgb, hex, luminance, tints, shades, contrastColour, name };
};

export const populateVariation = (code: string[][]): Colour => {
  const luminance = colourous.calculateLuminance(code[0]);
  const [shadesCodes, tintsCodes] = colourous.generateShadesTints(code[0]);
  const contrastColour = colourous.getHigherContrastColour(code[0], [
    ...tintsCodes.map((tint) => tint[0]),
    ...shadesCodes.map((shade) => shade[0]),
  ]);
  const name = ntc.name(colourous.getHexFromHueList(code[1]))[1] as string;
  return {
    rgb: code[0],
    hex: code[1],
    luminance,
    contrastColour,
    name,
  };
};

export const generateTints = (code: string[]): Colour[] => {
  const tintList = colourous.generateTints(code);
  const tints = tintList.map((tint) => populateVariation(tint));
  return tints;
};

export const generateShades = (code: string[]): Colour[] => {
  const shadeList = colourous.generateShades(code);
  const shades = shadeList.map((shade) => populateVariation(shade));
  return shades;
};

export const generateColourData = (code?: string[] | undefined): MainColour => {
  const generatedColour = generateNewColour(code);
  const colour = {
    rgb: generatedColour.rgb,
    hex: generatedColour.hex,
    luminance: generatedColour.luminance,
    contrastColour: generatedColour.contrastColour,
    name: generatedColour.name,
    tints: generatedColour.tints,
    shades: generatedColour.shades,
  };
  return colour;
};
