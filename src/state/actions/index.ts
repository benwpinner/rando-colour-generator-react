import { MainColour } from '../../types';
import { ActionType } from '../action-types';

export type VariationType = 'tint' | 'shade';

export interface SetColourAction {
  type: ActionType.SET_COLOUR;
  payload: string[] | undefined;
}

export interface ToggleVariationAction {
  type: ActionType.TOGGLE_VARIATIONS;
  payload: {
    type: VariationType;
    open: boolean;
  };
}

export interface ToggleLikeColourAction {
  type: ActionType.TOGGLE_LIKE_COLOUR;
  payload: {
    colour: MainColour;
    liked: boolean;
  };
}

export interface SaveLikesErrorAction {
  type: ActionType.SAVE_LIKES_ERROR;
  payload: string;
}

export type Action =
  | SetColourAction
  | ToggleVariationAction
  | ToggleLikeColourAction
  | SaveLikesErrorAction;
