import React from "react";
import { Table, Space, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDocTypesQuery,
  useDeleteDocTypesMutation,
} from "../../redux/docType/docTypeApi";
import { useGetAllCtrStatusTypeQuery } from "../../redux/ctrStatusType/ctrStatusTypeApi";

const DocType = () => {
  const navigate = useNavigate();
  const { data: CtrStatusTypeData, isLoading: isCtrStatusTypeLoadin } =
    useGetAllCtrStatusTypeQuery();
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

  if (isLoading || isCtrStatusTypeLoadin) {
    return <Spin />;
  }

  const preparedData = data.map((docType) => ({
    ...docType,
    ctr_status_from: CtrStatusTypeData.find(
      (ctrStatusType) => ctrStatusType.id === docType.ctr_status_type_from
    )?.name,
    ctr_status_to: CtrStatusTypeData.find(
      (ctrStatusType) => ctrStatusType.id === docType.ctr_status_type_to
    )?.name,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cartridge status from",
      dataIndex: "ctr_status_from",
      key: "ctr_status_from",
    },
    {
      title: "Cartridge status to",
      dataIndex: "ctr_status_to",
      key: "ctr_status_to",
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
      <Table dataSource={preparedData} columns={columns} />
    </Space>
  );
};

export default DocType;
