import { MouseEventHandler, useState } from 'react';
import colourous, { Colour } from './colourous';
import Generator from './components/generator';

const initialColour: Colour = {
  rgb: ['52', '58', '64'],
  hex: ['34', '3A', '40'],
};

const App = () => {
  const [colour, setColour] = useState<Colour>(initialColour);

  const onClick: MouseEventHandler = (e) => {
    const target = e.target as Element;
    if (target.classList) setColour(colourous.generateRandomColour());
  };

  return (
    <div
      className='app'
      onClick={onClick}
      style={{ height: '100%', position: 'relative' }}
    >
      <Generator colour={colour} />
    </div>
  );
};

export default App;
