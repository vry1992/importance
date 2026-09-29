import { Table, type TableColumnType } from 'antd';
import React from 'react';
import { useNeedsSelectors } from '../needs.slice';
import type { TConnectivityMatrix, TNeed } from '../types';

type DataType = Record<string, number | string>;

const createDataSource = (
  connectivityMatrix: TConnectivityMatrix
): DataType[] => {
  return Object.values(connectivityMatrix).map((data) => {
    const row = data.reduce((acc, { value, need, dependency }) => {
      if (!acc['0']) {
        acc['0'] = need.name;
      }
      acc[dependency.id] = value;
      return acc;
    }, {});

    return row;
  });
};

const createColumns = (
  connectivityMatrix: TConnectivityMatrix,
  needs: TNeed[]
) => {
  const keys = Object.keys(connectivityMatrix);
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

  const columns = createColumns(connectivityMatrix, needs);
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
