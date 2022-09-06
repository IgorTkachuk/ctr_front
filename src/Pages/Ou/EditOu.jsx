import React from "react";
import { Form, Input, Spin, TreeSelect, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllOuQuery,
  useGetOuByIdQuery,
  useUpdateOuMutation,
} from "../../redux/ou/ouApi";
import { prepareAndBuildTree } from "../../utils";

const EditOu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: parentOuData, isLoading: isParentOuDataLoading } =
    useGetAllOuQuery();
  const { data, isLoading } = useGetOuByIdQuery(id);
  const [updateOu] = useUpdateOuMutation();

  const handleFormSubmit = (values) => {
    updateOu(values);
    navigate("/dashboard/ou");
  };

  if (isLoading || isParentOuDataLoading) {
    return <Spin />;
  }

  const treeData = prepareAndBuildTree(parentOuData);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFormSubmit}
      onFieldsChange={() => {
        console.log("Edit organizational unit form submit failed");
      }}
    >
      <Form.Item label='ID' name='id' initialValue={data.id}>
        <Input placeholder='ID' defaultValue={data.id} disabled />
      </Form.Item>
      <Form.Item
        label='OU name:'
        name='name'
        initialValue={data.name}
        rules={[
          {
            required: true,
            message: "Please input ou name",
          },
        ]}
      >
        <Input placeholder='OU name' defaultValue={data.name} />
      </Form.Item>
      <Form.Item
        label='Parent OU'
        name='parent_id'
        initialValue={data.parent_id}
      >
        <TreeSelect
          placeholder='OU parent name'
          treeData={treeData}
          defaultValue={data.parent_id}
        />
      </Form.Item>
      <Form.Item
        label='Business line'
        name='business_line_id'
        initialValue={data.business_line_id}
      >
        <div>Business line Select element</div>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type='primary' htmlType='submit'>
          Apply changes to organizational unit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditOu;
