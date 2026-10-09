import type { MatrixRowItem } from '../../services/matrix';

export type TNeutralizationMatrix = {
  matrix: MatrixRowItem[][];
  indexDbId: string;
};
