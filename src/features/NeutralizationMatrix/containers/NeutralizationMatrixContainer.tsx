import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { NeutralizationMatrix } from '../NeutralizationMatrix';

export const NeutralizationMatrixContainer = () => {
  const stepperActions = useStepperActionCreators();
  const onPrevStep = () => {
    stepperActions.setStep({
      current: 2,
      percent: 100,
    });
  };
  const onConfirm = () => {
    stepperActions.setStep({
      current: 4,
      percent: 0,
    });
  };

  return (
    <>
      <Flex justify="flex-start">
        <Button onClick={onPrevStep} icon={<LeftOutlined />}>
          На попередній крок
        </Button>
      </Flex>

      <NeutralizationMatrix />

      <Button type="primary" onClick={onConfirm}>
        Все вірно
      </Button>
    </>
  );
};
