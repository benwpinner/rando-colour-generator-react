import './generator.css';
import colourous, { Colour } from '../colourous';

interface GeneratorProps {
  colour: Colour;
}

const Generator: React.FC<GeneratorProps> = ({ colour }) => {
  const rgb = colourous.getRGBFromHueList(colour.rgb);

  return <div className='generator' style={{ backgroundColor: rgb }}></div>;
};

export default Generator;
