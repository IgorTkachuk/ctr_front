import React from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import {
  useGetDocTypesByIdQuery,
  useUpdateDocTypeMutation,
} from "../../redux/docType/docTypeApi";
import { useGetAllCtrStatusTypeQuery } from "../../redux/ctrStatusType/ctrStatusTypeApi";
import { useParams, useNavigate } from "react-router-dom";

const EditDocType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateDocType] = useUpdateDocTypeMutation();
  const { data, isLoading } = useGetDocTypesByIdQuery(id);
  const { data: ctrStatusTypeData, isLoading: isCtrStatusTypeLoading } =
    useGetAllCtrStatusTypeQuery();

  const handleEdit = (values) => {
    updateDocType(values);
    navigate("/dashboard/doctype/");
  };

  if (isLoading || isCtrStatusTypeLoading) {
    return <Spin />;
  }

  return (
    <Form
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 8 }}
      onFinishFailed={() => {
        console.log("Failed submit add new data type due data validation");
      }}
      onFinish={handleEdit}
    >
      <Form.Item initialValue={data.id} name='id' label='ID'>
        <Input defaultValue={data.id} disabled />
      </Form.Item>
      <Form.Item
        label='Document type name'
        name='name'
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Input document data name",
          },
        ]}
      >
        <Input placeholder='Doc type name' defaultValue={data.name} />
      </Form.Item>
      <Form.Item
        label='Cartridge status type FROM'
        name='ctr_status_type_from'
        initialValue={data.ctr_status_type_from}
        rules={[
          {
            required: true,
            message: "select cartridge status type FROM for this doc type",
          },
        ]}
      >
        <Select
          placeholder='Carteidge status type FROM'
          defaultValue={data.ctr_status_type_from}
        >
          {ctrStatusTypeData.map((ctrStatusType) => (
            <Select.Option value={ctrStatusType.id}>
              {ctrStatusType.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label='Cartridge status type TO'
        name='ctr_status_type_to'
        initialValue={data.ctr_status_type_to}
        rules={[
          {
            required: true,
            message: "select cartridge status type TO for this doc type",
          },
        ]}
      >
        <Select
          placeholder='Carteidge status type TO'
          defaultValue={data.ctr_status_type_to}
        >
          {ctrStatusTypeData.map((ctrStatusType) => (
            <Select.Option value={ctrStatusType.id}>
              {ctrStatusType.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes to this document type
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDocType;
