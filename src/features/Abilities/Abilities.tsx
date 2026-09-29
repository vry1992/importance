import { Collapse } from 'antd';
import { useAbilitiesSelectors } from './abilities.slice';
import { AbilitiesForm } from './components/AbilitiesForm';
import { AbilitiesFunctionalityMatrixContainer } from './containers/AbilitiesFunctionalityMatrixContainer';
import { AbilitiesImportanceContainer } from './containers/AbilitiesImportanceContainer';
import { AbilityStatusEnum } from './types';

export const Abilities = () => {
  const { step } = useAbilitiesSelectors();

  const items = [
    {
      key: '0',
      label: 'Створення спроможностей',
      children: <AbilitiesForm />,
    },
    {
      key: '1',
      label: 'Формування матриці функціональності',
      children: <AbilitiesImportanceContainer />,
    },
    {
      key: '2',
      label: 'Матриця функціональності',
      children: <AbilitiesFunctionalityMatrixContainer />,
    },
  ];

  const KEY_MAP = {
    [AbilityStatusEnum.creating]: '0',
    [AbilityStatusEnum.importance]: '1',
    [AbilityStatusEnum.review]: '2',
  };

  return (
    <>
      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={['0']}
        activeKey={KEY_MAP[step]}
      />
    </>
  );
};
