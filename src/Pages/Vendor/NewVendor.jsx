import React from "react";
import { Form, Input, Button } from "antd";
import { useCreateVendorMutation } from "../../redux/vendor/slice";
import { useNavigate } from "react-router-dom";

export const NewVendor = () => {
  const [createVendor] = useCreateVendorMutation();
  const navigate = useNavigate();

  const onFormFinished = (values) => {
    createVendor(values);
    navigate("/dashboard/vendor");
  };

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFormFinished}
        onFinishFailed={() => {
          console.log("form finish is failed");
        }}
      >
        <Form.Item
          label="Vendors name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input vendors name!",
            },
          ]}
        >
          <Input placeholder="Vendors name" />
        </Form.Item>
        <Form.Item label="Logo URL:" name="logo_url">
          <Input placeholder="Logo URL" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Create vendor
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
