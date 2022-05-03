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
  likesOpen: boolean;
  searchActive: boolean;
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
    likesOpen: false,
    searchActive: false,
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
        action.payload === 'shades'
          ? (state.data.shadesOpen = !state.data.shadesOpen)
          : (state.data.tintsOpen = !state.data.tintsOpen);
        return state;
      case ActionType.TOGGLE_SEARCH_ACTIVE:
        state.data.searchActive = !state.data.searchActive;
        return state;
      case ActionType.TOGGLE_LIKES_OPEN:
        state.data.likesOpen = !state.data.likesOpen;
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
        const colour = action.payload.colour;
        const [isLiked, index] = state.data.reduce(
          (acc, item, i) => {
            if (acc[0]) return acc;
            return [
              item.rgb.filter((val, i) => colour.rgb[i] === val).length === 3,
              i,
            ];
          },
          [false, 0]
        );
        state.error = null;
        state.loading = false;
        isLiked ? state.data.splice(index, 1) : state.data.push(colour);
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
