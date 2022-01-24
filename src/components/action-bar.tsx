import './action-bar.css';

interface ActionBarProps {
  liked: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ liked }) => {
  console.log('Action render');
  return (
    <div className='action-bar'>
      <div className='action-bar__btn'>
        <svg className='icon' viewBox='0 0 32 32'>
          <use
            href={`./icons.svg#icon-heart-${liked ? 'filled' : 'outline'}`}
          ></use>
        </svg>
      </div>
    </div>
  );
};

export default ActionBar;
