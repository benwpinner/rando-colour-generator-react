import './colour-codes.css';
import { MouseEventHandler } from 'react';
import colourous from '../colourous';

interface ColourCodesProps {
  rgb: string[];
  hex: string[];
}

const ColourCodes: React.FC<ColourCodesProps> = ({ rgb, hex }) => {
  const onCodeClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    e.stopPropagation();
    if (target.classList.contains('colour-codes__code'))
      navigator.clipboard.writeText(target.innerText);
  };

  return (
    <div className='colour-codes'>
      <span
        onClick={onCodeClick}
        className='colour-codes__code colour-codes__code--rgb'
      >
        {colourous.getRGBFromHueList(rgb)}
      </span>
      <span
        onClick={onCodeClick}
        className='colour-codes__code colour-codes__code--hex'
      >
        {colourous.getHexFromHueList(hex)}
      </span>
    </div>
  );
};

export default ColourCodes;
