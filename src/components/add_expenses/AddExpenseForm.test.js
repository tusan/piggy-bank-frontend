import React from 'react';
import renderer from 'react-test-renderer';
import AddExpenseForm from './AddExpenseForm';

describe('<AddExpenseForm />', () => {
  it('should display an AddExpenseForm', () => {
    const form = renderer.create(<AddExpenseForm />);

    expect(form).toMatchSnapshot();
  });
});
