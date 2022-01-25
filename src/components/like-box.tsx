import colourous from '../colourous';
import { Colour } from '../types';
import './like-box.css';

interface LikeBoxProps {
  colour: Colour;
}

const LikeBox: React.FC<LikeBoxProps> = ({ colour }) => {
  const backColour = colourous.getHexFromHueList(colour.hex);
  const textColour = colourous.getRGBFromHueList(colour.contrastColour);
  return (
    <div
      className='like-box'
      style={{ backgroundColor: backColour, color: textColour }}
    >
      <p className='like-box__text'>{colour.name}</p>
    </div>
  );
};

export default LikeBox;
