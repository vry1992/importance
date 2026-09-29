import { Table } from 'antd';
import { useNeedsSelectors } from '../../Needs/needs.slice';
import type { TNeed } from '../../Needs/types';
import { useAbilitiesSelectors } from '../abilities.slice';

type DataType = {
  fixed: boolean;
  key: React.Key;
  title: string;
  dataIndex: string;
};

const createDataSource = (
  deps: Record<string, Record<string, number>>,
  needsAsObj: Record<string, string>
): DataType[] => {
  return Object.entries(deps).map(([rowId, data]) => {
    const summ = Object.values(data).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );

    const cells = Object.keys(data).reduce((acc, curr) => {
      acc[curr] = data[curr] ? (1 / Math.sqrt(summ)).toFixed(4) : 0;
      return acc;
    }, {});

    return { ...cells, '0': needsAsObj[rowId] };
  });
};

const createColumns = (needs: TNeed[]) => {
  const columns = needs.map(({ name, id }) => {
    return {
      fixed: false,
      title: name,
      dataIndex: id,
      key: id,
    };
  });

  columns.unshift({
    fixed: true,
    title: 'Потреба',
    dataIndex: '0',
    key: '0',
    width: '250px',
  });

  return columns;
};

export const AbilitiesFunctionalityMatrix = () => {
  const { needs } = useNeedsSelectors();
  const { abilities, importance } = useAbilitiesSelectors();

  const abilitiesAsObj = abilities.reduce<Record<string, string>>(
    (acc, curr) => {
      acc[curr.id] = curr.name;
      return acc;
    },
    {}
  );

  const columns = createColumns(needs);
  const dataSource = createDataSource(importance, abilitiesAsObj);

  return (
    <Table<DataType>
      styles={{
        header: {
          cell: {
            minWidth: '150px',
            textOverflow: 'ellipsis',
          },
        },
        body: {
          cell: {
            width: '150px',
          },
        },
      }}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 'max-content' }}
    />
  );
};
