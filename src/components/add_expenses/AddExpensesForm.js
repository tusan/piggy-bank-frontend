import React, { PureComponent } from 'react';
import { Form, DatePicker, Input, Button, Select } from 'antd';
import './AddExpensesForm.css';
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

export default class AddExpenseForm extends PureComponent {
  render = () => (
    <div className="add-expense-form">
      <Form layout="vertical" className="expenses-form">
        <Item>
          <DatePicker
            format={'DD/MM/YYYY'}
            style={{
              float: 'left'
            }}
          />
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
