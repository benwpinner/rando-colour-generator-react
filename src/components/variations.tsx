import './variations.css';
import VariationBox from './variation-box';
import { MouseEventHandler } from 'react';
import colourous from '../colourous';
import { Colour } from '../types';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface VariationsProps {
  type: 'tints' | 'shades';
  variations: Colour[];
  contrastColour: string[];
}

const Variations: React.FC<VariationsProps> = ({
  type,
  variations,
  contrastColour,
}) => {
  const { toggleVariations } = useActions();
  const active = useTypedSelector((state) => state.colours.data[`${type}Open`]);

  const controlButton = (btn: Element) => {
    setTimeout(
      () => {
        btn.classList.toggle('variations__btn--active');
      },
      active ? 300 : 150
    );
    const text = btn.querySelector('span');
    if (!text) throw new Error('No text element detected');
    if (active) text.classList.toggle('variations__btn-text--active');
    else
      setTimeout(
        () => text.classList.toggle('variations__btn-text--active'),
        1000
      );
  };

  const onBtnClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    toggleVariations(type);
    controlButton(e.currentTarget as Element);
  };

  const arrowIconId =
    type === `tints`
      ? `icon-arrow-${active ? `left` : `right`}`
      : `icon-arrow-${active ? `right` : `left`}`;

  return (
    <div onClick={(e) => e.stopPropagation()} className={`variations ${type}`}>
      {variations.map((colour, i) => (
        <VariationBox key={i} colour={colour} index={i} active={active} />
      ))}
      <div
        onClick={onBtnClick}
        className={`variations__btn`}
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
            <span className='variations__btn-text'>
              {type[0].toUpperCase() + type.slice(1)}
            </span>
          </>
        ) : (
          <>
            <span className='variations__btn-text'>
              {type[0].toUpperCase() + type.slice(1)}
            </span>
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
