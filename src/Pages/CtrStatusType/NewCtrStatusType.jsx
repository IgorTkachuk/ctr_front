import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useCreateCtrStatusTypeMutation } from "../../redux/ctrStatusType/ctrStatusTypeApi";

const NewCtrStatusType = () => {
  const navigate = useNavigate();
  const [createCtrStatusType] = useCreateCtrStatusTypeMutation();

  const handleFinish = (values) => {
    createCtrStatusType(values);
    navigate("/dashboard/ctrstatustype");
  };

  return (
    <Form
      wrapperCol={{ span: 18 }}
      labelWrap={{ span: 6 }}
      onFinishFailed={() => {
        console.log("Failed form submit due value checking");
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Input cartridge status type name"
        name="name"
        rules={[
          {
            required: true,
            message: "Input cartridge status type name",
          },
        ]}
      >
        <Input type="text" placeholder="Cartridge status type name" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Create new cartridge status type
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCtrStatusType;
