import React from "react";
import { Table, Spin, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useDeleteBLMutation,
  useGetAllBLQuery,
} from "../../redux/businessLine/businessLineApi";

const BusinessLine = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBLQuery();
  const [deleteBL] = useDeleteBLMutation();

  const handleNewBLClick = () => {
    navigate("/dashboard/bl/new");
  };

  const handleDeleteBL = (id) => {
    deleteBL(id);
  };

  const handleEditBLk = (id) => {
    navigate(`/dashboard/bl/edit/${id}`);
  };

  if (isLoading) {
    return <Spin />;
  }

  const colums = [
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEditBLk(record.id)}>
            Edit
          </Button>
          <Button
            type='primary'
            danger
            onClick={() => handleDeleteBL(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={"middle"} direction='vertical' style={{ display: "flex" }}>
      <Button type='primary' onClick={handleNewBLClick}>
        Add new business line entity
      </Button>
      <Table dataSource={data} columns={colums} />
    </Space>
  );
};

export default BusinessLine;
