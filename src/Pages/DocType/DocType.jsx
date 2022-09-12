import React from "react";
import { Table, Space, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDocTypesQuery,
  useDeleteDocTypesMutation,
} from "../../redux/docType/docTypeApi";

const DocType = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDocTypesQuery();
  const [deleteDocType] = useDeleteDocTypesMutation();

  const handleEdit = (id) => {
    navigate(`/dashboard/doctype/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteDocType(id);
  };

  const handleNewDocType = () => {
    navigate("/dashboard/doctype/new");
  };

  if (isLoading) {
    return <Spin />;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size='middle'>
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
      <Button type='primary' onClick={handleNewDocType}>
        Add new doc type
      </Button>
      <Table dataSource={data} columns={columns} />
    </Space>
  );
};

export default DocType;
