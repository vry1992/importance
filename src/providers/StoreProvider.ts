import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useAbilitiesActionCreators } from '../features/Abilities/abilities.slice';
import type { TAbilitiesSlice } from '../features/Abilities/types';
import { useNeedsActionCreators } from '../features/Needs/needs.slice';
import type { TNeedsSlice } from '../features/Needs/types';
import { useStepperActionCreators } from '../features/Stepper/Stepper.slice';
import type { TStepperSlice } from '../features/Stepper/types';
import type { TVectorOfInfluenceSlice } from '../features/VectorOfInfluence/types';
import { useVectorOfInfluenceActionCreators } from '../features/VectorOfInfluence/vectorOfInfluence.slice';
import { ABILITIES_MOCK } from '../mock/abilitiesMock';
import { NEED_MOCK } from '../mock/needsMock';
import { STEPPER_MOCK } from '../mock/stepperMock';
import { VECTOR_OF_INFLUENCE_MOCK } from '../mock/vectorOfInfluenceMock';
import * as db from '../services/db';

export const tables = {
  needs: {
    name: 'NEEDS',
    keyPath: 'indexDbId',
  },
  abilities: {
    name: 'ABILITIES',
    keyPath: 'indexDbId',
  },
  vectorOfInfluence: {
    name: 'VECTOR_OF_INFLUENCE',
    keyPath: 'indexDbId',
  },
  stepper: {
    name: 'STEPPER',
    keyPath: 'indexDbId',
  },
};
const isMock = import.meta.env.VITE_USE_MOCK === '1';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isDbInitialized, setIsDBInitialized] = useState(false);

  const needsActions = useNeedsActionCreators();
  const stepperActions = useStepperActionCreators();
  const abilitiesActions = useAbilitiesActionCreators();
  const vectorOfInfluenceActions = useVectorOfInfluenceActionCreators();

  useEffect(() => {
    setLoading(true);

    const initDb = async () => {
      await db.run({
        dbName: 'objects',
        version: 1,
        tables,
      });

      if (isMock) {
        await db.put(tables.needs.name, NEED_MOCK);
        await db.put(tables.abilities.name, ABILITIES_MOCK);
        await db.put(tables.stepper.name, STEPPER_MOCK);
        await db.put(tables.vectorOfInfluence.name, VECTOR_OF_INFLUENCE_MOCK);
      }
      setIsDBInitialized(true);
    };
    initDb();
  }, []);

  useEffect(() => {
    if (!isDbInitialized) return;
    const init = async () => {
      try {
        const promises = Object.values(tables).map(({ name }) => {
          return db.getAll(name);
        });

        const all = await Promise.all(promises);

        all.forEach((item) => {
          if ('name' in item.source && item.result[0]) {
            switch (item.source.name) {
              case tables.needs.name:
                needsActions.restore(item.result[0] as TNeedsSlice);
                break;
              case tables.stepper.name:
                stepperActions.restore(item.result[0] as TStepperSlice);
                break;
              case tables.abilities.name:
                abilitiesActions.restore(item.result[0] as TAbilitiesSlice);
                break;
              case tables.vectorOfInfluence.name:
                vectorOfInfluenceActions.restore(
                  item.result[0] as TVectorOfInfluenceSlice
                );
                break;
            }
          }
        });
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [isDbInitialized, loading]);
  return loading ? null : children;
};
