import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatrixRow } from '../../services/matrix';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import type { TAUMatrix } from './types';

const initialState: TAUMatrix = {
  matrix: null,
  indexDbId: '476cc8c8-133d-41fc-bb89-2a412c9adcba',
};

export const AUMatrixSlice = createSlice({
  name: 'AUMatrixSlice',
  initialState,
  reducers: {
    restore: (state, { payload: { matrix } }: PayloadAction<TAUMatrix>) => {
      state.matrix = matrix;
    },
    create: (state, { payload }: PayloadAction<MatrixRow[]>) => {
      state.matrix = payload;
    },
  },
});

export const AUMatrixActions = AUMatrixSlice.actions;

export const useAUMatrixActionCreators = () => {
  return useActionCreators(AUMatrixSlice.actions);
};

export const useAUMatrixSelectors = () => {
  return useAppSelector((store) => store.AUMatrix);
};

export const AUMatrixReducer = AUMatrixSlice.reducer;
