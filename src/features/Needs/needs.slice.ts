import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import {
  NeedsStatusEnum,
  type TConnectivityMatrix,
  type TNeed,
  type TNeedsSlice,
} from './types';

const initialState: TNeedsSlice = {
  needs: [],
  connectivityMatrix: null,
  step: NeedsStatusEnum.creating,
  indexDbId: '08f4e8a3-e801-4742-ade6-1bd96ce99e01',
};

export const needsSlice = createSlice({
  name: 'needsSlice',
  initialState,
  reducers: {
    restore: (
      state,
      {
        payload: { needs, connectivityMatrix, step },
      }: PayloadAction<TNeedsSlice>
    ) => {
      state.needs = needs;
      state.connectivityMatrix = connectivityMatrix;
      state.step = step;
    },
    add: (state, action: { type: string; payload: TNeed }) => {
      const currentNeeds = state.needs;
      currentNeeds.push(action.payload);
      state.needs = currentNeeds;
    },
    createMany: (state, action: PayloadAction<TNeed[]>) => {
      state.needs = action.payload;
      state.step = NeedsStatusEnum.connectivityMatrix;
    },
    remove: (state, action: { type: string; payload: Omit<TNeed, 'name'> }) => {
      const newNeeds = state.needs.filter(({ id }) => id !== action.payload.id);
      state.needs = newNeeds;
    },
    edit: (state, action: { type: string; payload: TNeed }) => {
      const currentNeeds = state.needs;
      const index = currentNeeds.findIndex(
        ({ id }) => id === action.payload.id
      );
      currentNeeds[index] = action.payload;
      state.needs = currentNeeds;
    },
    createConnectivityMatrix: (
      state,
      action: PayloadAction<TConnectivityMatrix>
    ) => {
      state.connectivityMatrix = action.payload;
      state.step = NeedsStatusEnum.review;
    },
    complete: (state) => {
      state.step = NeedsStatusEnum.completed;
    },
    onPrevState: (state, action: PayloadAction<{ step: NeedsStatusEnum }>) => {
      state.step = action.payload.step;
    },
  },
});

export const needsSliceActions = needsSlice.actions;

export const useNeedsActionCreators = () => {
  return useActionCreators(needsSlice.actions);
};

export const useNeedsSelectors = () => {
  return useAppSelector((store) => store.needs);
};

export const needsReducer = needsSlice.reducer;

export default needsSlice.reducer;
