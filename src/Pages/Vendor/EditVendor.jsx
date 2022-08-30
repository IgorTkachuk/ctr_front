import React from "react";
import { Form, Input, Button, Spin } from "antd";
import {
  useGetVendorByIDQuery,
  useUpdateVendorMutation,
} from "../../redux/vendor/vendorApi";
import { useNavigate, useParams } from "react-router-dom";

export const EditVendor = () => {
  const [updateVendor] = useUpdateVendorMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetVendorByIDQuery(id);

  const navigate = useNavigate();

  const onFormFinished = (values) => {
    updateVendor(values);
    navigate("/dashboard/vendor");
  };

  if (isLoading) {
    return <Spin />;
  }

  const { id: vendorId, name, logo_url } = data;

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
          label="Vendors id:"
          name="id"
          initialValue={vendorId}
          rules={[
            {
              required: true,
              message: "Please input vendors id!",
            },
          ]}
        >
          <Input placeholder="Vendors ID" defaultValue={vendorId} disabled />
        </Form.Item>
        <Form.Item
          label="Vendors name:"
          name="name"
          initialValue={name}
          rules={[
            {
              required: true,
              message: "Please input vendors name!",
            },
          ]}
        >
          <Input placeholder="Vendors name" defaultValue={name} />
        </Form.Item>
        <Form.Item label="Logo URL:" name="logo_url" initialValue={logo_url}>
          <Input placeholder="Logo URL" defaultValue={logo_url} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Update vendor
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
