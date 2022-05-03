import { useRef } from 'react';
import colourous from '../colourous';
import { MainColour } from '../types';
import './action-bar.css';

interface ActionBarProps {
  colour: MainColour;
  active: boolean;
  liked: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ colour, active, liked }) => {
  const searchColour = colourous.getRGBFromHueList(colour.contrastColour);
  const searchTextColour = colourous.getRGBFromHueList(colour.rgb);
  const searchInput = useRef<HTMLInputElement>(null);
  const controlSearchFocus = () => {
    if (active && !searchInput.current) {
      setTimeout(controlSearchFocus, 100);
    } else if (active) {
      searchInput.current?.select();
    }
  };
  setTimeout(controlSearchFocus, 100);
  return (
    <div className='action-bar'>
      <div className='action-bar__btn'>
        <svg className='action-bar__icon' viewBox='0 0 32 32'>
          <use
            href={`./icons.svg#icon-heart-${liked ? 'filled' : 'outline'}`}
          ></use>
        </svg>
      </div>
      <form
        className={`action-bar__search-form ${
          active ? `action-bar__search-form--active` : ``
        }`}
      >
        <div
          className={`action-bar__search ${
            active ? `action-bar__search--active` : ``
          }`}
          style={{
            backgroundColor: searchColour,
            color: searchTextColour,
            fill: searchTextColour,
            stroke: searchTextColour,
          }}
        >
          <svg className='action-bar__search-icon' viewBox='0 0 32 32'>
            <use href={`./icons.svg#icon-${active ? 'close' : 'search'}`}></use>
          </svg>
          <input
            className={`action-bar__search-input action-bar__search-input--${
              active ? `active` : `inactive`
            }`}
            type='text'
            placeholder='Enter rgb and hex code'
            ref={searchInput}
          />
          <input type='submit' style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
};

export default ActionBar;
