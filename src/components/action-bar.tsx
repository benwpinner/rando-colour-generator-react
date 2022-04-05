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
  return (
    <div className='action-bar'>
      <div className='action-bar__btn'>
        <svg className='action-bar__icon' viewBox='0 0 32 32'>
          <use
            href={`./icons.svg#icon-heart-${liked ? 'filled' : 'outline'}`}
          ></use>
        </svg>
      </div>
      <form className='action-bar__search-form'>
        <div
          className='action-bar__search'
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
            className='action-bar__search-input'
            type='text'
            placeholder='Enter rgb and hex code'
          />
          <input type='submit' style={{ display: 'none' }} />
        </div>
      </form>
    </div>
  );
};

export default ActionBar;
