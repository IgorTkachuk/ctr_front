import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";

import {
  useUpdateDecomCauseMutation,
  useGetDecomCauseByIdQuery,
} from "../../redux/decomCause/decomCauseApi";

const EditDecomCause = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetDecomCauseByIdQuery(id);
  const [updateDecomCause] = useUpdateDecomCauseMutation();

  const handleSubmit = (values) => {
    updateDecomCause(values);
    navigate("/dashboard/decomcause");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 8 }}
      onFinishFailed={() => {
        console.log("Failed to submit form due value checking");
      }}
      onFinish={handleSubmit}
    >
      <Form.Item name="id" label="ID:" initialValue={data.id}>
        <Input defaultValue={data.id} disabled />
      </Form.Item>
      <Form.Item
        label="Decommissioning cause name:"
        name="name"
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Input decommissioning cause name",
          },
        ]}
      >
        <Input
          placeholder="Decommissioning cause name"
          defaultValue={data.name}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ display: "flex" }}>
        <Button type="primary" htmlType="submit">
          Update info about this decommissioning cause
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDecomCause;
