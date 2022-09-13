import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { useCreateDecomCauseMutation } from "../../redux/decomCause/decomCauseApi";

const NewDecomCause = () => {
  const navigate = useNavigate();
  const [createDecomCause] = useCreateDecomCauseMutation();

  const handleSubmit = (values) => {
    createDecomCause(values);
    navigate("/dashboard/decomcause");
  };

  return (
    <Form
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 8 }}
      onFinishFailed={() => {
        console.log("Failed to submit form due value checking");
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Decommissioning cause name:"
        name="name"
        rules={[
          {
            required: true,
            message: "Input decommissioning cause name",
          },
        ]}
      >
        <Input placeholder="Decommissioning cause name" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ display: "flex" }}>
        <Button type="primary" htmlType="submit">
          Create new decommissioning cause
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewDecomCause;
