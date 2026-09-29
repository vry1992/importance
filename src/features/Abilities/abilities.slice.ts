import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import {
  AbilityStatusEnum,
  type TAbilitiesSlice,
  type TAbility,
} from './types';

const initialState: TAbilitiesSlice = {
  functionalityMatrix: [],
  abilities: [],
  importance: null,
  step: AbilityStatusEnum.creating,
  indexDbId: '46efb214-1af0-4b30-9a72-1ccb52c6fe5f',
};

export const abilitiesSlice = createSlice({
  name: 'abilitiesSlice',
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<TAbilitiesSlice>) => {
      state.abilities = payload.abilities;
      state.importance = payload.importance;
      state.step = payload.step;
    },
    add: (state, action: { type: string; payload: TAbility }) => {
      const currentNeeds = state.abilities;
      currentNeeds.push(action.payload);
      state.abilities = currentNeeds;
    },
    createMany: (state, action: { type: string; payload: TAbility[] }) => {
      state.abilities = action.payload;
      state.step = AbilityStatusEnum.importance;
    },
    createImportance: (
      state,
      action: PayloadAction<Record<string, Record<string, number>>>
    ) => {
      state.importance = action.payload;
      state.step = AbilityStatusEnum.review;
    },
    complete: (state) => {
      state.step = AbilityStatusEnum.completed;
    },
    onPrevState: (
      state,
      action: PayloadAction<{ step: AbilityStatusEnum }>
    ) => {
      state.step = action.payload.step;
    },
  },
});

export const abilitiesActions = abilitiesSlice.actions;

export const useAbilitiesActionCreators = () => {
  return useActionCreators(abilitiesSlice.actions);
};

export const useAbilitiesSelectors = () => {
  return useAppSelector((store) => store.abilities);
};

export const abilitiesReducer = abilitiesSlice.reducer;
