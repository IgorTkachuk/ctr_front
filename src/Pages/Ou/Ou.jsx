import React from "react";
import { Spin, Table, Space, Button } from "antd";
import { useGetAllOuQuery } from "../../redux/ou/ouApi";
import { useNavigate } from "react-router-dom";

const Ou = () => {
  const { data, isLoading } = useGetAllOuQuery();
  const navigate = useNavigate();

  const handleNewOu = () => {
    navigate("/dashboard/ou/new");
  };

  if (isLoading) {
    return <Spin />;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Parent",
      dataIndex: "parent_id",
      key: "parent_id",
    },
    {
      title: "Business line",
      dataIndex: "business_line_id",
      key: "business_line_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Button type="primary" onClick={handleNewOu}>
        Add new organizational unit
      </Button>
      <Table dataSource={data} columns={columns} />
    </Space>
  );
};

export default Ou;
