import React from "react";
import { Form, Input, Spin, TreeSelect, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateOuMutation, useGetAllOuQuery } from "../../redux/ou/ouApi";
import { prepareAndBuildTree } from "../../utils";

const NewOu = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllOuQuery();
  const [createOu] = useCreateOuMutation();

  const handleFormSubmit = (values) => {
    createOu(values);
    navigate("/dashboard/ou");
  };

  if (isLoading) {
    return <Spin />;
  }

  const treeData = prepareAndBuildTree(data);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleFormSubmit}
      onFieldsChange={() => {
        console.log("New organizational unit form submit failed");
      }}
    >
      <Form.Item
        label="OU name:"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input ou name",
          },
        ]}
      >
        <Input placeholder="OU name" />
      </Form.Item>
      <Form.Item label="Parent OU" name="parent_id">
        <TreeSelect placeholder="OU parent name" treeData={treeData} />
      </Form.Item>
      <Form.Item label="Business line" name="business_line_id">
        <div>Business line Select element</div>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit">
          Add new organizational unit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewOu;
