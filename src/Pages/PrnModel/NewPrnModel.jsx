import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Spin } from "antd";

import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";
import { useCreatePrinterModelMutation } from "../../redux/printerModel/printerModelApi";

const NewPrnModel = () => {
  const navigate = useNavigate();
  const { data: vendorData, isLoading: vendorIsLoading } =
    useGetAllVendorsQuery();
  const [createNewPrinterModel] = useCreatePrinterModelMutation();

  const onFormFinished = (values) => {
    createNewPrinterModel(values);
    navigate("/dashboard/printer");
  };

  if (vendorIsLoading) {
    return <Spin />;
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={onFormFinished}
      onFinishFailed={() => {
        console.log("form finish is failed");
      }}
    >
      <Form.Item
        label="Printer model name:"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input printer model name!",
          },
        ]}
      >
        <Input placeholder="Printer model name" />
      </Form.Item>
      <Form.Item
        label="Choice vendor:"
        name="vendor_id"
        rules={[
          {
            required: true,
            message: "Please choice vendor!",
          },
        ]}
      >
        <Select placeholder="Choice vendor">
          {vendorData.map((vendor) => (
            <Select.Option value={vendor.id}>{vendor.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Image URL" name="image_url">
        <Input placeholder="Image URL" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Create new printer model
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPrnModel;
