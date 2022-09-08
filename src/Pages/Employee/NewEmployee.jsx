import React from "react";
import { Form, Input, Select, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { useCreateEmployeeMutation } from "../../redux/employee/employeeApi";
import { useGetAllOuQuery } from "../../redux/ou/ouApi";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [createEmployee] = useCreateEmployeeMutation();
  const { data: ouData, isLoading: isOuLoading } = useGetAllOuQuery();

  const handleFinish = (values) => {
    createEmployee(values);
    navigate("/dashboard/employee");
  };

  if (isOuLoading) {
    return <Spin />;
  }

  return (
    <Form
      wrapperCol={{ span: 18 }}
      labelCol={{ span: 6 }}
      onFinishFailed={() => {
        console.log("Fail to submit for due value checking");
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label='Employee name:'
        name='name'
        rules={[
          {
            required: true,
            message: "Input employee name",
          },
        ]}
      >
        <Input type='text' placeholder='Employee name' />
      </Form.Item>
      <Form.Item
        label='Employee organizational unit:'
        name='ou_id'
        rules={[
          {
            required: true,
            message: "Input employee organizational unit",
          },
        ]}
      >
        <Select>
          {ouData.map((ou) => (
            <Select.Option key={ou.id} value={ou.id}>
              {ou.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Add new employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewEmployee;
