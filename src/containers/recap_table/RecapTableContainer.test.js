import {
  onlyExpenses,
  aggregateByType,
  toList,
  computeTotalAmount,
  buildRecapFromData
} from './RecapTableContainer';

it('should filter only positive values', () => {
  const fakeData = [
    {
      key: 0,
      amount: 9999,
      type: 'EXP0'
    },
    {
      key: 1,
      amount: -229.87,
      type: 'EXP1'
    },
    {
      key: 2,
      amount: -600,
      type: 'EXP2'
    },
    {
      key: 3,
      amount: 9999,
      type: 'EXP0'
    },
    {
      key: 4,
      amount: 16.45,
      type: 'EXP3'
    }
  ];

  expect(fakeData.filter(onlyExpenses)).toEqual([
    { amount: -229.87, key: 1, type: 'EXP1' },
    { amount: -600, key: 2, type: 'EXP2' }
  ]);
});
it('should aggregate by type and sum all prices', () => {
  const fakeData = [
    {
      key: 0,
      amount: -10,
      type: 'EXP1'
    },
    {
      key: 1,
      amount: -10,
      type: 'EXP2'
    },
    {
      key: 3,
      amount: -10,
      type: 'EXP1'
    },
    {
      key: 4,
      amount: -30,
      type: 'EXP2'
    }
  ];

  const aggregated = fakeData.reduce(aggregateByType, {});
  expect(aggregated).toEqual({ EXP2: -40, EXP1: -20 });
});

it('should convert aggregated data to an array', () => {
  const fakeData = { EXP2: -40, EXP1: -20 };
  const listed = toList(fakeData);

  expect(listed).toEqual(
    expect.arrayContaining([
      {
        key: 0,
        type: 'EXP2',
        amount: -40
      },
      {
        key: 1,
        type: 'EXP1',
        amount: -20
      }
    ])
  );
});

it('should comput total amount', () => {
  const fakeData = [
    {
      key: 0,
      type: 'EXP2',
      amount: -40
    },
    {
      key: 1,
      type: 'EXP1',
      amount: -20
    }
  ];

  expect(-60).toEqual(computeTotalAmount(fakeData));
});

it('should aggregate with filtered values', () => {
  const fakeData = [
    {
      key: 0,
      date: new Date('2018-12-01'),
      amount: -10,
      type: 'EXP1',
      description: 'Giacca neve + Maglia termica + Maglie in pile'
    },
    {
      key: 1,
      date: new Date('2018-12-02'),
      amount: -10,
      type: 'EXP2',
      description: 'Mcdonald Lecco - Giro in moto'
    },
    {
      key: 2,
      date: new Date('2018-12-02'),
      amount: 20,
      type: 'EXP1',
      description: 'Ricarica prepagata'
    },
    {
      key: 3,
      date: new Date('2018-12-02'),
      amount: -10,
      type: 'EXP1',
      description: 'Benzina'
    },
    {
      key: 4,
      date: new Date('2018-12-02'),
      amount: -30,
      type: 'EXP2',
      description: 'Biglietto per folgarida'
    }
  ];

  const expectedData = {
    data: [
      {
        key: 0,
        type: 'EXP1',
        amount: -20
      },
      {
        key: 1,
        type: 'EXP2',
        amount: -40
      }
    ],
    totalAmount: -60
  };

  expect(buildRecapFromData(fakeData)).toEqual(expectedData);
});
