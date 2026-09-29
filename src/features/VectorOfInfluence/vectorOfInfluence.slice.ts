import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import {
  VectorOfInfluenceStatusEnum,
  type TVectorOfInfluenceSlice,
} from './types';

const initialState: TVectorOfInfluenceSlice = {
  vectorsOfInfluences: null,
  step: VectorOfInfluenceStatusEnum.creating,
  indexDbId: '63b97aae-db14-4f25-805c-c125da6195e0',
};

export const vectorOfInfluenceSlice = createSlice({
  name: 'vectorOfInfluenceSlice',
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<TVectorOfInfluenceSlice>) => {
      state.vectorsOfInfluences = payload.vectorsOfInfluences;
      state.step = payload.step;
    },
    create: (state, { payload }: PayloadAction<Record<string, number>>) => {
      state.vectorsOfInfluences = payload;
      state.step = VectorOfInfluenceStatusEnum.completed;
    },
  },
});

export const vectorOfInfluenceActions = vectorOfInfluenceSlice.actions;

export const useVectorOfInfluenceActionCreators = () => {
  return useActionCreators(vectorOfInfluenceSlice.actions);
};

export const useVectorOfInfluenceSelectors = () => {
  return useAppSelector((store) => store.vectorOfInfluence);
};

export const vectorOfInfluenceReducer = vectorOfInfluenceSlice.reducer;
