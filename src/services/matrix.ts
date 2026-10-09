import type { TNeed } from '../features/Needs/types';

export type MatrixRowItem = {
  rowId: string;
  colId: string;
  value: number;
  data?: {
    need?: TNeed;
    dependency?: TNeed;
  };
};

const convertMatrixColumnsToRows = (matrix: MatrixRowItem[][]) => {
  const matrixColumnsAmount = matrix[0].length;
  const matrixRowsAmount = matrix.length;

  const convertedMatrix = [];

  for (let columnIndex = 0; columnIndex < matrixColumnsAmount; columnIndex++) {
    convertedMatrix[columnIndex] = [];
    for (let rowIndex = 0; rowIndex < matrixRowsAmount; rowIndex++) {
      convertedMatrix[columnIndex].push(matrix[rowIndex][columnIndex]);
    }
  }

  return convertedMatrix;
};

export const matrixMultiplier = (
  leftMatrix: MatrixRowItem[][],
  rightMatrix: MatrixRowItem[][]
): MatrixRowItem[][] => {
  const leftMatrixCols = leftMatrix[0]?.length;
  const rightMatrixRows = rightMatrix.length;

  if (leftMatrixCols !== rightMatrixRows) {
    alert('Матриці не коректні');
  }

  const matrix = [];

  for (let rowIndex = 0; rowIndex < leftMatrix.length; rowIndex++) {
    const row = leftMatrix[rowIndex];
    const newRow = [];
    const rowId = row[0].rowId;

    for (let rightColIndex = 0; rightColIndex < row.length; rightColIndex++) {
      const colId = row[rightColIndex].colId;
      const cell = {
        colId,
        rowId,
        value: 0,
      };
      for (
        let leftRowItemIndex = 0;
        leftRowItemIndex < row.length;
        leftRowItemIndex++
      ) {
        const rightValue = rightMatrix[leftRowItemIndex][rightColIndex].value;
        const leftValue = leftMatrix[rowIndex][leftRowItemIndex].value;
        cell.value = cell.value + rightValue * leftValue;
      }

      newRow.push(cell);
    }

    matrix.push(newRow);
  }

  return matrix;
};

export const createNeutralizationMatrix = (
  needs: TNeed[]
): MatrixRowItem[][] => {
  const rowIds = needs.map(({ id }) => id);

  return rowIds.reduce((acc, currNeedId): MatrixRowItem[][] => {
    acc.push(
      needs.map(({ id }) => ({
        rowId: currNeedId,
        colId: id,
        value: id === currNeedId ? 1 : 0,
      }))
    );

    return acc;
  }, []);
};
