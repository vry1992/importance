import { Table, type TableColumnType } from 'antd';
import React from 'react';
import type { MatrixRowItem } from '../../../services/matrix';
import { useNeedsSelectors } from '../needs.slice';
import type { TNeed } from '../types';

type DataType = Record<string, number | string>;

const createDataSource = (
  connectivityMatrix: MatrixRowItem[][]
): DataType[] => {
  return Object.values(connectivityMatrix).map((data) => {
    const row = data.reduce((acc, { value, data }) => {
      if (!data) return acc;

      if (!acc['0']) {
        acc['0'] = data.need.name;
      }
      acc[data.dependency.id] = value;
      return acc;
    }, {});

    return row;
  });
};

const createColumns = (needs: TNeed[]) => {
  const keys = needs.map(({ id }) => id);
  const needsAsObj = needs.reduce<Record<string, string>>((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  const columns: TableColumnType<DataType>[] = keys.map((dataIndex) => {
    return {
      title: needsAsObj[dataIndex],
      dataIndex,
    };
  });

  columns.unshift({
    fixed: true,
    title: 'Потреба / Залежність',
    dataIndex: '0',
  });

  return columns;
};

export const NeedsReviewTable: React.FC = () => {
  const { connectivityMatrix, needs } = useNeedsSelectors();

  const columns = createColumns(needs);
  const dataSource = createDataSource(connectivityMatrix);

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
