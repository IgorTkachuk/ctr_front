import React from "react";
import {
  useDeleteVendorMutation,
  useGetAllVendorsQuery,
} from "../../redux/vendor/slice";
import { Button, Spin, Row, Col, Image, Table, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const Vendor = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllVendorsQuery();
  const [deleteVendor] = useDeleteVendorMutation();

  const handleEditVendor = (vendorId) => {
    navigate(`/dashboard/vendor/edit/${vendorId}`);
  };

  const handleDeleteVendor = (vendorId) => {
    deleteVendor(vendorId);
  };

  if (isLoading) {
    return <Spin />;
  }

  const dataSource = data.map((item) => ({ ...item, key: item.id }));
  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => ("" + a.name).localeCompare(b.name),
      sortOrder: "ascend",
    },
    {
      title: "Logo",
      dataIndex: "logo_url",
      key: "logo",
      render: (image) => <Image src={image} height={40} alt="vendor logo" />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditVendor(record.id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteVendor(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={12} offset={6}>
        <Table dataSource={dataSource} columns={tableColumns} />

        <Button
          type="primary"
          onClick={(e) => {
            navigate("/dashboard/vendor/new");
          }}
        >
          Add new
        </Button>
      </Col>
    </Row>
  );
};
