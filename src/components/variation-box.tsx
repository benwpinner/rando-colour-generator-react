import { useState } from 'react';
import colourous from '../colourous';
import { Colour } from '../types';
import ColourCodes from './colour-codes';
import './variation-box.css';

interface VariationBoxProps {
  colour: Colour;
  index: number;
  active: boolean;
}

const VariationBox: React.FC<VariationBoxProps> = ({
  colour,
  index,
  active,
}) => {
  const [isActive, setIsActive] = useState(false);
  const backgroundColour = colourous.getRGBFromHueList(colour.rgb);

  setTimeout(() => setIsActive(active), 100 * (index - 1));

  return (
    <div className='variation-box__container'>
      <div
        className={`variation-box ${isActive ? 'variation-box--active' : ''}`}
        style={{
          backgroundColor: backgroundColour,
          color: colourous.getRGBFromHueList(colour.contrastColour),
        }}
      >
        <div className='variation-box__codes'>
          <ColourCodes rgb={colour.rgb} hex={colour.hex} />
        </div>
        <div className='variation-box__name'>{colour.name}</div>
      </div>
    </div>
  );
};

export default VariationBox;
