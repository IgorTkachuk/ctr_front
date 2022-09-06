import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";

import {
  useGetAllBLByIdQuery,
  useUpdateBLMutation,
} from "../../redux/businessLine/businessLineApi";

const EditBusinessLine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetAllBLByIdQuery(id);
  const [udpdateBL] = useUpdateBLMutation();

  const handleFormFinish = (values) => {
    // console.log(values);
    udpdateBL(values);
    navigate("/dashboard/bl");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFormFinish}
      onFinishFailed={() => {
        console.log(
          "Failed change data for business line entity due form value checking"
        );
      }}
    >
      <Form.Item initialValue={data.id} label='ID' name='id'>
        <Input type='text' defaultValue={data.id} disabled />
      </Form.Item>
      <Form.Item
        initialValue={data.name}
        label='name'
        name='name'
        rules={[
          {
            required: true,
            message: "Input name of business line entity",
          },
        ]}
      >
        <Input
          defaultValue={data.name}
          placeholder='Name on business line entity'
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes to business line entity
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBusinessLine;
