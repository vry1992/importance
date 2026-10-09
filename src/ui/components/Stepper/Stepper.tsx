import { Steps } from 'antd';
import { useStepsSelectors } from '../../../features/Stepper/Stepper.slice';

export const Stepper = () => {
  const { steps, current } = useStepsSelectors();
  return (
    <Steps current={current} titlePlacement="vertical" items={steps} ellipsis />
  );
};
