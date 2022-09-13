import React from "react";
import {
  useGetAllDecomCauseQuery,
  useDeleteDecomCauseMutation,
} from "../../redux/decomCause/decomCauseApi";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Spin } from "antd";

const DecomCause = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDecomCauseQuery();
  const [deleteDecomCause] = useDeleteDecomCauseMutation();

  const handleEdit = (id) => {
    navigate(`/dashboard/decomcause/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteDecomCause(id);
    navigate("/dashboard/decomcause");
  };

  const handleAddNew = () => {
    console.log("Add new DC");
    navigate("/dashboard/decomcause/new");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Button type="primary" onClick={handleAddNew}>
        Add new decommissioning cause
      </Button>
      <Table dataSource={data} columns={columns} />
    </Space>
  );
};

export default DecomCause;
