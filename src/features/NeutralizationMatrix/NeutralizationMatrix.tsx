import { Table } from 'antd';
import { useNeedsSelectors } from '../Needs/needs.slice';
import type { TNeed } from '../Needs/types';

type DataType = {
  fixed: boolean;
  key: React.Key;
  title: string;
  dataIndex: string;
};

const createDataSource = (columns: DataType[]) => {
  return columns
    .map((col, idx) => {
      if (col.dataIndex === 'rowName') return;

      return columns.reduce(
        (acc, curr) => {
          if (curr.dataIndex === 'rowName') return acc;
          acc[curr.dataIndex] = Number(curr.dataIndex === col.dataIndex);
          return acc;
        },
        { rowName: columns[idx].title }
      );
    })
    .filter(Boolean);
};

const createColumns = (needs: TNeed[]) => {
  const columns = needs.map(({ name, id }): DataType => {
    return {
      fixed: false,
      title: name,
      dataIndex: id,
      key: id,
    } as DataType;
  });

  columns.unshift({
    fixed: true,
    title: 'Потреба / Потреба',
    dataIndex: 'rowName',
    key: 'rowName',
    width: '200px',
  });

  return columns;
};

export const NeutralizationMatrix = () => {
  const { needs } = useNeedsSelectors();

  const columns = createColumns(needs);

  const dataSource = createDataSource(columns);

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
