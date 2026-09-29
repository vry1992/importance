import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { NeedsReviewTable } from '../components/NeedsReviewTable';
import { useNeedsActionCreators } from '../needs.slice';
import { NeedsStatusEnum } from '../types';

export const NeedsReviewContainer = () => {
  const stepperActions = useStepperActionCreators();
  const needsActions = useNeedsActionCreators();

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 0,
      percent: 50,
    });
    needsActions.onPrevState({
      step: NeedsStatusEnum.connectivityMatrix,
    });
  };
  const onConfirm = () => {
    stepperActions.setStep({
      current: 1,
      percent: 0,
    });
    needsActions.complete();
  };
  return (
    <>
      <Flex justify="flex-start">
        <Button onClick={onPrevStep} icon={<LeftOutlined />}>
          На попередній крок
        </Button>
      </Flex>

      <NeedsReviewTable />

      <Button type="primary" onClick={onConfirm}>
        Все вірно
      </Button>
    </>
  );
};
