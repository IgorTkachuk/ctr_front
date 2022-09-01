import React from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllPrinterModelsQuery } from "../../redux/printerModel/printerModelApi";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";
import {
  useGetCartridgeModelByIDQuery,
  useUpdateCartridgeModelMutation,
} from "../../redux/cartridgeModel/cartridgeModelApi";

function EditCtrModel() {
  const navigate = useNavigate();
  const { data: vendorData, isLoading: isVendorDataLoading } =
    useGetAllVendorsQuery();
  const { data: prnModelData, isLoading: isPrnModelDataLoading } =
    useGetAllPrinterModelsQuery();
  const [updateCtrModel] = useUpdateCartridgeModelMutation();

  const params = useParams();
  const ctrId = params.id;
  const { data: ctrModelData, isLoading: isCtrModelDataLoading } =
    useGetCartridgeModelByIDQuery(ctrId);

  const handleFormSubmit = (values) => {
    updateCtrModel(values);
    navigate("/dashboard/ctrmodel");
  };

  if (isVendorDataLoading || isCtrModelDataLoading || isPrnModelDataLoading) {
    return <Spin />;
  }

  // const prnModelWithVendor = prnModelData.map((prnModel) => ({
  //   ...prnModel,
  //   vendor_name: vendorData.find((vendor) => vendor.id === prnModel.vendor_id),
  // }));

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFormSubmit}
      onFinishFailed={() => {
        console.log("New cartridgemodel form submit failed");
      }}
    >
      <Form.Item label='ID' name='id' initialValue={ctrModelData?.id}>
        <Input defaultValue={ctrModelData?.id} disabled />
      </Form.Item>
      <Form.Item
        label='Cartridge name:'
        name='name'
        initialValue={ctrModelData?.name}
        rules={[
          {
            required: true,
            message: "Pleace input catridge model name",
          },
        ]}
      >
        <Input placeholder='Cartridge name' />
      </Form.Item>
      <Form.Item
        label='Vendor'
        name='vendor_id'
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
        label='Image URL'
        name='image_url'
        initialValue={ctrModelData?.image_url}
      >
        <Input
          placeholder='Cartridge image URL'
          defaultValue={ctrModelData?.image_url}
        />
      </Form.Item>
      <Form.Item
        label='Supported printers'
        name='supp_prns'
        initialValue={ctrModelData.supp_prns}
      >
        <Select
          mode='multiple'
          placeholder='Select supported printers'
          defaultValue={ctrModelData.supp_prns}
        >
          {vendorData.map((vendor) => (
            <Select.OptGroup label={vendor.name} key={vendor.id}>
              {prnModelData
                .filter((model) => model.vendor_id === vendor.id)
                .map((prnModel) => (
                  <Select.Option key={prnModel.id} value={prnModel.id}>
                    {prnModel.name}
                  </Select.Option>
                ))}
            </Select.OptGroup>
          ))}
          {/* {prnModelData.map((prnModel) => (
            <Select.Option key={prnModel.id} value={prnModel.id}>
              {prnModel.name}
            </Select.Option>
          ))} */}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes to printer cartridge model
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditCtrModel;
