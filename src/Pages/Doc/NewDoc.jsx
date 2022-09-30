import { useNavigate } from "react-router-dom";
import { Form, Button, Space, Spin, Input, DatePicker, Select } from "antd";
import "moment/locale/uk";
import locale from "antd/es/date-picker/locale/uk_UA";
import { useGetAllDocTypesQuery } from "../../redux/docType/docTypeApi";
import { useGetAllCartridgeModelsQuery } from "../../redux/cartridgeModel/cartridgeModelApi";
import { useCreateDocMutation } from "../../redux/doc/docApi";
import { useState } from "react";

import CtrNewRow from "../../components/CtrNewRow/CtrNewRow";

const NewDoc = () => {
  const navigate = useNavigate();
  const { data: docTypeData, isLoading: isDocTypeDataLoading } =
    useGetAllDocTypesQuery();
  const { data: ctrModels, isLoading: isCtrModelsLoading } =
    useGetAllCartridgeModelsQuery();
  const [createDoc] = useCreateDocMutation();
  const [docType, setDocType] = useState(null);

  const handleChangeDocType = (value) => {
    setDocType(value);
  };

  const handleSubmit = (values) => {
    values = {
      ...values,
      doc_date: values.doc_date?.format("YYYY-MM-DD HH:mm Z"), //"YYYY-MM-DD HH:mm Z" -> '2022-09-29 16:07 +03:00'
    };
    console.log(values);

    createDoc(values);
    navigate("/dashboard/doc");
  };

  if (isDocTypeDataLoading || isCtrModelsLoading) {
    return <Spin />;
  }

  return (
    <>
      <h2>Doc type: {docType}</h2>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinishFailed={() => {
          console.log("Failed due formsubmit");
        }}
        onFinish={handleSubmit}
        size="small"
      >
        <Form.Item
          label="Document type:"
          name="doc_type_id"
          rules={[
            {
              required: true,
              message: "Select document type",
            },
          ]}
          style={{ textAlign: "left" }}
        >
          <Select
            onChange={handleChangeDocType}
            placeholder="select document type"
          >
            {docTypeData.map((docType) => (
              <Select.Option key={docType.id} value={docType.id}>
                {docType.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {docType === 1 && (
          <Form.Item
            label="Date:"
            name="doc_date"
            rules={[
              {
                required: true,
                message: "Input document date",
              },
            ]}
          >
            <DatePicker
              locale={locale}
              format="DD.MM.YYYY"
              style={{ display: "table" }}
            />
          </Form.Item>
        )}
        <Form.Item>
          <CtrNewRow ctrModels={ctrModels} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Create new document
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewDoc;
