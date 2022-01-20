import './variations.css';
import VariationBox from './variation-box';
import { MouseEventHandler, useState } from 'react';
import colourous from '../colourous';

interface VariationsProps {
  type: 'tints' | 'shades';
  variations: string[][][];
  contrastColour: string[];
}

const Variations: React.FC<VariationsProps> = ({
  type,
  variations,
  contrastColour,
}) => {
  const [active, setActive] = useState(false);

  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setActive(!active);
  };

  const arrowIconId = type === `tints` ? `icon-arrow-right` : `icon-arrow-left`;

  return (
    <div className={`variations ${type}`}>
      {variations.map((colour, i) => (
        <VariationBox key={i} colour={colour} index={i} active={active} />
      ))}
      <div
        onClick={onClick}
        className='variations__btn'
        style={{
          color: colourous.getRGBFromHueList(contrastColour),
          fill: colourous.getRGBFromHueList(contrastColour),
        }}
      >
        {type === 'tints' ? (
          <>
            <svg className='icon' viewBox='0 0 32 32'>
              <use href={`./icons.svg#${arrowIconId}`}></use>
            </svg>
            <span>{type[0].toUpperCase() + type.slice(1)}</span>
          </>
        ) : (
          <>
            <span>{type[0].toUpperCase() + type.slice(1)}</span>
            <svg className='icon' viewBox='0 0 32 32'>
              <use href={`./icons.svg#${arrowIconId}`}></use>
            </svg>
          </>
        )}
      </div>
    </div>
  );
};

export default Variations;
