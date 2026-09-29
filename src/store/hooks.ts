import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, type ActionCreatorsMapObject } from 'redux';
import type { AppDispatch, RootState } from '.';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useActionCreators = <
  Action extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actionCreators: Action
) => {
  const dispatch = useAppDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
