export type TStep = {
  title: string;
};

export type TStepperSlice = {
  steps: TStep[];
  current: number;
  percent: number;
  indexDbId: string;
};
