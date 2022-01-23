import './App.css';
import { MouseEventHandler, useState } from 'react';
import colourous from './colourous';
import Generator from './components/generator';
import Variations from './components/variations';
import { Colour, MainColour } from './types/Colour';

const populateVariation = (variation: string[][]): Colour => {
  const luminance = colourous.calculateLuminance(variation[0]);
  const [shadesCodes, tintsCodes] = colourous.generateShadesTints(variation[0]);
  const contrastColour = colourous.getHigherContrastColour(variation[0], [
    ...tintsCodes.map((tint) => tint[0]),
    ...shadesCodes.map((shade) => shade[0]),
  ]);
  return { rgb: variation[0], hex: variation[1], luminance, contrastColour };
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
  return { rgb, hex, luminance, tints, shades, contrastColour };
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
