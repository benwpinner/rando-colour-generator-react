import { Dispatch } from 'react';
import { RootState } from '..';
import { MainColour } from '../../types';
import { ActionType } from '../action-types';
import {
  Action,
  SetColourAction,
  ToggleLikeColourAction,
  ToggleVariationAction,
  VariationType,
} from '../actions';

export const setColour = (colour?: string[]): SetColourAction => {
  return {
    type: ActionType.SET_COLOUR,
    payload: colour,
  };
};

export const toggleVariations = (
  open: boolean,
  type: VariationType
): ToggleVariationAction => {
  return {
    type: ActionType.TOGGLE_VARIATIONS,
    payload: {
      type,
      open,
    },
  };
};

export const toggleLikeColour = (
  colour: MainColour,
  liked: boolean = true
): ToggleLikeColourAction => {
  return {
    type: ActionType.TOGGLE_LIKE_COLOUR,
    payload: {
      colour,
      liked,
    },
  };
};

export const saveLikes = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      likes: { data },
    } = getState();
    const likes = data;
    try {
      localStorage.setItem('likes', JSON.stringify(likes));
    } catch (err: any) {
      dispatch({ type: ActionType.SAVE_LIKES_ERROR, payload: err.message });
    }
  };
};
