import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { AUMatrixReducer } from '../features/AUMatrix/AUMatrix.slice';
import {
  abilitiesActions,
  abilitiesReducer,
} from '../features/Abilities/abilities.slice';
import { needsReducer, needsSliceActions } from '../features/Needs/needs.slice';
import { neutralizationMatrixReducer } from '../features/NeutralizationMatrix/NeutralizationMatrix.slice';
import {
  stepperActions,
  stepperReducer,
} from '../features/Stepper/Stepper.slice';
import {
  vectorOfInfluenceActions,
  vectorOfInfluenceReducer,
} from '../features/VectorOfInfluence/vectorOfInfluence.slice';
import { tables } from '../providers/StoreProvider';
import { put } from '../services/db';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    needsSliceActions.createMany,
    needsSliceActions.createConnectivityMatrix,
    needsSliceActions.complete
  ),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    put(tables.needs.name, state.needs);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(stepperActions.setStep),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    put(tables.stepper.name, state.stepper);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    abilitiesActions.createMany,
    abilitiesActions.createImportance,
    abilitiesActions.complete
  ),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    put(tables.abilities.name, state.abilities);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(vectorOfInfluenceActions.create),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    put(tables.vectorOfInfluence.name, state.vectorOfInfluence);
  },
});

export const store = configureStore({
  reducer: {
    needs: needsReducer,
    abilities: abilitiesReducer,
    stepper: stepperReducer,
    vectorOfInfluence: vectorOfInfluenceReducer,
    neutralizationMatrix: neutralizationMatrixReducer,
    AUMatrix: AUMatrixReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
