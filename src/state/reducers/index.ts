import { Colour } from '../../types';

interface ColoursState {
  loading: boolean;
  error: string | null;
  data: {
    colour: Colour;
    tints: Colour[];
    shades: Colour[];
    contrastColour: Colour;
  };
}

const initialState: ColoursState = {
  loading: false,
  error: null,
  data: {
    colour: 
  }
}
