import type { TNeed } from '../features/Needs/types';

export type MatrixRow = { rowId: string; colId: string; value: number };

export const matrixMultiplier = <L extends MatrixRow, R extends MatrixRow>(
  leftMatrix: L,
  rightMatrix: R
): MatrixRow[] => {
  const rightMatrixRows = Object.values(rightMatrix);
  const leftMatrixRows = Object.values(leftMatrix);
  const result = [];

  for (
    let mainRowIndex = 0;
    mainRowIndex < leftMatrixRows.length;
    mainRowIndex++
  ) {
    result[mainRowIndex] = [];
    for (let rowIndex = 0; rowIndex < leftMatrixRows.length; rowIndex++) {
      let cell = {
        value: 0,
        rowId: leftMatrixRows[mainRowIndex][rowIndex].rowId,
        colId: leftMatrixRows[mainRowIndex][rowIndex].colId,
      };

      const currentValue = leftMatrixRows[mainRowIndex][rowIndex].value;
      for (let colIndex = 0; colIndex < rightMatrixRows.length; colIndex++) {
        cell.value += currentValue * rightMatrixRows[rowIndex][colIndex].value;
      }
      result[mainRowIndex][rowIndex] = cell;
    }
  }

  return result;
};

export const createNeutralizationMatrix = (needs: TNeed[]): MatrixRow[] => {
  const rowIds = needs.map(({ id }) => id);

  return rowIds.reduce((acc, currNeedId): MatrixRow[] => {
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
