import { Steps } from 'antd';
import { useStepsSelectors } from '../../../features/Stepper/Stepper.slice';

export const Stepper = () => {
  const { steps, current, percent } = useStepsSelectors();
  return (
    <Steps
      // orientation="vertical"
      current={current}
      percent={percent}
      titlePlacement="vertical"
      items={steps}
      ellipsis
    />
  );
};
