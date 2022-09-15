import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import {
  useGetCtrStatusTypeByIDQuery,
  useUpdateCtrStatusTypeMutation,
} from "../../redux/ctrStatusType/ctrStatusTypeApi";

const EditCtrStatusType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetCtrStatusTypeByIDQuery(id);
  const [updateCtrStatusType] = useUpdateCtrStatusTypeMutation();

  const handleFinish = (values) => {
    updateCtrStatusType(values);
    navigate("/dashboard/ctrstatustype");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 6 }}
      onFinishFailed={() => {
        console.log("Failed form submit due value checking");
      }}
      onFinish={handleFinish}
    >
      <Form.Item label="ID" name="id" initialValue={data.id}>
        <Input defaultValue={data.id} />
      </Form.Item>
      <Form.Item
        label="Input cartridge status type name"
        name="name"
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Input cartridge status type name",
          },
        ]}
      >
        <Input
          defaultValue={data.name}
          type="text"
          placeholder="Cartridge status type name"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }} style={{ display: "flex" }}>
        <Button type="primary" htmlType="submit">
          Apply changet for this cartridge status type
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCtrStatusType;
