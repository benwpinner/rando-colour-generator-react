import colourous from "../colourous";
import likes from "../components/likes";
import ntc from "../nameThatColour";
import { Colour, MainColour } from "../types";

const generateNewColour = (colour?: string[]): MainColour => {
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

  const liked = likes.find((like) => like.rgb === rgb) ? true : false;

  return { rgb, hex, luminance, tints, shades, contrastColour, name, liked };
};

function populateVariation(populateVariation: any) {
  throw new Error("Function not implemented.");
}
