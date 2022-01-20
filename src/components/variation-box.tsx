import { useState } from 'react';
import colourous from '../colourous';
import './variation-box.css';

interface VariationBoxProps {
  colour: string[][];
  index: number;
  active: boolean;
}

const VariationBox: React.FC<VariationBoxProps> = ({
  colour,
  index,
  active,
}) => {
  const [isActive, setIsActive] = useState(false);
  const backgroundColour = colourous.getRGBFromHueList(colour[0]);

  setTimeout(() => setIsActive(active), 100 * (index - 1));

  return (
    <div className='variation-box__container'>
      <div
        className={`variation-box ${isActive ? 'active' : ''}`}
        style={{ backgroundColor: backgroundColour }}
      ></div>
    </div>
  );
};

export default VariationBox;
