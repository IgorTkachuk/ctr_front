import React from "react";
import { Form, Input, Button, Spin } from "antd";
import {
  useGetDocTypesByIdQuery,
  useUpdateDocTypeMutation,
} from "../../redux/docType/docTypeApi";
import { useParams, useNavigate } from "react-router-dom";

const EditDocType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateDocType] = useUpdateDocTypeMutation();
  const { data, isLoading } = useGetDocTypesByIdQuery(id);

  const handleEdit = (values) => {
    updateDocType(values);
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
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes to this document type
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDocType;
