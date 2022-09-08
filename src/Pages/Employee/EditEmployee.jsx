import React from "react";
import { Form, Input, Select, Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import {
  useUpdateEmployeeMutation,
  useGetEmloyeeByIdQuery,
} from "../../redux/employee/employeeApi";
import { useGetAllOuQuery } from "../../redux/ou/ouApi";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetEmloyeeByIdQuery(id);
  const { data: ouData, isLoading: isOuLoading } = useGetAllOuQuery();

  const handleFinish = (values) => {
    updateEmployee(values);
    navigate("/dashboard/employee");
  };

  if (isLoading || isOuLoading) {
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
      <Form.Item label='ID:' name='id' initialValue={data.id}>
        <Input type='text' disabled />
      </Form.Item>
      <Form.Item
        label='Employee name:'
        name='name'
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Input employee name",
          },
        ]}
      >
        <Input
          type='text'
          placeholder='Employee name'
          defaultValue={data.name}
        />
      </Form.Item>
      <Form.Item
        label='Employee organizational unit:'
        name='ou_id'
        initialValue={data.ou_id}
        rules={[
          {
            required: true,
            message: "Input employee organizational unit",
          },
        ]}
      >
        <Select defaultValue={data.ou_id}>
          {ouData.map((ou) => (
            <Select.Option key={ou.id} value={ou.id}>
              {ou.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes for employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditEmployee;
