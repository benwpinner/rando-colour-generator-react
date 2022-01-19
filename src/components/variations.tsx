import { Colour } from '../colourous';

interface VariationsProps {
  type: 'tints' | 'shades';
  variations: Colour[];
}

const Variations: React.FC<VariationsProps> = ({ type }) => {
  return <div className={`variations ${type}`}></div>;
};

export default Variations;
