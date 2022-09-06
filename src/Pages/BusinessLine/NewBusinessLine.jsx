import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateBLMutation } from "../../redux/businessLine/businessLineApi";

const NewBusinessLine = () => {
  const navigate = useNavigate();
  const [createBL] = useCreateBLMutation();

  const handleFinish = (values) => {
    createBL(values);
    navigate("/dashboard/bl");
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFinish}
      onFinishFailed={() => {
        console.log(
          "Failed to perform create new busines line entity due check form values"
        );
      }}
    >
      <Form.Item
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: "Input business line entity name",
          },
        ]}
      >
        <Input type='text' placeholder='New business line entity name' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Create new Businesss Line entity
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewBusinessLine;
