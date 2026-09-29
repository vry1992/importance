import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatrixRow } from '../../services/matrix';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import type { TNeutralizationMatrix } from './types';

const initialState: TNeutralizationMatrix = {
  matrix: null,
  indexDbId: '5489aaf6-aa9c-4425-a23d-fcb9b172b451',
};

export const neutralizationMatrixSlice = createSlice({
  name: 'neutralizationMatrixSlice',
  initialState,
  reducers: {
    restore: (
      state,
      { payload: { matrix } }: PayloadAction<TNeutralizationMatrix>
    ) => {
      state.matrix = matrix;
    },
    create: (state, { payload }: PayloadAction<MatrixRow[]>) => {
      state.matrix = payload;
    },
  },
});

export const neutralizationMatrixActions = neutralizationMatrixSlice.actions;

export const useNeutralizationMatrixActionCreators = () => {
  return useActionCreators(neutralizationMatrixSlice.actions);
};

export const useNeutralizationMatrixSelectors = () => {
  return useAppSelector((store) => store.neutralizationMatrix);
};

export const neutralizationMatrixReducer = neutralizationMatrixSlice.reducer;
