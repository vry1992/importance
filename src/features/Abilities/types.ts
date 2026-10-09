import type { MatrixRowItem } from '../../services/matrix';

export type TAbility = {
  id: string;
  name: string;
};

export enum AbilityStatusEnum {
  creating,
  importance,
  review,
  completed,
}

export type TAbilitiesSlice = {
  functionalityMatrix: MatrixRowItem[][] | [];
  abilities: TAbility[];
  step: AbilityStatusEnum;
  importance: Record<string, Record<string, number>> | null;
  indexDbId: string;
};
