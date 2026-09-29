import { LeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useSearchParams } from 'react-router';
import { useStepperActionCreators } from '../../Stepper/Stepper.slice';
import { useNeedsActionCreators } from '../needs.slice';
import { NeedsStatusEnum } from '../types';
import { NeedsDependenciesForm } from './NeedsDependenciesForm';

export const NeedsDependencies = () => {
  const stepperActions = useStepperActionCreators();
  const needsActions = useNeedsActionCreators();
  const [, setSearchParams] = useSearchParams();

  const onPrevStep = () => {
    stepperActions.setStep({
      current: 0,
      percent: 0,
    });
    needsActions.onPrevState({
      step: NeedsStatusEnum.creating,
    });
    setSearchParams({
      edit: '1',
    });
  };
  return (
    <>
      <Flex justify="flex-start">
        <Button onClick={onPrevStep} icon={<LeftOutlined />}>
          На попередній крок
        </Button>
      </Flex>

      <NeedsDependenciesForm />
    </>
  );
};
