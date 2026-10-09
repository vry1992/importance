import { Button, Flex, Steps, type StepsProps } from 'antd';
import { useEffect, useState } from 'react';
import {
  createNeutralizationMatrix,
  matrixMultiplier,
} from '../../services/matrix';
import {
  useAUMatrixActionCreators,
  useAUMatrixSelectors,
} from '../AUMatrix/AUMatrix.slice';
import { useAbilitiesSelectors } from '../Abilities/abilities.slice';
import { useNeedsSelectors } from '../Needs/needs.slice';
import {
  useNeutralizationMatrixActionCreators,
  useNeutralizationMatrixSelectors,
} from '../NeutralizationMatrix/NeutralizationMatrix.slice';
import {
  useUAUMatrixActionCreators,
  useUAUMatrixSelectors,
} from '../UAUMatrix/UAUMatrix.slice';
import { useVectorOfInfluenceSelectors } from '../VectorOfInfluence/vectorOfInfluence.slice';
import {
  useWUAUMatrixActionCreators,
  useWUAUMatrixSelectors,
} from '../WUAUMatrix/WUAUMatrix.slice';

const Show = () => {
  return <Button>Показати матрицю</Button>;
};

const items = [
  {
    title: 'Створення матриці нейтралізації впливу "U"',
    content: <Show />,
  },
  {
    title:
      'Процедура множення матриці нейтралізації впливу потреб на досянення мети "U" на матрицю звʼязаності "Λ"',
    content: <Show />,
  },
  {
    title:
      'Процедура множення матриці-добутку "UΛ" на матрицю нейтралізацію впливу потреб на досягнення мети "U"',
    content: <Show />,
  },
  {
    title:
      'Процедура множення матриці-добутку "UΛU" на матрицю функціональності "Ψ"',
    content: <Show />,
  },
  {
    title:
      'Процедура множення матриці-добутку "ΨUΛU" на вектор впливу критичних спроможностей на досягнення мети "β"',
    content: <Show />,
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
  const UAUMatrixActions = useUAUMatrixActionCreators();
  const WAUMatrixActions = useWUAUMatrixActionCreators();
  const { functionalityMatrix } = useAbilitiesSelectors();
  const { matrix: neutralizationMatrix } = useNeutralizationMatrixSelectors();
  const { matrix: AUMatrix } = useAUMatrixSelectors();
  const { matrix: UAUMatrix } = useUAUMatrixSelectors();
  const { matrix: WUAUMatrix } = useWUAUMatrixSelectors();
  const { vectorsOfInfluences } = useVectorOfInfluenceSelectors();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === 0) {
      const neutralizationMatrix = createNeutralizationMatrix(needs); // U matrix
      neutralizationMatrixActions.create(neutralizationMatrix);
      setCurrent(1);
    }
  }, [needs, current]);

  useEffect(() => {
    if (current === 1 && neutralizationMatrix && connectivityMatrix) {
      const newAUMatrix = matrixMultiplier(
        connectivityMatrix, // A matrix
        neutralizationMatrix // U matrix
      );
      AUMatrixActions.create(newAUMatrix);
      setCurrent(2);
    }
  }, [current, neutralizationMatrix, connectivityMatrix]);

  useEffect(() => {
    const isReady = current === 2 && neutralizationMatrix && AUMatrix;
    if (isReady) {
      const newUAUMatrix = matrixMultiplier(neutralizationMatrix, AUMatrix); // UAU
      UAUMatrixActions.create(newUAUMatrix);
      setCurrent(3);
    }
  }, [current, neutralizationMatrix, AUMatrix]);

  useEffect(() => {
    const isReady = current === 3 && UAUMatrix && functionalityMatrix;

    if (isReady) {
      const newWUAUMatrix = matrixMultiplier(functionalityMatrix, UAUMatrix); // WUAU
      WAUMatrixActions.create(newWUAUMatrix);
      setCurrent(4);
    }
  }, [current, UAUMatrix, functionalityMatrix]);

  useEffect(() => {
    const isReady = current === 4 && WUAUMatrix && vectorsOfInfluences;

    if (isReady) {
      const convertVectorOfInfluenceToMatrix = () => {
        return Object.entries(vectorsOfInfluences).reduce(
          (acc, [rowId, value]) => {
            const cell = { rowId, colId: rowId, value };
            acc[0].push(cell);
            return acc;
          },
          [[]]
        );
      };

      const vectorOfInfluenceMatrix = convertVectorOfInfluenceToMatrix();

      const res = matrixMultiplier(vectorOfInfluenceMatrix, WUAUMatrix); // WUAU

      console.log('=>>>> ', res);
      // WAUMatrixActions.create(newWUAUMatrix);
      // setCurrent(4);
    }
  }, [current, WUAUMatrix, vectorsOfInfluences]);

  return (
    <Flex vertical gap="medium" align="flex-start">
      <Steps {...sharedProps} variant="outlined" current={current} />
    </Flex>
  );
};
