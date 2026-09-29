import { Collapse } from 'antd';
import { useSearchParams } from 'react-router';
import { NeedFormCreate } from './components/NeedFormCreate';
import { NeedFormEdit } from './components/NeedFormEdit';
import { NeedsDependencies } from './components/NeedsDependencies';
import { NeedsReviewContainer } from './containers/NeedsReviewContainer';
import { useNeedsSelectors } from './needs.slice';
import { NeedsStatusEnum } from './types';

export const Needs = () => {
  const { step } = useNeedsSelectors();
  const [searchParams] = useSearchParams();

  const isNeedsEditing = searchParams.get('edit') === '1';

  const items = [
    {
      key: '0',
      label: isNeedsEditing
        ? 'Редагування переліку потреб'
        : 'Створення потреб',
      children: isNeedsEditing ? <NeedFormEdit /> : <NeedFormCreate />,
    },
    {
      key: '1',
      label: 'Визначення взаємозалежностей між потребами',
      children: <NeedsDependencies />,
    },
    {
      key: '2',
      label: 'Перевірка введених даних',
      children: <NeedsReviewContainer />,
    },
  ];

  const KEY_MAP = {
    [NeedsStatusEnum.creating]: '0',
    [NeedsStatusEnum.connectivityMatrix]: '1',
    [NeedsStatusEnum.review]: '2',
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
