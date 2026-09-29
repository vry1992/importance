import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useAbilitiesActionCreators } from '../abilities.slice';
import { AbilitiesFunctionalityMatrix } from '../components/AbilitiesFunctionalityMatrix';
import { AbilityStatusEnum } from '../types';

export const AbilitiesFunctionalityMatrixContainer = () => {
  const stepperActions = useStepperActionCreators();
  const abilitiesActions = useAbilitiesActionCreators();

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 1,
      percent: 50,
    });
    abilitiesActions.onPrevState({
      step: AbilityStatusEnum.importance,
    });
  };

  const onConfirm = () => {
    stepperActions.setStep({
      current: 2,
      percent: 0,
    });
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
