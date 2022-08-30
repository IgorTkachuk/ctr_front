import React from "react";
import { Form, Select, Spin, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPrinterModelByIdQuery,
  useUpdatePrinterModelMutation,
} from "../../redux/printerModel/printerModelApi";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";

const EditPrnModel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [updatePrinterModel] = useUpdatePrinterModelMutation();
  const { data, isLoading } = useGetPrinterModelByIdQuery(params.id);
  const { data: vendorData, isLoading: isVendorLoading } =
    useGetAllVendorsQuery();

  const onFormFinished = (values) => {
    updatePrinterModel(values);
    navigate("/dashboard/printer");
  };

  if (isLoading || isVendorLoading) {
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
      <Form.Item label="Printer model ID:" name="id" initialValue={data.id}>
        <Input placeholder="Printer model ID" defaultValue={data.id} disabled />
      </Form.Item>
      <Form.Item
        label="Printer model name:"
        name="name"
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Please input printer model name!",
          },
        ]}
      >
        <Input placeholder="Printer model name" defaultValue={data.name} />
      </Form.Item>
      <Form.Item
        label="Choice vendor:"
        name="vendor_id"
        initialValue={data.vendor_id}
        rules={[
          {
            required: true,
            message: "Please choice vendor!",
          },
        ]}
      >
        <Select placeholder="Choice vendor" defaultValue={data.vendor_id}>
          {vendorData.map((vendor) => (
            <Select.Option value={vendor.id}>{vendor.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Image URL"
        name="image_url"
        initialValue={data.image_url}
      >
        <Input placeholder="Image URL" defaultValue={data.image_url} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Apply changes for printer model
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPrnModel;
