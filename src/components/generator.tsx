import './generator.css';
import colourous from '../colourous';
import ColourCodes from './colour-codes';
import { Colour } from '../types';

interface GeneratorProps {
  colour: Colour;
}

const Generator: React.FC<GeneratorProps> = ({ colour }) => {
  const rgb = colourous.getRGBFromHueList(colour.rgb);
  const textColour = colour.contrastColour;

  return (
    <div
      className='generator'
      style={{
        backgroundColor: rgb,
        color: colourous.getRGBFromHueList(colour.contrastColour),
      }}
    >
      <span className='generator__instructions'>
        Click the screen to generate a new colour
      </span>
      <span className='generator__codes'>
        <ColourCodes rgb={colour.rgb} hex={colour.hex} />
      </span>
    </div>
  );
};

export default Generator;
