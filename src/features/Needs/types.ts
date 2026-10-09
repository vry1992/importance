import type { MatrixRowItem } from '../../services/matrix';

export type TNeed = {
  id: string;
  name: string;
};

export enum NeedsStatusEnum {
  connectivityMatrix,
  creating,
  review,
  completed,
}

export type TNeedsSlice = {
  needs: TNeed[];
  step: NeedsStatusEnum;
  connectivityMatrix: MatrixRowItem[][] | null;
  indexDbId: string;
};
