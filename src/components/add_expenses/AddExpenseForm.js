import React, { PureComponent } from 'react';
import { Form, DatePicker, Input, Button, Select } from 'antd';
import './AddExpenseForm.css';
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

class AddExpenseForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmitSuccess(values);
      }
    });
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="add-expense-form">
        <h3 className="form-title">Add New</h3>
        <Form
          layout="vertical"
          className="expenses-form"
          onSubmit={this.handleSubmit}
        >
          <Item>
            {getFieldDecorator('date', {
              rules: [
                {
                  required: true,
                  message: 'Please insert a valid date'
                }
              ]
            })(
              <DatePicker
                className="expense-date-picker"
                format={'DD/MM/YYYY'}
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please select a valid product'
                }
              ]
            })(
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select type"
              >
                <Option value="MOTO">Moto</Option>
                <Option value="CASA">Casa</Option>
                <Option value="VARIE">Varie</Option>
              </Select>
            )}
          </Item>
          <Item>
            {getFieldDecorator('amount', {
              rules: [
                {
                  required: true,
                  message: 'Please insert a valid amount'
                }
              ]
            })(<Input placeholder={'Insert amount: €'} type={'number'} />)}
          </Item>
          <Item>
            {getFieldDecorator('descritpion', {})(
              <TextArea placeholder={'Insert short description'} />
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Item>
        </Form>
      </div>
    );
  };
}

export default Form.create()(AddExpenseForm);
