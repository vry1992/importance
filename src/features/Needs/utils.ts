import type { TNeed } from './types';

export type TNeedWithDependenciesId = TNeed & { dependenciesId: string[] };

export const buildNeedsDependencies = (
  needs: TNeed[]
): { main: TNeed; deps: TNeedWithDependenciesId[] }[] => {
  return needs.reduce((acc, curr, _, arr) => {
    const withoutCurrent: TNeedWithDependenciesId[] = arr.map((item) => {
      return { ...item, dependenciesId: [item.id, curr.id] };
    });

    const deps: { main: TNeed; deps: TNeedWithDependenciesId[] } = {
      main: curr,
      deps: withoutCurrent,
    };

    acc.push(deps);

    return acc;
  }, []);
};

export const checkSameNames = (
  nameStore: Record<string, boolean>,
  newName: string[]
) => {
  const defaultName = newName.join('_');
  const reversedName = newName.reverse().join('_');

  return {
    defaultName: nameStore[defaultName],
    reversedName: nameStore[reversedName],
  };
};
