import { combineReducers } from '@reduxjs/toolkit';
import produce from 'immer';
import { generateColourData } from '../../helpers/colourHelper';
import { getLikesFromLocalStorage } from '../../helpers/likesHelper';
import { MainColour } from '../../types';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export interface ColoursStatePayload {
  colour: MainColour;
  tintsOpen: boolean;
  shadesOpen: boolean;
}

export interface ColoursState {
  loading: boolean;
  error: string | null;
  data: ColoursStatePayload;
}

export interface LikesState {
  loading: boolean;
  error: string | null;
  data: MainColour[];
}

const initialColoursState: ColoursState = {
  loading: false,
  error: null,
  data: {
    colour: generateColourData(['52', '58', '64']),
    tintsOpen: false,
    shadesOpen: false,
  },
};

const initialLikesState: LikesState = {
  loading: false,
  error: null,
  data: getLikesFromLocalStorage(),
};

const coloursReducer = produce(
  (state: ColoursState = initialColoursState, action: Action) => {
    switch (action.type) {
      case ActionType.SET_COLOUR:
        state.error = null;
        state.loading = false;
        state.data.colour = generateColourData(action.payload);
        return state;
      case ActionType.TOGGLE_VARIATIONS:
        action.payload.type === 'shade'
          ? (state.data.shadesOpen = action.payload.open)
          : (state.data.tintsOpen = action.payload.open);
        return state;
      default:
        return state;
    }
  },
  initialColoursState
);

const likesReducer = produce(
  (state: LikesState = initialLikesState, action: Action) => {
    switch (action.type) {
      case ActionType.SAVE_LIKES_ERROR:
        state.error = action.payload;
        return state;
      case ActionType.TOGGLE_LIKE_COLOUR:
        state.error = null;
        state.loading = false;
        action.payload.liked
          ? state.data.push(action.payload.colour)
          : state.data.filter(
              (colour) => colour.rgb !== action.payload.colour.rgb
            );
        return state;
      default:
        return state;
    }
  },
  initialLikesState
);

const reducers = combineReducers({
  colours: coloursReducer,
  likes: likesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
