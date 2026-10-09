import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatrixRowItem } from '../../services/matrix';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import type { TUAUMatrix } from './types';

const initialState: TUAUMatrix = {
  matrix: null,
  indexDbId: '179bfaca-ee61-4e76-9365-87433728297c',
};

export const UAUMatrixSlice = createSlice({
  name: 'UAUMatrixSlice',
  initialState,
  reducers: {
    restore: (state, { payload: { matrix } }: PayloadAction<TUAUMatrix>) => {
      state.matrix = matrix;
    },
    create: (state, { payload }: PayloadAction<MatrixRowItem[][]>) => {
      state.matrix = payload;
    },
  },
});

export const UAUMatrixActions = UAUMatrixSlice.actions;

export const useUAUMatrixActionCreators = () => {
  return useActionCreators(UAUMatrixSlice.actions);
};

export const useUAUMatrixSelectors = () => {
  return useAppSelector((store) => store.UAUMatrix);
};

export const UAUMatrixReducer = UAUMatrixSlice.reducer;
