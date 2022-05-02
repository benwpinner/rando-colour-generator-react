import { MainColour } from '../../types';
import { ActionType } from '../action-types';

export type VariationType = 'tints' | 'shades';

export interface SetColourAction {
  type: ActionType.SET_COLOUR;
  payload: string[] | undefined;
}

export interface ToggleVariationAction {
  type: ActionType.TOGGLE_VARIATIONS;
  payload: VariationType;
}

export interface ToggleLikeColourAction {
  type: ActionType.TOGGLE_LIKE_COLOUR;
  payload: {
    colour: MainColour;
  };
}

export interface SaveLikesErrorAction {
  type: ActionType.SAVE_LIKES_ERROR;
  payload: string;
}

export interface ToggleLikesOpenAction {
  type: ActionType.TOGGLE_LIKES_OPEN;
}

export interface ToggleSearchActiveAction {
  type: ActionType.TOGGLE_SEARCH_ACTIVE;
}

export type Action =
  | SetColourAction
  | ToggleVariationAction
  | ToggleLikeColourAction
  | SaveLikesErrorAction
  | ToggleLikesOpenAction
  | ToggleSearchActiveAction;
