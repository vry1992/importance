import { Abilities } from '../features/Abilities/Abilities';
import { Counting } from '../features/Counting/Counting';
import { Needs } from '../features/Needs/Needs';
import { NeutralizationMatrixContainer } from '../features/NeutralizationMatrix/containers/NeutralizationMatrixContainer';
import { useStepsSelectors } from '../features/Stepper/Stepper.slice';
import { VectorOfInfluence } from '../features/VectorOfInfluence/VectorOfInfluence';
import { Stepper } from '../ui/components/Stepper/Stepper';

export const Home = () => {
  const stepper = useStepsSelectors();

  const showNeeds = stepper.current === 0;

  const showAbilities = stepper.current === 1;

  const showVectorOfInfluence = stepper.current === 2;

  const showNeutralizationMatrix = stepper.current === 3;

  const showCounts = stepper.current === 4;

  return (
    <div>
      <Stepper />

      {showNeeds && <Needs />}
      {showAbilities && <Abilities />}
      {showVectorOfInfluence && <VectorOfInfluence />}
      {showNeutralizationMatrix && <NeutralizationMatrixContainer />}
      {showCounts && <Counting />}
    </div>
  );
};
