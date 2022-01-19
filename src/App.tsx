import './App.css';
import { MouseEventHandler, useState } from 'react';
import colourous, { Colour } from './colourous';
import Generator from './components/generator';

const initialColour: Colour = {
  rgb: ['52', '58', '64'],
  hex: ['34', '3A', '40'],
};

const generateNewColour = (): Colour => {
  const colour = colourous.generateRandomColour();
  colour.luminance = colourous.calculateLuminance(colour.rgb);
  if (colour.luminance === undefined) console.log(colour);
  [colour.tints, colour.shades] =
    colourous.calculateVariationsAndContrasts(colour);
  return colour;
};

const App = () => {
  const [colour, setColour] = useState<Colour>(initialColour);

  const onClick: MouseEventHandler = (e) => {
    const target = e.target as Element;
    if (target.classList) setColour(generateNewColour());
  };

  // const onKeyUp = (e: KeyboardEvent) => {
  //   console.log(e.code);
  //   if (e.code === 'Space') setColour(generateNewColour());
  // };

  // window.addEventListener('keyup', onKeyUp);

  if (!colour.luminance)
    colour.luminance = colourous.calculateLuminance(colour.rgb);

  if (!colour.tints || !colour.shades)
    [colour.tints, colour.shades] =
      colourous.calculateVariationsAndContrasts(colour);

  return (
    <div className='app' onClick={onClick}>
      <Generator colour={colour} />
    </div>
  );
};

export default App;
