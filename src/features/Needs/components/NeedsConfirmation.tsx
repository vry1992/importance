import { Button } from 'antd';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useNeedsActionCreators } from '../needs.slice';
import { NeedsStatusEnum } from '../types';
import { NeedsReviewTable } from './NeedsReviewTable';

export const NeedsConfirmation = () => {
  const stepperActions = useStepperActionCreators();
  const needsActions = useNeedsActionCreators();

  const onConfirm = () => {
    stepperActions.setStep({
      current: 1,
      percent: 0,
    });
    needsActions.complete();
  };

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 0,
      percent: 90,
    });
    needsActions.onPrevState({
      step: NeedsStatusEnum.connectivityMatrix,
    });
  };

  return (
    <>
      <NeedsReviewTable />
      <div
        style={{
          paddingTop: '20px',
        }}>
        <Button type="primary" onClick={onConfirm}>
          Все вірно
        </Button>

        <Button onClick={onPrevStep}>На попередній крок</Button>
      </div>
    </>
  );
};
