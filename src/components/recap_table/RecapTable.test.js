import React from 'react';
import renderer from 'react-test-renderer';
import RecapTable from './RecapTable';

describe('<RecapTable />', () => {
  it('should display a RecapTable without elements', () => {
    const table = renderer.create(<RecapTable data={[]} totalAmount={0} />);

    expect(table).toMatchSnapshot();
  });

  it('should display a RecapTable with a single element', () => {
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO'
      }
    ];
    const table = renderer.create(
      <RecapTable data={fakeData} totalAmount={-100} />
    );

    expect(table).toMatchSnapshot();
  });

  it('should display a RecapTable with more elements', () => {
    const fakeData = [...Array(5).keys()].map(index => ({
      key: index,
      amount: -100,
      type: 'MOTO'
    }));
    const table = renderer.create(
      <RecapTable data={fakeData} totalAmount={-100} />
    );

    expect(table).toMatchSnapshot();
  });
});
