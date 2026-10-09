import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatrixRowItem } from '../../services/matrix';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import type { TWUAUMatrix } from './types';

const initialState: TWUAUMatrix = {
  matrix: null,
  indexDbId: '9c8f0bff-0159-419c-a0a4-28663fa4cd71',
};

export const WUAUMatrixSlice = createSlice({
  name: 'WUAUMatrixSlice',
  initialState,
  reducers: {
    restore: (state, { payload: { matrix } }: PayloadAction<TWUAUMatrix>) => {
      state.matrix = matrix;
    },
    create: (state, { payload }: PayloadAction<MatrixRowItem[][]>) => {
      state.matrix = payload;
    },
  },
});

export const WUAUMatrixActions = WUAUMatrixSlice.actions;

export const useWUAUMatrixActionCreators = () => {
  return useActionCreators(WUAUMatrixSlice.actions);
};

export const useWUAUMatrixSelectors = () => {
  return useAppSelector((store) => store.WUAUMatrix);
};

export const WUAUMatrixReducer = WUAUMatrixSlice.reducer;
