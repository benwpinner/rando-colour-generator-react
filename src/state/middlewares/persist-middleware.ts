import { Dispatch } from 'redux';
import { saveLikes } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '..';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.SET_COLOUR,
          ActionType.TOGGLE_LIKE_COLOUR,
          ActionType.TOGGLE_VARIATIONS,
        ].includes(action.type)
      ) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          saveLikes()(dispatch, getState);
        }, 250);
      }
    };
  };
};
