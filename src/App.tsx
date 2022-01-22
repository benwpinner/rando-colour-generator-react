import './App.css';
import { MouseEventHandler, useState } from 'react';
import colourous from './colourous';
import Generator from './components/generator';
import Variations from './components/variations';
import { Colour } from './types/Colour';

const generateNewColour = (colour?: string[]): Colour => {
  const [rgb, hex] = colour
    ? [colour, colourous.convertRGBToHex(colour)]
    : colourous.generateRandomColour();
  const [shades, tints] = colourous.generateShadesTints(rgb);
  const luminance = colourous.calculateLuminance(rgb);
  const contrastColour = colourous.getHigherContrastColour(rgb, [
    ...tints.map((tint) => tint[0]),
    ...shades.map((shade) => shade[0]),
  ]);
  return { rgb, hex, luminance, tints, shades, contrastColour };
};

const App = () => {
  const [colour, setColour] = useState<Colour>(
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
