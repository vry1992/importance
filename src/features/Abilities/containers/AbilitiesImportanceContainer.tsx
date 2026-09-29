import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useAbilitiesActionCreators } from '../abilities.slice';
import { AbilitiesImportanceForm } from '../components/AbilitiesImportanceForm';
import { AbilityStatusEnum } from '../types';

export const AbilitiesImportanceContainer = () => {
  const stepperActions = useStepperActionCreators();
  const abilitiesActions = useAbilitiesActionCreators();

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 1,
      percent: 0,
    });
    abilitiesActions.onPrevState({
      step: AbilityStatusEnum.creating,
    });
  };

  return (
    <>
      <Flex justify="flex-start">
        <Button onClick={onPrevStep} icon={<LeftOutlined />}>
          На попередній крок
        </Button>
      </Flex>

      <Typography.Title level={3}>Визначення важливості</Typography.Title>
      <AbilitiesImportanceForm />
    </>
  );
};
