import React from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";
import { useCreateCartridgeModelMutation } from "../../redux/cartridgeModel/cartridgeModelApi";

function NewCtrModel() {
  const navigate = useNavigate();
  const { data: vendorData, isLoading: isVendorDataLoading } =
    useGetAllVendorsQuery();
  const [createNewPrinterModel] = useCreateCartridgeModelMutation();

  const handleFormSubmit = (values) => {
    createNewPrinterModel(values);
    navigate("/dashboard/ctrmodel");
  };

  if (isVendorDataLoading) {
    return <Spin />;
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFormSubmit}
      onFinishFailed={() => {
        console.log("New cartridgemodel form submit failed");
      }}
    >
      <Form.Item
        label="Cartridge name:"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input catridge model name",
          },
        ]}
      >
        <Input placeholder="Cartridge name" />
      </Form.Item>
      <Form.Item
        label="Vendor"
        name="vendor_id"
        rules={[
          {
            required: true,
            message: "Please choice vendor",
          },
        ]}
      >
        <Select>
          {vendorData.map((vendor) => (
            <Select.Option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Image URL" name="image_url">
        <Input placeholder="Cartridge image URL" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Add new printer cartridge model
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewCtrModel;
