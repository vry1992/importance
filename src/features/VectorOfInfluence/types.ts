export type TVectorOfInfluenceSlice = {
  vectorsOfInfluences: Record<string, number> | null;
  step: VectorOfInfluenceStatusEnum;
  indexDbId: string;
};

export enum VectorOfInfluenceStatusEnum {
  creating,
  completed,
}
