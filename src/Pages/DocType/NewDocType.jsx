import React from "react";
import { Form, Input, Button, Spin, Select } from "antd";
import {
  useCreateDocTypeMutation,
  // useGetDocTypesByIdQuery,
} from "../../redux/docType/docTypeApi";
import { useGetAllCtrStatusTypeQuery } from "../../redux/ctrStatusType/ctrStatusTypeApi";
import { useNavigate } from "react-router-dom";

const NewDocType = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const { data, isLoading } = useGetAllCtrStatusTypeQuery();
  const [createDocType] = useCreateDocTypeMutation();
  // const { data, isLoading } = useGetDocTypesByIdQuery(id);

  const handleCreate = (values) => {
    console.log(values);
    createDocType(values);
    navigate("/dashboard/doctype/");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Form
      wrapperCol={{ span: 16 }}
      labelWrap={{ span: 8 }}
      onFinishFailed={() => {
        console.log("Failed submit add new data type due data validation");
      }}
      onFinish={handleCreate}
    >
      <Form.Item
        label="Document type name"
        name="name"
        rules={[
          {
            required: true,
            message: "Input document data name",
          },
        ]}
      >
        <Input placeholder="Doc type name" />
      </Form.Item>
      <Form.Item
        label="Cartridge status type"
        name="ctr_status_type_id"
        rules={[
          {
            required: true,
            message: "select cartridge status type for this doc type",
          },
        ]}
      >
        <Select placeholder="Carteidge status type">
          {data.map((ctrStatusType) => (
            <Select.Option value={ctrStatusType.id}>
              {ctrStatusType.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Create new document type
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewDocType;
