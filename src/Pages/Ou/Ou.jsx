import React from "react";
import { Spin, Table, Space, Button } from "antd";
import { useDeleteOuMutation, useGetAllOuQuery } from "../../redux/ou/ouApi";
import { useNavigate } from "react-router-dom";

const Ou = () => {
  const { data, isLoading } = useGetAllOuQuery();
  const [deleteOu] = useDeleteOuMutation();
  const navigate = useNavigate();

  const handleNewOu = () => {
    navigate("/dashboard/ou/new");
  };

  const handleDelete = (id) => {
    deleteOu(id);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/ou/edit/${id}`);
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
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button type='primary' danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction='vertical' size='middle' style={{ display: "flex" }}>
      <Button type='primary' onClick={handleNewOu}>
        Add new organizational unit
      </Button>
      <Table dataSource={data} columns={columns} />
    </Space>
  );
};

export default Ou;
