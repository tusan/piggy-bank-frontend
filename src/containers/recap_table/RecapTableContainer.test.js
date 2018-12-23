import RecapTableContainer, {
  onlyExpenses,
  aggregateByType,
  toList,
  computeTotalAmount
} from './RecapTableContainer';

import RecapTable from '../../components/recap_table/RecapTable';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

it('should filter only positive values', () => {
  const fakeData = [
    {
      key: 0,
      amount: 1711,
      type: 'STIPENDIO'
    },
    {
      key: 1,
      amount: -229.87,
      type: 'VESTITI'
    },
    {
      key: 2,
      amount: -600,
      type: 'CASA'
    },
    {
      key: 3,
      amount: 2000,
      type: 'STIPENDIO'
    },
    {
      key: 4,
      amount: 16.45,
      type: 'MOTO'
    }
  ];

  expect(fakeData.filter(onlyExpenses)).toEqual([
    { amount: -229.87, key: 1, type: 'VESTITI' },
    { amount: -600, key: 2, type: 'CASA' }
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

it('should create RecapTable with filtered values', () => {
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

  const wrapper = mount(<RecapTableContainer data={fakeData} />);
  const innerProps = wrapper.find(RecapTable);

  expect(innerProps.props().data).toEqual(
    expect.arrayContaining([
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
    ])
  );

  expect(innerProps.props().totalAmount).toEqual(-60);
});