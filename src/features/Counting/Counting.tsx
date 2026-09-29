import { Flex, Steps, type StepsProps } from 'antd';
import { useEffect, useState } from 'react';
import {
  createNeutralizationMatrix,
  matrixMultiplier,
} from '../../services/matrix';
import { useAUMatrixActionCreators } from '../AUMatrix/AUMatrix.slice';
import { useNeedsSelectors } from '../Needs/needs.slice';
import {
  useNeutralizationMatrixActionCreators,
  useNeutralizationMatrixSelectors,
} from '../NeutralizationMatrix/NeutralizationMatrix.slice';

const items = [
  {
    title: 'Finished',
    content: 'This is a content.',
  },
  {
    title: 'In Progress',
    content: 'This is a content.',
  },
  {
    title: 'Waiting',
    content: 'This is a content.',
  },
];

const sharedProps: StepsProps = {
  items,
  orientation: 'vertical',
};

export const Counting = () => {
  const { needs, connectivityMatrix } = useNeedsSelectors();
  const neutralizationMatrixActions = useNeutralizationMatrixActionCreators();
  const AUMatrixActions = useAUMatrixActionCreators();
  const { matrix: neutralizationMatrix } = useNeutralizationMatrixSelectors();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === 0) {
      const neutralizationMatrix = createNeutralizationMatrix(needs);
      neutralizationMatrixActions.create(neutralizationMatrix);

      console.log();
      setCurrent(1);
    }
  }, [needs, current]);

  useEffect(() => {
    if (current === 1 && neutralizationMatrix && connectivityMatrix) {
      console.log('conn => ', connectivityMatrix);
      const AUMatrix = matrixMultiplier(
        connectivityMatrix,
        neutralizationMatrix
      );

      console.log('AU => ', AUMatrix);

      AUMatrixActions.create(AUMatrix);
      // const neutralizationMatrix = createNeutralizationMatrix(needs);
      // neutralizationMatrixActions.create(neutralizationMatrix);
      setCurrent(2);
    }
  }, [needs, current, neutralizationMatrix, connectivityMatrix]);

  return (
    <Flex vertical gap="medium" align="flex-start">
      <Steps {...sharedProps} variant="outlined" current={current} />
    </Flex>
  );
};
