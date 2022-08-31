import React from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";
import {
  useGetCartridgeModelByIDQuery,
  useUpdateCartridgeModelMutation,
} from "../../redux/cartridgeModel/cartridgeModelApi";

function EditCtrModel() {
  const navigate = useNavigate();
  const { data: vendorData, isLoading: isVendorDataLoading } =
    useGetAllVendorsQuery();
  const [updateCtrModel] = useUpdateCartridgeModelMutation();

  const params = useParams();
  const ctrId = params.id;
  const { data: ctrModelData, isLoading: isCtrModelDataLoading } =
    useGetCartridgeModelByIDQuery(ctrId);

  const handleFormSubmit = (values) => {
    updateCtrModel(values);
    navigate("/dashboard/ctrmodel");
  };

  if (isVendorDataLoading || isCtrModelDataLoading) {
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
      <Form.Item label="ID" name="id" initialValue={ctrModelData?.id}>
        <Input defaultValue={ctrModelData?.id} disabled />
      </Form.Item>
      <Form.Item
        label="Cartridge name:"
        name="name"
        initialValue={ctrModelData?.name}
        rules={[
          {
            required: true,
            message: "Pleace input catridge model name",
          },
        ]}
      >
        <Input placeholder="Cartridge name" />
      </Form.Item>
      <Form.Item
        label="Vendor"
        name="vendor_id"
        initialValue={ctrModelData?.vendor_id}
        rules={[
          {
            required: true,
            message: "Please choice vendor",
          },
        ]}
      >
        <Select defaultValue={ctrModelData?.vendor_id}>
          {vendorData.map((vendor) => (
            <Select.Option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Image URL"
        name="image_url"
        initialValue={ctrModelData?.image_url}
      >
        <Input
          placeholder="Cartridge image URL"
          defaultValue={ctrModelData?.image_url}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Apply changes to printer cartridge model
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditCtrModel;
