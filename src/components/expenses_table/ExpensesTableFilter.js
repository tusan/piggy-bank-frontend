import React from 'react';
import { Form, Button, DatePicker } from 'antd';
import './ExpensesTableFilter.css';

const { Item } = Form;

class ExpensesTableFilter extends React.PureComponent {
  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="expenses-filter">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <h3 className="form-title">Select Period</h3>

          <Item>
            {getFieldDecorator('dateStart', {
              initialValue: this.props.dateStartInit
            })(
              <DatePicker
                className="expense-date-picker"
                placeholder="Start Date"
                format={'DD/MM/YYYY'}
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator('dateEnd', {
              initialValue: this.props.dateEndInit
            })(
              <DatePicker
                className="expense-date-picker"
                placeholder="End Date"
                format={'DD/MM/YYYY'}
              />
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Item>
        </Form>
      </div>
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleFilterChange(values);
      }
    });
  };
}
export default Form.create()(ExpensesTableFilter);
