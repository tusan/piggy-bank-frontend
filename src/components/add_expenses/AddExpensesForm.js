import React, { PureComponent } from 'react';
import { Form, DatePicker, Input, Button, Select, Layout } from 'antd';
import './AddExpensesForm.css';
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

export default class AddExpenseForm extends PureComponent {
  render = () => (
    <div className="add-expense-form">
      <h3 className="form-title">Add New</h3>
      <Form layout="vertical" className="expenses-form">
        <Item>
          <DatePicker className="expense-date-picker" format={'DD/MM/YYYY'} />
        </Item>
        <Item>
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select type"
          >
            <Option value="MOTO">Moto</Option>
            <Option value="CASA">Casa</Option>
            <Option value="VARIE">Varie</Option>
          </Select>
        </Item>
        <Item>
          <Input placeholder={'Insert amount: €'} type={'number'} />
        </Item>
        <Item>
          <TextArea placeholder={'Insert short description'} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Item>
      </Form>
    </div>
  );
}
