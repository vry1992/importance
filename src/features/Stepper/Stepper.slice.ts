import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useActionCreators, useAppSelector } from '../../store/hooks';
import { DEFAULT_STEPS_CONFIG } from './constants';
import type { TStepperSlice } from './types';

const initialState: TStepperSlice = {
  steps: DEFAULT_STEPS_CONFIG,
  current: 0,
  percent: 0,
  indexDbId: 'aa79f7bd-f2b0-4c40-9134-f222e0f284c0',
};

export const stepperSlice = createSlice({
  name: 'stepperSlice',
  initialState,
  reducers: {
    restore: (
      state,
      { payload: { steps, current, percent } }: PayloadAction<TStepperSlice>
    ) => {
      state.steps = steps;
      state.current = current;
      state.percent = percent;
    },
    setStep: (
      state,
      { payload }: PayloadAction<{ current: number; percent: number }>
    ) => {
      state.current = payload.current;
      state.percent = payload.percent;
    },
  },
});

export const stepperActions = stepperSlice.actions;

export const useStepperActionCreators = () => {
  return useActionCreators(stepperSlice.actions);
};

export const useStepsSelectors = () => {
  return useAppSelector((store) => store.stepper);
};

export const stepperReducer = stepperSlice.reducer;
