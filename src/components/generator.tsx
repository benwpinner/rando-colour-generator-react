import './generator.css';
import colourous from '../colourous';
import ColourCodes from './colour-codes';
import { MainColour } from '../types';
import ActionBar from './action-bar';

interface GeneratorProps {
  colour: MainColour;
}

const Generator: React.FC<GeneratorProps> = ({ colour }) => {
  const rgb = colourous.getRGBFromHueList(colour.rgb);
  const textColour = colourous.getRGBFromHueList(colour.contrastColour);

  console.log('Generator render');

  return (
    <div
      className='generator'
      style={{
        backgroundColor: rgb,
        color: textColour,
        fill: textColour,
      }}
    >
      <span className='generator__instructions'>
        Click the screen to generate a new colour
        <br />
        <br />
        You are viewing: {colour.name}
      </span>
      <ActionBar liked={colour.liked} />
      <span className='generator__codes'>
        <ColourCodes rgb={colour.rgb} hex={colour.hex} />
      </span>
    </div>
  );
};

export default Generator;
