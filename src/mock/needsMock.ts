export const NEED_MOCK = {
  needs: [
    {
      id: '298b2596-943c-4219-b667-d62b7559d3db',
      name: 'Потреба 1',
    },
    {
      id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
      name: 'Потреба 2',
    },
    {
      id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
      name: 'Потреба 3',
    },
    {
      id: '14037f29-5b02-4479-8702-f5959df05bb6',
      name: 'Потреба 4',
    },
  ],
  connectivityMatrix: [
    [
      {
        dependencyId: '298b2596-943c-4219-b667-d62b7559d3db',
        value: 1,
        needId: '298b2596-943c-4219-b667-d62b7559d3db',
        need: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        dependency: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        rowId: '298b2596-943c-4219-b667-d62b7559d3db',
        colId: '298b2596-943c-4219-b667-d62b7559d3db',
      },
      {
        dependencyId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        value: 0,
        needId: '298b2596-943c-4219-b667-d62b7559d3db',
        need: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        dependency: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        rowId: '298b2596-943c-4219-b667-d62b7559d3db',
        colId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
      },
      {
        dependencyId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        value: 0.2,
        needId: '298b2596-943c-4219-b667-d62b7559d3db',
        need: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        dependency: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        rowId: '298b2596-943c-4219-b667-d62b7559d3db',
        colId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
      },
      {
        dependencyId: '14037f29-5b02-4479-8702-f5959df05bb6',
        value: 0.3,
        needId: '298b2596-943c-4219-b667-d62b7559d3db',
        need: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        dependency: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        rowId: '298b2596-943c-4219-b667-d62b7559d3db',
        colId: '14037f29-5b02-4479-8702-f5959df05bb6',
      },
    ],
    [
      {
        dependencyId: '298b2596-943c-4219-b667-d62b7559d3db',
        value: 0.5,
        needId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        need: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        dependency: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        rowId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        colId: '298b2596-943c-4219-b667-d62b7559d3db',
      },
      {
        dependencyId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        value: 1,
        needId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        need: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        dependency: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        rowId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        colId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
      },
      {
        dependencyId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        value: 0.3,
        needId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        need: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        dependency: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        rowId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        colId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
      },
      {
        dependencyId: '14037f29-5b02-4479-8702-f5959df05bb6',
        value: 0.2,
        needId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        need: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        dependency: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        rowId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        colId: '14037f29-5b02-4479-8702-f5959df05bb6',
      },
    ],
    [
      {
        dependencyId: '298b2596-943c-4219-b667-d62b7559d3db',
        value: 0.2,
        needId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        need: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        dependency: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        rowId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        colId: '298b2596-943c-4219-b667-d62b7559d3db',
      },
      {
        dependencyId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        value: 0.3,
        needId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        need: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        dependency: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        rowId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        colId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
      },
      {
        dependencyId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        value: 1,
        needId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        need: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        dependency: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        rowId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        colId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
      },
      {
        dependencyId: '14037f29-5b02-4479-8702-f5959df05bb6',
        value: 0.5,
        needId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        need: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        dependency: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        rowId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        colId: '14037f29-5b02-4479-8702-f5959df05bb6',
      },
    ],
    [
      {
        dependencyId: '298b2596-943c-4219-b667-d62b7559d3db',
        value: 0.2,
        needId: '14037f29-5b02-4479-8702-f5959df05bb6',
        need: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        dependency: {
          id: '298b2596-943c-4219-b667-d62b7559d3db',
          name: 'Потреба 1',
        },
        rowId: '14037f29-5b02-4479-8702-f5959df05bb6',
        colId: '298b2596-943c-4219-b667-d62b7559d3db',
      },
      {
        dependencyId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
        value: 0.3,
        needId: '14037f29-5b02-4479-8702-f5959df05bb6',
        need: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        dependency: {
          id: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
          name: 'Потреба 2',
        },
        rowId: '14037f29-5b02-4479-8702-f5959df05bb6',
        colId: 'e6878fca-ee96-4136-bcfc-fed5cbeca27f',
      },
      {
        dependencyId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
        value: 0.5,
        needId: '14037f29-5b02-4479-8702-f5959df05bb6',
        need: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        dependency: {
          id: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
          name: 'Потреба 3',
        },
        rowId: '14037f29-5b02-4479-8702-f5959df05bb6',
        colId: '91981b0e-f5be-49c1-97bc-f9dc987e50f0',
      },
      {
        dependencyId: '14037f29-5b02-4479-8702-f5959df05bb6',
        value: 1,
        needId: '14037f29-5b02-4479-8702-f5959df05bb6',
        need: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        dependency: {
          id: '14037f29-5b02-4479-8702-f5959df05bb6',
          name: 'Потреба 4',
        },
        rowId: '14037f29-5b02-4479-8702-f5959df05bb6',
        colId: '14037f29-5b02-4479-8702-f5959df05bb6',
      },
    ],
  ],
  step: 3,
  indexDbId: '08f4e8a3-e801-4742-ade6-1bd96ce99e01',
};
