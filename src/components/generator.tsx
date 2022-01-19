import './generator.css';
import colourous, { Colour } from '../colourous';
import ColourCodes from './colour-codes';

interface GeneratorProps {
  colour: Colour;
}

const Generator: React.FC<GeneratorProps> = ({ colour }) => {
  const rgb = colourous.getRGBFromHueList(colour.rgb);

  return (
    <div className='generator' style={{ backgroundColor: rgb }}>
      <span className='generator__instructions'>
        Click the screen to generate a new colour
      </span>
      <span className='generator__codes'>
        <ColourCodes colour={colour} />
      </span>
    </div>
  );
};

export default Generator;
