import './generator.css';
import colourous from '../colourous';
import ColourCodes from './colour-codes';
import { MainColour } from '../types';
import ActionBar from './action-bar';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface GeneratorProps {
  colour: MainColour;
  searchActive: boolean;
}

const Generator: React.FC<GeneratorProps> = ({ colour, searchActive }) => {
  const rgb = colourous.getRGBFromHueList(colour.rgb);
  const textColour = colourous.getRGBFromHueList(colour.contrastColour);

  const liked = useTypedSelector((state) =>
    state.likes.data.some(
      (like) => like.rgb.filter((val, i) => colour.rgb[i] === val).length === 3
    )
  );

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
      <ActionBar colour={colour} active={searchActive} liked={liked} />

      <span className='generator__codes'>
        <ColourCodes rgb={colour.rgb} hex={colour.hex} />
      </span>
    </div>
  );
};

export default Generator;
