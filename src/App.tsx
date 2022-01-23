import './App.css';
import { MouseEventHandler, useState } from 'react';
import colourous from './colourous';
import ntc from './nameThatColour';
import Generator from './components/generator';
import Variations from './components/variations';
import { Colour, MainColour } from './types/Colour';

ntc.init();

const populateVariation = (variation: string[][]): Colour => {
  const luminance = colourous.calculateLuminance(variation[0]);
  const [shadesCodes, tintsCodes] = colourous.generateShadesTints(variation[0]);
  const contrastColour = colourous.getHigherContrastColour(variation[0], [
    ...tintsCodes.map((tint) => tint[0]),
    ...shadesCodes.map((shade) => shade[0]),
  ]);
  const name = ntc.name(colourous.getHexFromHueList(variation[1]))[1] as string;
  return {
    rgb: variation[0],
    hex: variation[1],
    luminance,
    contrastColour,
    name,
  };
};

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

  return { rgb, hex, luminance, tints, shades, contrastColour, name };
};

const App = () => {
  const [colour, setColour] = useState<MainColour>(
    generateNewColour(['52', '58', '64'])
  );

  const onClick: MouseEventHandler = (e) => {
    const target = e.target as Element;
    if (target.classList) setColour(generateNewColour());
  };

  return (
    <div className='app' onClick={onClick}>
      <Generator colour={colour} />
      <Variations
        type='tints'
        variations={colour.tints}
        contrastColour={colour.contrastColour}
      />
      <Variations
        type='shades'
        variations={colour.shades}
        contrastColour={colour.contrastColour}
      />
    </div>
  );
};

export default App;
