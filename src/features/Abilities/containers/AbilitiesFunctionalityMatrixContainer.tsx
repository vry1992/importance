import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useEffect } from 'react';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import {
  useAbilitiesActionCreators,
  useAbilitiesSelectors,
} from '../abilities.slice';
import { AbilitiesFunctionalityMatrix } from '../components/AbilitiesFunctionalityMatrix';
import { AbilityStatusEnum } from '../types';

export const AbilitiesFunctionalityMatrixContainer = () => {
  const stepperActions = useStepperActionCreators();
  const abilitiesActions = useAbilitiesActionCreators();
  const { abilities, importance } = useAbilitiesSelectors();

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 1,
    });
    abilitiesActions.onPrevState({
      step: AbilityStatusEnum.importance,
    });
  };

  useEffect(() => {}, [importance, abilities]);

  const onConfirm = () => {
    stepperActions.setStep({
      current: 2,
    });

    const matrix = Object.entries(importance).reduce((acc, [rowId, data]) => {
      const summ = Object.values(data).reduce(
        (acc, curr) => acc + Number(curr),
        0
      );

      const row = Object.entries(data).reduce((rowAcc, [colId, value]) => {
        rowAcc.push({
          rowId,
          colId,
          value: value ? +(1 / Math.sqrt(summ)).toFixed(4) : 0,
        });
        return rowAcc;
      }, []);

      acc.push(row);
      return acc;
    }, []);

    abilitiesActions.createFunctionalityMatrix(matrix);
    abilitiesActions.complete();
  };

  return (
    <>
      <Flex justify="flex-start">
        <Button onClick={onPrevStep} icon={<LeftOutlined />}>
          На попередній крок
        </Button>
      </Flex>

      <AbilitiesFunctionalityMatrix />

      <Button type="primary" onClick={onConfirm}>
        Все вірно
      </Button>
    </>
  );
};
