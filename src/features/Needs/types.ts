import type { MatrixRow } from '../../services/matrix';

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

export type TConnectivityMatrixRow = Array<
  MatrixRow & {
    need: TNeed;
    dependency: TNeed;
  }
>;

export type TConnectivityMatrix = Record<string, TConnectivityMatrixRow>;

export type TNeedsSlice = {
  needs: TNeed[];
  step: NeedsStatusEnum;
  connectivityMatrix: TConnectivityMatrix | null;
  indexDbId: string;
};
