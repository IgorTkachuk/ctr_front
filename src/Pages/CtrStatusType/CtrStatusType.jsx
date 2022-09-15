import React from "react";
import { Table, Button, Spin, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllCtrStatusTypeQuery,
  useDeleteCtrStatusTypeMutation,
} from "../../redux/ctrStatusType/ctrStatusTypeApi";

const CtrStatusType = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllCtrStatusTypeQuery();
  const [deleteCtrStatusType] = useDeleteCtrStatusTypeMutation();

  const handleEdit = (id) => {
    navigate(`/dashboard/ctrstatustype/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteCtrStatusType(id);
  };

  const handleAddNew = () => {
    navigate("/dashboard/ctrstatustype/new");
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
    <Space size="middle" direction="vertical" style={{ display: "flex" }}>
      <Button type="primary" onClick={handleAddNew}>
        Add new catridge status type
      </Button>
      <Table dataSource={data} columns={columns} />
    </Space>
  );
};

export default CtrStatusType;
